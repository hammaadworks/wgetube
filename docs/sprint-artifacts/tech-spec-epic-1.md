# Epic Technical Specification: Foundation & Core Downloader

Date: Tuesday, 18 November 2025
Author: hammaadworks
Epic ID: 1
Status: Draft

---

## Overview

This technical specification details Epic 1: Foundation & Core Downloader for the Wgetube project. Wgetube aims to empower productive personal growth during disconnected moments, specifically by assisting in Quran Hifz through reliable video downloading and a specialized looping learning technique. This epic focuses on establishing the foundational application infrastructure and enabling users to download videos from supported platforms.

## Objectives and Scope

### In-Scope
- Establish the basic application infrastructure using Next.js, including project setup and core dependencies.
- Enable users to initiate video downloads by pasting a URL from YouTube (Videos/Shorts) or Instagram Reels.
- Allow users to select desired video and audio formats/qualities for download.
- Implement automatic video downloads when shared directly to the Wgetube PWA from mobile devices.
- Process and store downloaded video and audio content locally, along with associated metadata for history and library management, utilizing the File System Access API for direct user-selected save locations.
- Ensure the application is a Single Page Application (SPA), cross-operating system, and cross-browser compliant.
- Deliver a highly performant and seamless user experience for downloading.

### Out-of-Scope
- Analytics features.
- Login/authentication features (deferred for MVP).
- Advanced video editing or manipulation beyond A-B looping.
- Integration with video sources other than YouTube and Instagram Reels (for this epic).

## System Architecture Alignment

This epic's implementation aligns with the core architectural decisions:
- **Frontend/Full-stack:** Next.js (React) for a unified development experience.
- **Hosting:** Vercel (Hobby Plan) for cost-effective deployment, requiring careful resource management for video downloading.
- **Video Downloader Integration:** `ytdlp-nodejs` within Next.js API Routes to handle video fetching and processing.
- **PWA Share Target API:** Standard web APIs for seamless mobile integration.
- **Data Persistence:** Local-only using IndexedDB/LocalForage for downloaded content metadata.
- **API Pattern:** RESTful API using Next.js API Routes for backend functionalities.

The architecture emphasizes performance and usability, leveraging open-source solutions while adhering to near-zero deployment costs. The dynamic File System Access API is a novel pattern designed to give users direct control over download locations.

## Detailed Design

### Services and Modules

### Services and Modules

- **Next.js Frontend (Owner: Dev Agent)**
  - **Responsibilities:** User Interface rendering, user interaction handling (URL input, format selection, download initiation), client-side routing, displaying download progress and library content.
  - **Inputs:** User input (URLs, selections), API responses (video details, download status).
  - **Outputs:** API requests, UI updates.

- **Next.js API Routes (Owner: Dev Agent)**
  - **Responsibilities:** Backend logic for fetching video details, initiating downloads, and handling PWA share targets. Acts as a wrapper for `ytdlp-nodejs`.
  - **Inputs:** Client requests (URLs, desired formats/qualities), `ytdlp-nodejs` outputs.
  - **Outputs:** Video details, download streams, success/error messages.

- **`ytdlp-nodejs` Integration (Owner: Dev Agent)**
  - **Responsibilities:** Interfacing with the `yt-dlp` command-line tool to fetch video metadata and download video/audio content from various platforms (YouTube, Instagram Reels).
  - **Inputs:** Video URLs, format/quality parameters.
  - **Outputs:** Video metadata, raw video/audio streams.

- **PWA Service Worker (Owner: Dev Agent)**
  - **Responsibilities:** Intercepting network requests, handling offline capabilities, and specifically managing the Web Share Target API to receive shared URLs from native mobile applications.
  - **Inputs:** Shared URLs from external apps.
  - **Outputs:** Triggers Next.js API routes for download processing.

- **Local Storage Manager (IndexedDB/LocalForage) (Owner: Dev Agent)**
  - **Responsibilities:** Storing metadata for downloaded and imported media, managing file paths/handles, and providing a fallback storage mechanism if direct file system access is denied or unavailable.
  - **Inputs:** Downloaded media metadata, user preferences.
  - **Outputs:** Stored metadata, retrieved media lists.

