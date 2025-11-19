# Architecture

## Executive Summary

The Wgetube architecture is designed as a performant, highly usable, and cost-efficient web application, leveraging Next.js (React) for a full-stack experience, hosted on Vercel's free tier. Video downloading is handled via `ytdlp-nodejs` within Next.js API Routes, with local data persistence using IndexedDB and direct file system access for downloaded media. The design prioritizes a minimalist UX, PWA capabilities, and a novel "Looper Tutor" for repetitive learning, while carefully managing Vercel's resource limitations.

## Project Initialization

The project will be initialized using `npx create-next-app@latest` to establish a robust and modern foundation.

First implementation story should execute:
```bash
npx create-next-app@latest wgetube --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

This command establishes the base architecture with these decisions:
- **Next.js Framework:** Provided
- **Language/TypeScript:** Provided
- **Styling solution:** Tailwind CSS (Provided)
- **Linting/Formatting:** ESLint (Provided)
- **Build tooling:** Next.js (Provided)

## Decision Summary

| Category | Decision | Version | Affects Epics | Rationale |
| -------- | -------- | ------- | ------------- | --------- |

| Data Persistence | Local-only (IndexedDB/LocalForage) | N/A | Epic 1, Epic 2, Epic 3 | Cost-effective, supports offline-first, aligns with free-tier hosting. Metadata stored locally. |
| API Pattern | RESTful API using Next.js API Routes | N/A | Epic 1 | Leverages Next.js capabilities, unified JS/TS stack, suitable for serverless functions. |
| Authentication/Authorization | Deferred for MVP | N/A | N/A | Focus on core features for MVP; minimal acceptable security initially. |
| File Storage | File System Access API (fallback to IndexedDB/browser default) | N/A | Epic 1, Epic 2 | Provides user control over download location, robust fallback for compatibility. |
| Deployment Target | Vercel (Hobby Plan) | N/A | All Epics | Near-zero deployment costs, excellent developer experience, global CDN. |
| Error Handling Strategy | Client-side (toast/modal), Server-side (logging) | N/A | All Epics | Consistent user feedback and backend visibility for issues. |
| Logging Strategy | Basic server-side (API, ytdlp-nodejs), Client-side (UI errors) | N/A | All Epics | Essential for debugging and monitoring resource usage. |
| Date/Time Handling | ISO 8601 strings (API/storage), Locale-specific (UI) | N/A | All Epics | Ensures consistency in data exchange and user-friendly display. |
| API Response Format | Standard JSON ({success, data, message, errorCode}) | N/A | Epic 1 | Predictable data structure for client-server communication. |
| Testing Strategy | Unit, Integration, E2E, Performance, Accessibility | N/A | All Epics | Ensures code quality, functionality, and adherence to NFRs. |

## Project Structure

```
/var/codespace/wgetube/
├── app/                          # Next.js App Router
│   ├── (main)/
│   │   ├── page.tsx              # Main landing page/downloader entry
│   │   └── layout.tsx
│   ├── api/
│   │   ├── download/
│   │   │   └── route.ts          # Handles video download requests
│   │   └── fetch-details/
│   │       └── route.ts          # Fetches video metadata
│   ├── library/
│   │   └── page.tsx              # Content library UI
│   ├── looper-tutor/
│   │   └── page.tsx              # Looper Tutor UI
│   ├── tasbeeh-counter/
│   │   └── page.tsx              # Tasbeeh Counter UI
│   └── layout.tsx                # Root layout
├── components/                   # Reusable UI components
│   ├── ui/                       # Shadcn/ui components
│   └── common/                   # Project-specific common components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions and helpers
│   ├── ytdlp-client.ts           # Wrapper for ytdlp-nodejs
│   ├── local-storage.ts          # IndexedDB/LocalForage manager
│   └── file-system-access.ts     # File System Access API handler
├── styles/
│   └── globals.css               # Tailwind CSS and global styles
├── types/                        # TypeScript type definitions
├── public/                       # Static assets
├── .env                          # Environment variables
├── next.config.js
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## Epic to Architecture Mapping

| Epic | Architectural Components/Areas |
|---|---|
| Epic 1: Foundation & Core Downloader | Next.js Frontend, Next.js API Routes, `ytdlp-nodejs` Integration, PWA Service Worker, Local Storage Manager, File System Access API Handler |
| Epic 2: Looper Tutor & Media Management | Next.js Frontend, Local Storage Manager, File System Access API Handler, Media Player Component |
| Epic 3: Tasbeeh Counter & Personalization | Next.js Frontend, Local Storage Manager |
| Epic 4: User Experience & Accessibility | Next.js Frontend, Tailwind CSS, WCAG Compliance, Performance Optimizations |
| Epic 5: Landing Page & Growth Features | Next.js Frontend, Next.js API Routes (for future growth features) |

