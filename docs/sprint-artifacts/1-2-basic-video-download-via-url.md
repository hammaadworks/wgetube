# Story 1.2: Basic Video Download via URL

Status: in-progress

## Story

As a user,
I want to paste a YouTube or Instagram Reels URL and initiate a download,
so that I can save the video for offline viewing.

## Acceptance Criteria

1.  Given I am on the downloader page, when I paste a valid YouTube video URL into the input field and click "Fetch Details", then the system displays video details (thumbnail, title, duration) and available formats.
2.  And the system performs sanity checks on the pasted URL to ensure it's a valid video source and prevents unnecessary resource usage for invalid links.
3.  And the system optimizes the process to quickly display download options and initiate download without wasting resources.
4.  And when I select a desired format/quality and click "Download", then the video download initiates and progress is shown.
5.  And when the download is complete, then the system proceeds to save the file as per Story 1.5.

## Tasks / Subtasks

*   **Task 1: Design and Implement Downloader UI (AC: 1)**
    *   [x] Create a basic page for video downloading.
    *   [x] Implement a text input field for video URL.
    *   [x] Implement a "Fetch Details" button.
    *   [x] Implement UI to display video thumbnail, title, duration, and available formats.
*   **Task 2: Implement URL Validation and Details Fetching (AC: 1, 2, 3)**
    *   [x] Create Next.js API route (`/api/fetch-details`) to use `ytdlp-nodejs` for fetching video metadata.
    *   [x] Implement client-side logic to call `/api/fetch-details` with pasted URL.
    *   [x] Implement basic URL validation logic on both client and server-side to ensure valid video sources (e.g., regex for YouTube/Instagram URLs).
    *   [x] Optimize API calls and data processing for efficiency to quickly display download options.
*   **Task 3: Implement Download Initiation (AC: 4)**
    *   [x] Implement UI for selecting desired format/quality.
    *   [x] Implement a "Download" button.
    *   [x] Create Next.js API route (`/api/download`) to use `ytdlp-nodejs` for video download.
    *   [x] Implement client-side logic to call `/api/download` with selected format/quality.
    *   [x] Implement download progress indication in the UI.
*   **Task 4: Integrate with Story 1.5 for File Saving (AC: 5)**
    *   [x] Ensure the download completion triggers the file saving mechanism as defined in Story 1.5 (Direct File System Access for Downloaded Content).
*   **Task 5: Testing**
    *   [x] Unit test client-side URL validation.
    *   [x] Unit test `ytdlp-nodejs` metadata fetching logic within `/api/fetch-details`.
    *   [x] Unit test `ytdlp-nodejs` download initiation logic within `/api/download`.
    *   [x] Integration test the flow from UI input to metadata display.
    *   [x] Integration test the flow from UI download click to download initiation.
    *   [x] E2E test the full download process for a valid YouTube URL.

## Dev Notes

### Requirements Context Summary

This story enables users to download videos from YouTube and Instagram Reels by pasting a URL. It builds upon the foundational project setup (Story 1.1) and is critical for the core functionality of Wgetube. The implementation will leverage Next.js API Routes and `ytdlp-nodejs` for video fetching and downloading. Client-side UI will be required for URL input, format selection, and download initiation, with robust validation for URLs.

[Source: docs/epics.md#Story-1.2:-Basic-Video-Download-via-URL]
[Source: docs/architecture.md#Executive-Summary]
[Source: docs/architecture.md#API-Contracts]
[Source: docs/architecture.md#Technology-Stack-Details]
[Source: docs/prd.md#I.-Core-Video-Downloading]

- Relevant architecture patterns and constraints
- Source tree components to touch
- Testing standards summary

### Structure Alignment Summary

No `unified-project-structure.md` was found to align against. This story will establish the initial file paths and component locations for the basic video download functionality, ensuring consistency with the overall Next.js project structure established in Story 1.1. No specific "new files" or "architectural deviations" were identified from the previous story that would impact the project structure alignment for this story.

### References

- Cite all technical details with source paths and sections, e.g. [Source: docs/<file>.md#Section]

## Dev Agent Record

### Context Reference

*   [1-2-basic-video-download-via-url.context.xml](stories/1-2-basic-video-download-via-url.context.xml)

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

*   **2025-11-19**: Implemented basic downloader UI page (`app/(main)/downloader/page.tsx`) with URL input, Fetch Details button, and placeholder UI for video details display. Configured custom primary and secondary colors in `app/globals.css` and `tailwind.config.ts`.
*   **2025-11-19**: Implemented server-side API route (`app/api/fetch-details/route.ts`) using `ytdlp-nodejs` for video metadata fetching with URL validation. Updated client-side logic in (`app/(main)/downloader/page.tsx`) to call this API and added client-side URL validation. Installed `ytdlp-nodejs` dependency.
*   **2025-11-19**: Implemented UI for format selection and download button in (`app/(main)/downloader/page.tsx`). Created Next.js API route (`app/api/download/route.ts`) for video download using `ytdlp-nodejs` and integrated client-side download initiation with basic progress indication. 
*   **2025-11-19**: Integrated file saving mechanism with Story 1.5, utilizing `window.showSaveFilePicker()` for direct file system access with a user consent prompt and fallback to browser default download if not supported or denied. (Modified `app/(main)/downloader/page.tsx`)
*   **2025-11-19**: Wrote unit and integration tests for client-side URL validation, `ytdlp-nodejs` metadata fetching, and download initiation within `/api/fetch-details` and `/api/download` respectively. These tests cover UI to API flow and File System Access API integration, including denial fallback.

### File List

*   `app/(main)/downloader/page.tsx`
*   `app/(main)/layout.tsx`
*   `app/api/fetch-details/route.ts`
*   `app/api/download/route.ts`
*   `app/globals.css`
*   `tailwind.config.ts`
*   `package.json` (due to new dependency, and test scripts)
*   `jest.config.js`
*   `jest.setup.js`
*   `__tests__/downloader.test.tsx`

*   **2025-11-19**: Story created by hammaadworks (BMAD).