- **File System Access API Handler (Owner: Dev Agent)**
  - **Responsibilities:** Managing interactions with the browser's File System Access API (`window.showSaveFilePicker`) to allow users to directly select download locations and persist file handles.
  - **Inputs:** Downloaded media streams, user interaction for file selection.
  - **Outputs:** Saved files on the user's device, persistent file handles.

### Data Models and Contracts

### Data Models and Contracts

**1. DownloadedMedia (IndexedDB/LocalForage)**
This model represents a downloaded or imported media item, storing its metadata and local storage reference.

```typescript
interface DownloadedMedia {
  id: string; // Unique identifier (e.g., video ID from source)
  title: string;
  sourceUrl: string;
  thumbnailUrl?: string;
  duration?: number; // in seconds
  filePath?: string; // Path on user's file system (if File System Access API used)
  fileHandle?: FileSystemFileHandle; // Persistent handle for File System Access API
  format: string; // e.g., 'mp4', 'mp3', 'webm'
  quality?: string; // e.g., '1080p', 'bestaudio'
  downloadDate: Date;
  metadata: Record<string, any>; // Additional metadata from yt-dlp
  isImported: boolean; // True if imported, false if downloaded
}
```

**Relationships:**
- `DownloadedMedia` records are stored locally in IndexedDB, managed by the Local Storage Manager.
- `filePath` or `fileHandle` links the metadata to the actual media content on the user's device.

### APIs and Interfaces

### APIs and Interfaces

**1. Next.js API Route: `/api/fetch-details`**
- **Purpose:** Fetches metadata for a given video URL without initiating a download.
- **Method:** `GET`
- **Path:** `/api/fetch-details`
- **Request Query Parameters:**
  - `url`: `string` (Required) - The URL of the video to fetch details for.
- **Response (Success - 200 OK):**
  ```typescript
  interface FetchDetailsResponse {
    success: true;
    details: {
      id: string;
      title: string;
      thumbnailUrl?: string;
      duration?: number;
      availableFormats: Array<{ formatId: string; description: string; ext: string; preference: number }>;
      // ... other relevant metadata
    };
  }
  ```
- **Response (Error - 400 Bad Request / 500 Internal Server Error):**
  ```typescript
  interface ErrorResponse {
    success: false;
    message: string;
    errorCode?: string;
  }
  ```

**2. Next.js API Route: `/api/download`**
- **Purpose:** Initiates the download of a video from a given URL with specified format and quality.
- **Method:** `POST`
- **Path:** `/api/download`
- **Request Body:**
  ```typescript
  interface DownloadRequest {
    url: string; // Required
    formatId: string; // Required - corresponds to formatId from /api/fetch-details
    quality?: string; // Optional - specific quality if available
  }
  ```
- **Response (Success - 200 OK):**
  - **Content-Type:** `application/octet-stream` (for direct file download streaming)
  - **Headers:** `Content-Disposition: attachment; filename="video.mp4"`
  - **Body:** Raw video/audio stream.
  - **Note:** Metadata will be saved client-side after successful stream completion or via a separate metadata API call.
- **Response (Error - 400 Bad Request / 500 Internal Server Error):**
  ```typescript
  interface ErrorResponse {
    success: false;
    message: string;
    errorCode?: string;
  }
  ```

**3. PWA Web Share Target API (Browser Interface)**
- **Purpose:** Allows Wgetube PWA to receive shared URLs from other applications.
- **Manifest Configuration:** `manifest.json` will define `share_target` with `action` and `params`.
- **Service Worker:** Intercepts `fetch` events for the `share_target` action, extracts the URL, and initiates the download process via the `/api/download` endpoint.