## Technology Stack Details

### Core Technologies

-   **Next.js (v14.x):** Full-stack React framework for building the web application, providing routing, API routes, and server-side rendering capabilities.
-   **React (v18.x):** JavaScript library for building user interfaces, forming the foundation of the frontend.
-   **TypeScript (v5.x):** Superset of JavaScript used for type safety, improving code maintainability and reducing bugs.
-   **Tailwind CSS (v3.x):** Utility-first CSS framework for styling the application components, ensuring a consistent and efficient design.
-   **`ytdlp-nodejs` (latest stable):** Node.js wrapper for `yt-dlp`, used within Next.js API routes to fetch video metadata and download content.
-   **IndexedDB / LocalForage (latest stable):** Client-side storage for persisting metadata of downloaded and imported media, and as a fallback for content storage.
-   **Vercel (Hobby Plan):** Cloud platform for hosting the Next.js application, offering seamless deployment and global CDN, while adhering to free-tier limitations.

### Integration Points

-   **Next.js API Routes:** Serve as the backend for frontend communication, handling video metadata fetching and download initiation by wrapping `ytdlp-nodejs`.
-   **PWA Web Share Target API:** Enables seamless integration with mobile native share menus, allowing users to share video links directly to the Wgetube PWA for automatic processing.
-   **File System Access API:** Provides direct interaction with the user's local file system, allowing users to select custom download locations for video and audio content.
-   **IndexedDB / LocalForage:** Integrates with the application's local storage manager to persist metadata for downloaded and imported media, and to manage file handles/paths.

## Novel Architectural Patterns

### 1. Dynamic File System Access API for Looper Tutor

-   **Purpose:** To provide users with direct control over where downloaded video and audio content is stored on their local device, enhancing file management and offline access for the Looper Tutor.
-   **Components Involved:** Wgetube Frontend (File System Access API Handler), Browser's native File System Access API, Local Storage Manager (IndexedDB).
-   **Data Flow:** After a video stream is ready for download, the Frontend invokes `window.showSaveFilePicker()` to prompt the user for a save location. Upon user selection, a `FileSystemFileHandle` is obtained, and the downloaded stream is written directly to the chosen file. Metadata (including a reference to the file) is stored in IndexedDB.
-   **Implementation Guide for Agents:** Utilize `window.showSaveFilePicker` for user interaction. Implement graceful fallback to browser default downloads or IndexedDB if the API is unsupported or permission is denied. Store file references and metadata in IndexedDB.
-   **Edge Cases and Failure Modes:** User denies permission, browser does not support API, disk full, file corruption during write.
-   **Affects Epics:** Epic 1 (Story 1.5), Epic 2 (Story 2.1, 2.2, 2.3, 2.8).

### 2. PWA Web Share Target Integration

-   **Purpose:** To enable a frictionless mobile experience where users can share video links directly from native apps (YouTube, Instagram) to the Wgetube PWA, triggering automatic download processing.
-   **Components Involved:** Mobile Native App, Wgetube PWA Service Worker, Wgetube Frontend, Next.js API Routes.
-   **Data Flow:** A user shares a link from a native app. The PWA Service Worker, configured via `manifest.json`, intercepts the shared URL. The Service Worker then communicates the URL to the Wgetube Frontend, which initiates the video details fetching and download process via Next.js API Routes.
-   **Implementation Guide for Agents:** Configure `manifest.json` with `share_target`. Implement a Service Worker to handle `fetch` events for the share target action. Pass the received URL to the main PWA application for processing.
-   **Edge Cases and Failure Modes:** Invalid shared URL, PWA not installed, network issues during processing.
-   **Affects Epics:** Epic 1 (Story 1.3).

### 3. Domain Replacement Download Trigger

-   **Purpose:** To provide an alternative, quick way for users to initiate downloads by simply changing the domain of a supported video URL (e.g., `youtube.com` to `wgetube.hammaadworks.com`) in their browser's address bar.
-   **Components Involved:** User's Browser, Wgetube Frontend, Next.js API Routes.
-   **Data Flow:** The user navigates to a modified URL. The Wgetube Frontend, upon loading, parses the URL to extract the original video URL. It then automatically initiates the video details fetching and download process via Next.js API Routes.
-   **Implementation Guide for Agents:** Implement client-side URL parsing logic to detect the custom domain and extract the original video URL. Redirect or process the request to trigger the standard download flow.
-   **Edge Cases and Failure Modes:** Malformed modified URL, original video URL extraction failure, unsupported original domain.
-   **Affects Epics:** Epic 1 (Story 1.4).