**4. File System Access API (`window.showSaveFilePicker`) (Browser Interface)**
- **Purpose:** Provides a mechanism for web applications to interact directly with the user's local file system, allowing users to choose where to save files.
- **Method:** `window.showSaveFilePicker(options?: SaveFilePickerOptions)`
- **Options:** `suggestedName`, `types` (e.g., `accept: { 'video/mp4': ['.mp4'] }`)
- **Return:** `Promise<FileSystemFileHandle>` - A handle to the chosen file.
- **Usage:** After obtaining a `FileSystemFileHandle`, a `WritableStream` can be created to write the downloaded video data directly to the user-selected file.

### Workflows and Sequencing

### Workflows and Sequencing

**1. Story 1.1: Project Setup & Core Dependencies**
- **Actors:** Developer
- **Flow:**
  1. Developer runs `npx create-next-app@latest wgetube --typescript --tailwind --eslint --app --import-alias "@/*"`.
  2. Developer installs `ytdlp-nodejs` via `npm install ytdlp-nodejs`.
  3. Developer verifies setup with `npm run dev`.

**2. Story 1.2: Basic Video Download via URL**
- **Actors:** User, Wgetube Frontend, Next.js API (`/api/fetch-details`, `/api/download`), `ytdlp-nodejs`.
- **Flow:**
  1. **User:** Pastes video URL into input field on Wgetube UI.
  2. **Wgetube Frontend:** Calls `GET /api/fetch-details?url={videoUrl}`.
  3. **Next.js API (`/api/fetch-details`):** Receives URL, invokes `ytdlp-nodejs` to get video metadata and available formats.
  4. **Next.js API (`/api/fetch-details`):** Returns metadata and formats to Frontend.
  5. **Wgetube Frontend:** Displays video details and format/quality options.
  6. **User:** Selects desired format/quality, clicks "Download".
  7. **Wgetube Frontend:** Calls `POST /api/download` with `{ url, formatId, quality }`.
  8. **Next.js API (`/api/download`):** Receives request, invokes `ytdlp-nodejs` to start download.
  9. **Next.js API (`/api/download`):** Streams downloaded video data directly to the Frontend.
  10. **Wgetube Frontend:** (If File System Access API supported and permitted) Prompts user via `window.showSaveFilePicker()` to select save location.
  11. **Wgetube Frontend:** Writes streamed data to the selected file handle.
  12. **Wgetube Frontend:** Stores downloaded media metadata (including `filePath` or `fileHandle`) in IndexedDB via Local Storage Manager.
  13. **Wgetube Frontend:** Displays download completion and updates library view.

**3. Story 1.3: PWA Share Target Integration**
- **Actors:** Mobile User, Native App (e.g., YouTube), Wgetube PWA Service Worker, Wgetube Frontend, Next.js API (`/api/download`).
- **Flow:**
  1. **Mobile User:** Shares a video link from a native app.
  2. **Native App:** Presents Wgetube PWA as a share target.
  3. **Mobile User:** Selects Wgetube PWA.
  4. **Wgetube PWA Service Worker:** Intercepts the shared URL.
  5. **Wgetube PWA Service Worker:** Passes the URL to the Wgetube Frontend (e.g., via `postMessage` or by opening a specific PWA route).
  6. **Wgetube Frontend:** Automatically initiates the download process (steps 2-13 from Story 1.2, potentially skipping explicit format selection if a default is configured or by prompting the user).

**4. Story 1.4: Domain Replacement Download Trigger**
- **Actors:** User, Browser, Wgetube Frontend, Next.js API (`/api/fetch-details`, `/api/download`).
- **Flow:**
  1. **User:** Modifies a video URL in the browser address bar (e.g., `youtube.com` to `wgetube.hammaadworks.com`) and navigates.
  2. **Browser:** Navigates to the Wgetube application with the modified URL.
  3. **Wgetube Frontend:** Parses the URL, extracts the original video URL.
  4. **Wgetube Frontend:** Automatically initiates the video details fetching and download process (steps 2-13 from Story 1.2).

**5. Story 1.5: Direct File System Access for Downloaded Content**
- **Actors:** User, Wgetube Frontend, Browser (File System Access API).
- **Flow:**
  1. **Wgetube Frontend:** (After download stream is ready, as part of Story 1.2/1.3/1.4 flow) Checks for File System Access API support and user permission status.
  2. **Wgetube Frontend:** (If no permission) Displays an interstitial explaining the need for file system access.
  3. **User:** (If prompted) Grants or denies permission.
  4. **Wgetube Frontend:** (If permission granted) Invokes `window.showSaveFilePicker()`.
  5. **User:** Selects a save location and file name in the native file picker.
  6. **Wgetube Frontend:** Obtains a `FileSystemFileHandle`.
  7. **Wgetube Frontend:** Creates a `WritableStream` from the handle and pipes the downloaded video data to it.
  8. **Wgetube Frontend:** Stores the `filePath` (or a serializable representation of `fileHandle`) and other metadata in IndexedDB.
  9. **Wgetube Frontend:** (If permission denied or API not supported) Falls back to browser's default download location or stores content/metadata in IndexedDB directly.

## Non-Functional Requirements

### Performance

### Performance
- **Download Speed:** Optimized to minimize latency for video fetching and streaming, aiming for near real-time initiation of downloads after URL submission.
- **Application Responsiveness:** The UI must remain fluid and responsive during download operations, avoiding any perceptible lag.
- **Resource Utilization:** Strict adherence to Vercel's Hobby Plan limits (100 GB/month bandwidth, 4 hours/month CPU time) for serverless functions. This requires efficient `ytdlp-nodejs` usage and potentially direct client downloads where feasible.
- **Cold Start Optimization:** Next.js API routes will be optimized to minimize serverless function cold start times for download requests.

(Refer to PRD: Performance, Architecture: Performance Considerations, ADR-001)

### Security

### Security
- **Minimal Acceptable Security:** For the MVP, the focus is on minimal acceptable security, as authentication/authorization is explicitly out of scope.
- **Data Handling:** Downloaded content and its metadata are stored locally on the user's device (IndexedDB, File System Access API). No sensitive user data will be stored on the server.
- **URL Validation:** Robust server-side and client-side validation of input URLs to prevent injection attacks or processing of malicious links.
- **Dependency Security:** Regular updates of `ytdlp-nodejs` and other dependencies to mitigate known vulnerabilities.

(Refer to PRD: Non-Functional Requirements - Security, Architecture: Validation Report - Failed Items)

### Reliability/Availability

### Reliability/Availability
- **Download Resilience:** Implement retry mechanisms for transient network errors during video fetching and downloading.
- **Fallback Storage:** If the File System Access API is denied or unsupported, gracefully fall back to browser's default download location or IndexedDB for storing content.
- **Error Handling:** Comprehensive error handling for `ytdlp-nodejs` operations, providing informative feedback to the user for download failures.
- **Cross-Platform/Browser Compliance:** Ensure consistent and reliable functionality across supported operating systems and browsers.

(Refer to PRD: Non-Functional Requirements - Reliability, Architecture: Performance Considerations)

### Observability

### Observability
- **Logging:** Implement basic server-side logging for API route invocations, `ytdlp-nodejs` execution status, and error events. Client-side logging for UI interactions and errors.
- **Error Reporting:** Client-side error reporting for unhandled exceptions and API call failures.
- **Vercel Monitoring:** Utilize Vercel's built-in dashboard for monitoring bandwidth and CPU usage of serverless functions to ensure adherence to free-tier limits.

(Refer to Architecture: Logging Strategy - *Note: This section is not fully detailed in the Architecture document, but basic logging will be implemented.*)

## Dependencies and Integrations

## Dependencies and Integrations

- **Next.js (v16.x)**
  - **Type:** Full-stack React framework
  - **Integration:** Provides the core application structure, routing (client-side and API routes), and server-side rendering capabilities.

- **React (v18.x)**
  - **Type:** JavaScript library for building user interfaces
  - **Integration:** Used by Next.js for all UI components and client-side logic.