-   **Feature-based:** Organize UI components and related logic in a feature-based structure (e.g., `app/downloader`, `app/looper-tutor`).
-   **Shared Utilities:** Place common utility functions and hooks in `lib/` and `hooks/` respectively.
-   **Client-side:** Use toast notifications for minor, non-blocking errors (e.g., invalid URL input). Use modal dialogs for critical errors requiring user action (e.g., video unavailable, storage full).
-   **Server-side (API Routes):** Implement robust `try-catch` blocks. Return consistent JSON error responses with `message` and `errorCode`.
-   **User Feedback:** Provide clear, user-friendly, and actionable error messages, avoiding technical jargon.

### Logging Strategy

-   **Server-side (API Routes):** Implement basic logging for API request/response, `ytdlp-nodejs` execution status, and error events. Use `console.log` for simple debugging, consider a more structured logger for production if needed.
-   **Client-side:** Log unhandled exceptions and API call failures to the browser console. Avoid logging sensitive user data.

### Testing Strategy

-   **Unit Tests:** Use Jest/React Testing Library for individual functions and components. Co-locate tests with the code they test (e.g., `component.test.ts`).
-   **Integration Tests:** Verify interactions between components and services (e.g., Frontend to API route, API route to `ytdlp-nodejs`).
-   **End-to-End (E2E) Tests:** Use Playwright or Cypress to simulate user journeys (e.g., pasting URL, downloading, verifying library). 
-   **Performance Tests:** Monitor Vercel metrics; test with various video lengths/qualities.
-   **Accessibility Tests:** Manual and automated checks (Lighthouse, axe-core) for WCAG compliance.

## Consistency Rules

These rules ensure consistent implementation across all AI agents and are detailed in the "Implementation Patterns" section above:

-   **Naming Conventions:** Refer to "Implementation Patterns > Naming Conventions".
-   **Code Organization:** Refer to "Implementation Patterns > Code Organization".
-   **Error Handling:** Refer to "Implementation Patterns > Error Handling".
-   **Logging Strategy:** Refer to "Implementation Patterns > Logging Strategy".
-   **Accessibility:** Adhere to WCAG highest standards for all UI elements and interactions.

## Data Architecture

### Data Models

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

**2. TasbeehZikr (IndexedDB/LocalForage)**
This model represents a custom Zikr phrase and its associated counting history.

```typescript
interface TasbeehZikr {
  id: string; // Unique identifier
  phrase: string;
  translation: string;
  currentCount: number;
  sessionTarget?: number;
  history: Array<{ date: Date; count: number; target?: number }>;
}
```

**3. UserSettings (IndexedDB/LocalForage)**
This model stores user-configurable application settings.

```typescript
interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  defaultPlaybackSpeed: number; // e.g., 1.0, 1.25
  enableHapticFeedback: boolean;
  tasbeehInputMethod: 'screen' | 'volume_up' | 'volume_down' | 'keyboard';
  tasbeehKeyboardKey?: string; // e.g., 'Space', 'Enter'
  showTasbeehDecrementButton: boolean;
}
```

### Relationships

-   `DownloadedMedia` records are stored locally in IndexedDB, managed by the Local Storage Manager. `filePath` or `fileHandle` links the metadata to the actual media content on the user's device.
-   `TasbeehZikr` and `UserSettings` are also stored in IndexedDB, providing local persistence for personalization features.

## API Contracts

### 1. Next.js API Route: `/api/fetch-details`

-   **Purpose:** Fetches metadata for a given video URL without initiating a download.
-   **Method:** `GET`
-   **Path:** `/api/fetch-details`
-   **Request Query Parameters:**
    -   `url`: `string` (Required) - The URL of the video to fetch details for.
-   **Response (Success - 200 OK):**
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
-   **Response (Error - 400 Bad Request / 500 Internal Server Error):**
    ```typescript
    interface ErrorResponse {
      success: false;
      message: string;
      errorCode?: string;
    }
    ```

### 2. Next.js API Route: `/api/download`

-   **Purpose:** Initiates the download of a video from a given URL with specified format and quality.
-   **Method:** `POST`
-   **Path:** `/api/download`
-   **Request Body:**
    ```typescript
    interface DownloadRequest {
      url: string; // Required
      formatId: string; // Required - corresponds to formatId from /api/fetch-details
      quality?: string; // Optional - specific quality if available
    }
    ```