- **`ytdlp-nodejs` (latest stable)**
  - **Type:** Node.js wrapper for `yt-dlp`
  - **Integration:** Used within Next.js API routes to programmatically interact with `yt-dlp` for fetching video metadata and downloading content.

- **`yt-dlp` (latest stable binary)**
  - **Type:** Command-line video downloader
  - **Integration:** The underlying tool executed by `ytdlp-nodejs` to perform the actual video downloading from various sources.

- **IndexedDB / LocalForage (latest stable)**
  - **Type:** Client-side storage API / Wrapper library
  - **Integration:** Used by the Local Storage Manager to persist metadata for downloaded and imported media, and as a fallback for storing actual media content if File System Access API is unavailable.

- **File System Access API (Browser Native)**
  - **Type:** Browser API
  - **Integration:** Used by the File System Access API Handler to allow users to directly select save locations for downloaded media and write content to their local file system.

- **PWA Web Share Target API (Browser Native)**
  - **Type:** Browser API
  - **Integration:** Configured in `manifest.json` and handled by the Service Worker to enable receiving shared URLs from native mobile applications.

- **Tailwind CSS (latest stable)**
  - **Type:** Utility-first CSS framework
  - **Integration:** Used for styling the application components, providing a highly customizable and efficient styling approach.

- **ESLint (latest stable)**
  - **Type:** Pluggable JavaScript linter
  - **Integration:** Integrated into the development workflow for maintaining code quality and consistency.

- **TypeScript (latest stable)**
  - **Type:** Superset of JavaScript
  - **Integration:** Used throughout the project for type safety, improving code maintainability and reducing bugs.

## Acceptance Criteria (Authoritative)

## Acceptance Criteria (Authoritative)

**Story 1.1: Project Setup & Core Dependencies**
1.  **Given** a new project, **when** `create-next-app` is run with `--typescript --tailwind --eslint --app --import-alias "@/*"`, **then** the project structure is initialized.
2.  **And** core dependencies like `ytdlp-nodejs` are installed and available for use.
3.  **And** `npm run dev` starts the development server without errors.

**Story 1.2: Basic Video Download via URL**
4.  **Given** I am on the downloader page, **when** I paste a valid YouTube video URL into the input field and click "Fetch Details", **then** the system displays video details (thumbnail, title, duration) and available formats.
5.  **And** the system performs sanity checks on the pasted URL to ensure it's a valid video source and prevents unnecessary resource usage for invalid links.
6.  **And** the system optimizes the process to quickly display download options and initiate download without wasting resources.
7.  **And** when I select a desired format/quality and click "Download", **then** the video download initiates and progress is shown.
8.  **And** when the download is complete, **then** the system proceeds to save the file as per Story 1.5.

**Story 1.3: PWA Share Target Integration**
9.  **Given** Wgetube is installed as a PWA on my mobile device, **when** I share a YouTube or Instagram Reels link from its native app, **then** Wgetube appears as a share target.
10. **And** the system performs sanity checks on the shared URL to ensure it's a valid video source and prevents unnecessary resource usage for invalid links.
11. **And** the system optimizes the process to quickly display download options and initiate download without wasting resources.
12. **And** when Wgetube is selected as a share target, **then** the PWA opens, video details are automatically fetched, and the download process is initiated.
13. **And** when the download is complete, **then** the downloaded video is available in my local library.

**Story 1.4: Domain Replacement Download Trigger**
14. **Given** I am viewing a video on a supported platform (e.g., YouTube, Instagram), **when** I manually change the domain in the URL from `youtube.com` to `wgetube.hammaadworks.com` (e.g., `https://www.youtube.com/watch?v=abc` becomes `https://www.wgetube.hammaadworks.com/watch?v=abc`) and navigate to it, **then** the Wgetube application launches (if not already open) and automatically initiates the video details fetching process for the original video URL.
15. **And** the system performs sanity checks on the modified URL to ensure it's a valid video source.
16. **And** the system optimizes the process to quickly display download options without unnecessary resource consumption.

**Story 1.5: Direct File System Access for Downloaded Content**
17. **Given** I initiate a download (from Story 1.2 or 1.4), **when** the download is complete, **then** the browser prompts me to select a save location using the File System Access API.
18. **And** before prompting for file system access, the app educates the user on why this permission is required for smooth functioning.
19. **And** if the user grants permission, **then** the browser prompts me to select a save location using the File System Access API.
20. **And** if the user denies permission, **then** the file is stored in the browser's default download location or IndexedDB as a fallback.
21. **And** when I select a save location, **then** the video and its metadata (title, duration, source) are stored in the chosen location.
22. **And** when content is stored locally, **then** I can still access and play the content from the saved location.
23. **And** when content is stored locally, **then** I browse my library, and the content is listed with its metadata, referencing its location on the file system.

## Traceability Mapping

## Traceability Mapping

| AC ID | Spec Section | Component(s)/API(s) | Test Idea |
|---|---|---|---|
| 1.1.1 | Detailed Design: Workflows & Sequencing (Story 1.1) | Next.js Frontend, `package.json` | Verify `create-next-app` output, check `ytdlp-nodejs` in `package.json`, run `npm run dev`. |
| 1.1.2 | Detailed Design: Workflows & Sequencing (Story 1.1) | `package.json` | Verify `ytdlp-nodejs` is listed as a dependency. |
| 1.1.3 | Detailed Design: Workflows & Sequencing (Story 1.1) | Next.js Frontend | Run `npm run dev`, verify no errors and development server starts. |
| 1.2.4 | Detailed Design: Workflows & Sequencing (Story 1.2) | Next.js Frontend, `/api/fetch-details` | Paste valid YouTube URL, verify UI displays details and formats. |
| 1.2.5 | Detailed Design: Workflows & Sequencing (Story 1.2) | Next.js API Routes | Test with invalid URLs (e.g., non-video, unsupported domain), verify error handling. |
| 1.2.6 | Detailed Design: Workflows & Sequencing (Story 1.2) | Next.js API Routes | Measure response time for `fetch-details` and download initiation. |
| 1.2.7 | Detailed Design: Workflows & Sequencing (Story 1.2) | Next.js Frontend, `/api/download` | Select format, click download, verify progress indicator. |
| 1.2.8 | Detailed Design: Workflows & Sequencing (Story 1.2, 1.5) | Local Storage Manager, File System Access API Handler | Verify metadata saved to IndexedDB, and file saved to chosen location or fallback. |
| 1.3.9 | Detailed Design: Workflows & Sequencing (Story 1.3) | PWA Service Worker, `manifest.json` | Share YouTube link from mobile, verify Wgetube appears as target. |
| 1.3.10 | Detailed Design: Workflows & Sequencing (Story 1.3) | PWA Service Worker, Next.js API Routes | Share invalid URL, verify error handling. |
| 1.3.11 | Detailed Design: Workflows & Sequencing (Story 1.3) | PWA Service Worker, Next.js API Routes | Measure time from share to download initiation. |
| 1.3.12 | Detailed Design: Workflows & Sequencing (Story 1.3) | Wgetube Frontend, Local Storage Manager | Share valid URL, verify PWA opens, download initiates, and video appears in library. |
| 1.4.13 | Detailed Design: Workflows & Sequencing (Story 1.4) | Next.js Frontend, Next.js API Routes | Change `youtube.com` to `wgetube.hammaadworks.com`, verify app launches and fetches details. |
| 1.4.14 | Detailed Design: Workflows & Sequencing (Story 1.4) | Next.js API Routes | Test with malformed modified URLs, verify error handling. |
| 1.4.15 | Detailed Design: Workflows & Sequencing (Story 1.4) | Next.js API Routes | Measure time from navigation to download options display. |
| 1.5.16 | Detailed Design: Workflows & Sequencing (Story 1.5) | File System Access API Handler | Initiate download, verify browser prompts for save location. |
| 1.5.17 | Detailed Design: Workflows & Sequencing (Story 1.5) | Wgetube Frontend | Verify educational prompt before File System Access API. |
| 1.5.18 | Detailed Design: Workflows & Sequencing (Story 1.5) | File System Access API Handler | Grant permission, verify save location prompt. |
| 1.5.19 | Detailed Design: Workflows & Sequencing (Story 1.5) | File System Access API Handler, Local Storage Manager | Deny permission, verify fallback to default download or IndexedDB. |
| 1.5.20 | Detailed Design: Workflows & Sequencing (Story 1.5) | Local Storage Manager, File System Access API Handler | Select save location, verify video and metadata stored. |
| 1.5.21 | Detailed Design: Workflows & Sequencing (Story 1.5) | Local Storage Manager | Verify downloaded content can be accessed and played from saved location. |
| 1.5.22 | Detailed Design: Workflows & Sequencing (Story 1.5) | Local Storage Manager, Next.js Frontend | Browse library, verify content listed with metadata and location reference. |