-   **Response (Success - 200 OK):**
    -   **Content-Type:** `application/octet-stream` (for direct file download streaming)
    -   **Headers:** `Content-Disposition: attachment; filename="video.mp4"`
    -   **Body:** Raw video/audio stream.
    -   **Note:** Metadata will be saved client-side after successful stream completion or via a separate metadata API call.
-   **Response (Error - 400 Bad Request / 500 Internal Server Error):**
    ```typescript
    interface ErrorResponse {
      success: false;
      message: string;
      errorCode?: string;
    }
    ```

## Security Architecture

-   **Minimal Acceptable Security for MVP:** As authentication/authorization is explicitly out of scope for the MVP, the focus is on minimal acceptable security measures.
-   **Data Handling:** Downloaded content and its metadata are stored locally on the user's device (IndexedDB, File System Access API). No sensitive user data will be stored on the server.
-   **URL Validation:** Robust server-side and client-side validation of input URLs to prevent injection attacks or processing of malicious links.
-   **Dependency Security:** Regular updates of `ytdlp-nodejs` and other dependencies to mitigate known vulnerabilities.
-   **PWA Security:** Adherence to HTTPS for all PWA assets and communications to ensure data integrity and confidentiality.

## Performance Considerations

-   **Download Speed:** Optimized to minimize latency for video fetching and streaming, aiming for near real-time initiation of downloads after URL submission.
-   **Application Responsiveness:** The UI must remain fluid and responsive during download operations, avoiding any perceptible lag.
-   **Resource Utilization (Vercel):** Strict adherence to Vercel's Hobby Plan limits (100 GB/month bandwidth, 4 hours/month CPU time) for serverless functions. This requires efficient `ytdlp-nodejs` usage and potentially direct client downloads where feasible.
-   **Cold Start Optimization:** Next.js API routes will be optimized to minimize serverless function cold start times for download requests.
-   **Frontend Optimization:** Leverage Next.js features like image optimization, code splitting, and lazy loading for optimal frontend performance.
-   **PWA Caching:** Utilize Service Workers for aggressive caching of static assets to improve load times and offline experience.

## Deployment Architecture

-   **Platform:** Vercel (Hobby Plan initially).
-   **Method:** Git-based deployment, where pushing to the main branch triggers automatic builds and deployments on Vercel.
-   **Scaling:** Vercel's serverless functions provide automatic scaling for API routes. Frontend assets are served globally via CDN.
-   **Monitoring:** Utilize Vercel's built-in dashboard for monitoring bandwidth, CPU usage, and function invocations to ensure adherence to free-tier limits.

## Development Environment

### Prerequisites

-   **Node.js:** Latest LTS version (e.g., v20.x).
-   **npm/yarn/pnpm:** Latest version of your preferred package manager.
-   **Git:** Latest version for version control.
-   **Code Editor:** VS Code (recommended) with relevant extensions (ESLint, Prettier, Tailwind CSS IntelliSense, TypeScript).
-   **Browser:** Modern web browser (Chrome, Firefox, Edge, Safari) for testing PWA features and File System Access API.

### Setup Commands

```bash
# 1. Clone the repository
git clone <repository-url>
cd wgetube

# 2. Install dependencies
npm install  # or yarn install / pnpm install

# 3. Start the development server
npm run dev
```

## Architecture Decision Records (ADRs)

-   **ADR-001: Core Technology Stack for Wgetube**
    -   **Decision:** Next.js (React) for full-stack, Vercel for hosting, `ytdlp-nodejs` for video downloading.
    -   **Rationale:** Cost-efficiency, performance, usability, developer experience, leveraging open-source solutions.
    -   **Consequences:** Benefits of Next.js/Vercel ecosystem, but critical awareness of Vercel free-tier limitations (bandwidth, CPU time) for video downloading. Potential need for hybrid backend in future.

-   **ADR-002: Local-First Data Persistence**
    -   **Decision:** IndexedDB/LocalForage for all application metadata (downloaded media, Tasbeeh Zikrs, user settings).
    -   **Rationale:** Supports offline-first capabilities, aligns with free-tier hosting constraints (no backend database costs), provides fast local access.
    -   **Consequences:** Data is tied to the user's browser instance; no multi-device sync without future backend integration. Requires robust client-side data management.

---

_Generated by BMAD Decision Architecture Workflow v1.0_
_Date: 2025-11-18_
_For: hammaadworks_