## Risks, Assumptions, Open Questions

## Risks, Assumptions, Open Questions

- **Risk: Vercel Free Tier Limits Exceeded.**
  - **Description:** High download traffic or CPU-intensive video processing could quickly exhaust Vercel's Hobby Plan bandwidth (100 GB/month) or CPU time (4 hours/month) limits, leading to service interruption.
  - **Mitigation/Next Step:** Implement aggressive monitoring of Vercel usage. Explore direct client download link extraction where possible to offload bandwidth. If limits are consistently hit, investigate a hybrid backend solution (e.g., Python on Render/Railway) for heavy downloading.

- **Risk: `yt-dlp` Breaking Changes / Platform Restrictions.**
  - **Description:** YouTube or Instagram may implement changes that break `yt-dlp`'s functionality, or impose stricter download restrictions.
  - **Mitigation/Next Step:** Stay updated with `yt-dlp` releases and community discussions. Implement robust error handling and user feedback for download failures. Research alternative video downloading libraries or APIs as a contingency.

- **Assumption: File System Access API Browser Support & User Adoption.**
  - **Description:** Assumed that the File System Access API will be widely supported by target browsers and that users will grant necessary permissions.
  - **Mitigation/Next Step:** Implement graceful fallback to browser's default download location or IndexedDB if the API is not supported or permission is denied. Clearly educate users on the benefits of granting permission.

- **Question: Optimal `ytdlp-nodejs` Configuration for Resource Efficiency.**
  - **Description:** What are the most resource-efficient `ytdlp-nodejs` options (e.g., specific formats, quality settings, streaming parameters) to minimize Vercel CPU and bandwidth consumption?
  - **Next Step:** Conduct performance testing and profiling during implementation to identify and apply optimal configurations.

- **Question: Handling Large File Downloads on Vercel.**
  - **Description:** How will very large video files be handled to avoid serverless function timeouts or memory limits on Vercel's free tier?
  - **Next Step:** Investigate chunked downloads, streaming directly to client, or offloading to a dedicated download service if necessary.

## Test Strategy Summary

## Test Strategy Summary

- **Unit Tests:** Focus on individual functions and components (e.g., URL validation logic, `ytdlp-nodejs` invocation parameters, IndexedDB operations). Use Jest/React Testing Library for JavaScript/TypeScript components.
- **Integration Tests:** Verify the interaction between components and services (e.g., Frontend to API route, API route to `ytdlp-nodejs`, PWA Service Worker to Frontend). Test the full download flow from URL input to file saving.
- **End-to-End (E2E) Tests:** Use Playwright or Cypress to simulate user journeys (e.g., pasting URL, selecting format, initiating download, verifying file presence in library, testing PWA share target). Ensure all acceptance criteria are covered.
- **Performance Tests:** Monitor Vercel metrics during testing to assess bandwidth and CPU consumption. Test with various video lengths and qualities.
- **Accessibility Tests:** Manual and automated checks (e.g., Lighthouse, axe-core) to ensure WCAG compliance for UI elements and interactions.
- **Edge Cases:** Test with invalid URLs, unsupported video sources, network interruptions during download, user denying File System Access API permission, and very large video files.
