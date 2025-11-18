# Wgetube - Epic Breakdown

**Author:** hammaadworks
**Date:** 2025-11-18
**Project Level:** medium
**Target Scale:** 1K requests per day

---

## Overview

This document provides the complete epic and story breakdown for Wgetube, decomposing the requirements from the [PRD](./PRD.md) into implementable stories.

**Development Methodology:** We will follow an Incremental Integrated Development approach. Progress will be integrated with the main application and deployed after every story or a couple of stories, enabling stakeholders to demo and review progress frequently.

**Living Document Notice:** This is the initial version. It will be updated after UX Design and Architecture workflows add interaction and technical details to stories.

- **Epic 1: Foundation & Core Downloader**
  - Goal: Establish the basic application infrastructure and enable users to download videos from supported platforms.
  - FRs Covered: FR1, FR1.1, FR2, FR3, FR4, FR14, FR15, FR17 (initial setup aspects)
- **Epic 2: Looper Tutor & Media Management**
  - Goal: Provide a specialized player for rote learning and allow users to manage their downloaded/imported content.
  - FRs Covered: FR5, FR6, FR7, FR8, FR8.1, FR8.2, FR9, FR10, FR10.1, FR10.2, FR11, FR12, FR12.1, FR17 (playback aspects)
- **Epic 3: Tasbeeh Counter & Personalization**
  - Goal: Offer a dedicated Tasbeeh counter feature with customization and history, and allow for general application personalization.
  - FRs Covered: FR20, FR20.1, FR21, FR22, FR23, FR24, FR24.1, FR25, FR26
- **Epic 4: User Experience & Accessibility**
  - Goal: Ensure the application provides a minimalist, intuitive, and highly accessible user interface across all features.
  - FRs Covered: FR13, FR16, FR17 (UX/performance aspects)
- **Epic 5: Landing Page & Growth Features**
  - Goal: Provide an informative landing page and lay the groundwork for future growth capabilities.
  - FRs Covered: FR18, FR19, FR27

---

## Functional Requirements Inventory

- FR1: Users can initiate video downloads by pasting a URL from YouTube (Videos/Shorts) or Instagram Reels.
- FR1.1: Users can trigger video downloads by replacing the domain of a supported video URL with the Wgetube domain.
- FR2: Users can select desired video and audio formats/qualities for download.
- FR3: The system can automatically download videos when shared directly to the Wgetube PWA from mobile devices.
- FR4: The system can process and store downloaded video and audio content locally, along with associated metadata for history and library management.
- FR5: Users can play downloaded video and audio content, including fullscreen and black screen modes.
- FR6: Users can adjust the playback speed of content via a slider with granular control and hints (e.g., 0.5x, 1.0x, 1.25x), allowing for intermediate values.
- FR7: Users can define and loop specific A-B sections of content for repetitive learning, with seamless and precise setting mechanisms providing immediate visual/auditory feedback.
- FR8: Users can save loops within content for quick access.
- FR8.1: Users can save defined A-B loop sections with a custom name for quick access and reuse, and edit their name and A-B timestamps later.
- FR8.2: The Looper Tutor tracks and displays the number of times a loop has been played, both for the current session and aggregated historically.
- FR9: The player supports background playback of audio.
- FR10: The player supports screen-off playback of audio.
- FR10.1: Users can import local video and audio files from their device into Wgetube's library for use with the Looper Tutor, with associated metadata stored.
- FR10.2: Users can remove downloaded or imported media from their local library.
- FR11: Users can access and browse their library of downloaded content.
- FR12: Users can perform basic organization of downloaded files (e.g., view by date, title).
- FR12.1: Users can configure system default settings (e.g., theme, default playback speed, etc.).
- FR13: The application provides a minimalist and intuitive user interface.
- FR14: The application is a Single Page Application (SPA).
- FR15: The application is cross-operating system and cross-browser compliant.
- FR16: The application adheres to WCAG highest standards for accessibility.
- FR17: The application delivers a highly performant and seamless user experience, particularly for downloading and playback.
- FR18: Users can download specific video chapters or define custom start/end timestamps for downloads. (Growth Feature)
- FR19: Users can initiate downloads via a browser extension for one-click functionality. (Growth Feature)
- FR20: Users can access a dedicated Tasbeeh Counter feature.
- FR20.1: Users can add, edit, and delete custom Zikr phrases and their translations.
- FR21: The Tasbeeh Counter prominently displays the current count, along with a configurable Zikr (phrase) and its translation.
- FR22: Users can increment and decrement the count via on-screen buttons (increment button always present, decrement button configurable), accompanied by haptic feedback.
- FR23: Users can configure input methods for incrementing/decrementing the count, including assigning volume up/down buttons on mobile devices and specific keyboard keys (e.g., spacebar) for desktop/keyboard users.
- FR24: Users can reset the current count.
- FR24.1: The Tasbeeh Counter provides visual feedback (e.g., confetti-like designs) upon reaching specific milestones (e.g., 10, 33, 66, 99) and the user-defined session target.
- FR25: The Tasbeeh Counter stores a history of Zikrs and their counts, and allows users to set a target for the current session.
- FR26: Users can view previous Zikrs as cards and select one to resume counting.
- FR27: The application provides a clean and informative landing page that introduces Wgetube, discusses its key features, and provides information for user training and engagement.

---

## FR Coverage Map

| FR ID | Description | Epic(s) | Story(ies) |
|---|---|---|---|
| FR1 | Users can initiate video downloads by pasting a URL from YouTube (Videos/Shorts) or Instagram Reels. | Epic 1 | Story 1.2 |
| FR1.1 | Users can trigger video downloads by replacing the domain of a supported video URL with the Wgetube domain. | Epic 1 | Story 1.4 |
| FR2 | Users can select desired video and audio formats/qualities for download. | Epic 1 | Story 1.2 |
| FR3 | The system can automatically download videos when shared directly to the Wgetube PWA from mobile devices. | Epic 1 | Story 1.3 |
| FR4 | The system can process and store downloaded video and audio content locally, along with associated metadata for history and library management. | Epic 1 | Story 1.5 |
| FR5 | Users can play downloaded video and audio content, including fullscreen and black screen modes. | Epic 2 | Story 2.3 |
| FR6 | Users can adjust the playback speed of content via a slider with granular control and hints (e.g., 0.5x, 1.0x, 1.25x), allowing for intermediate values. | Epic 2 | Story 2.4 |
| FR7 | Users can define and loop specific A-B sections of content for repetitive learning, with seamless and precise setting mechanisms providing immediate visual/auditory feedback. | Epic 2 | Story 2.5 |
| FR8 | Users can save loops within content for quick access. | Epic 2 | Story 2.6 |
| FR8.1 | Users can save defined A-B loop sections with a custom name for quick access and reuse, and edit their name and A-B timestamps later. | Epic 2 | Story 2.6 |
| FR8.2 | The Looper Tutor tracks and displays the number of times a loop has been played, both for the current session and aggregated historically. | Epic 2 | Story 2.5 |
| FR9 | The player supports background playback of audio. | Epic 2 | Story 2.7 |
| FR10 | The player supports screen-off playback of audio. | Epic 2 | Story 2.7 |
| FR10.1 | Users can import local video and audio files from their device into Wgetube's library for use with the Looper Tutor, with associated metadata stored. | Epic 2 | Story 2.1 |
| FR10.2 | Users can remove downloaded or imported media from their local library. | Epic 2 | Story 2.2 |
| FR11 | Users can access and browse their library of downloaded content. | Epic 2 | Story 2.8 |
| FR12 | Users can perform basic organization of downloaded files (e.g., view by date, title). | Epic 2 | Story 2.8 |
| FR12.1 | Users can configure system default settings (e.g., theme, default playback speed, etc.). | Epic 2 | Story 2.8 |
| FR13 | The application provides a minimalist and intuitive user interface. | Epic 4 | Story 4.1 |
| FR14 | The application is a Single Page Application (SPA). | Epic 1, Epic 4 | Story 1.1, Story 4.1 |
| FR15 | The application is cross-operating system and cross-browser compliant. | Epic 1, Epic 4 | Story 1.1, Story 4.1 |
| FR16 | The application adheres to WCAG highest standards for accessibility. | Epic 4 | Story 4.2 |
| FR17 | The application delivers a highly performant and seamless user experience, particularly for downloading and playback. | Epic 1, Epic 2, Epic 4 | Story 1.1, Story 2.3, Story 4.3 |
| FR18 | Users can download specific video chapters or define custom start/end timestamps for downloads. (Growth Feature) | Epic 5 | Story 5.2 |
| FR19 | Users can initiate downloads via a browser extension for one-click functionality. (Growth Feature) | Epic 5 | Story 5.3 |
| FR20 | Users can access a dedicated Tasbeeh Counter feature. | Epic 3 | Story 3.1 |
| FR20.1 | Users can add, edit, and delete custom Zikr phrases and their translations. | Epic 3 | Story 3.2 |
| FR21 | The Tasbeeh Counter prominently displays the current count, along with a configurable Zikr (phrase) and its translation. | Epic 3 | Story 3.1 |
| FR22 | Users can increment and decrement the count via on-screen buttons (increment button always present, decrement button configurable), accompanied by haptic feedback. | Epic 3 | Story 3.1 |
| FR23 | Users can configure input methods for incrementing/decrementing the count, including assigning volume up/down buttons on mobile devices and specific keyboard keys (e.g., spacebar) for desktop/keyboard users. | Epic 3 | Story 3.3 |
| FR24 | Users can reset the current count. | Epic 3 | Story 3.1 |
| FR24.1 | The Tasbeeh Counter provides visual feedback (e.g., confetti-like designs) upon reaching specific milestones (e.g., 10, 33, 66, 99) and the user-defined session target. | Epic 3 | Story 3.3 |
| FR25 | The Tasbeeh Counter stores a history of Zikrs and their counts, and allows users to set a target for the current session. | Epic 3 | Story 3.4 |
| FR26 | Users can view previous Zikrs as cards and select one to resume counting. | Epic 3 | Story 3.4 |
| FR27 | The application provides a clean and informative landing page that introduces Wgetube, discusses its key features, and provides information for user training and engagement. | Epic 5 | Story 5.1 |

---

## Epic 1: Foundation & Core Downloader

Establish the basic application infrastructure and enable users to download videos from supported platforms.

### Story 1.1: Project Setup & Core Dependencies

As a developer,
I want to set up the basic project structure and integrate core dependencies,
So that I can begin building the application.

**Acceptance Criteria:**

**Given** a new project
**When** `create-next-app` is run with `--typescript --tailwind --eslint --app --import-alias "@/*"`
**Then** the project structure is initialized.

**And** core dependencies like `ytdlp-nodejs` are installed and available for use.
**And** `npm run dev` starts the development server without errors.

**Prerequisites:** None

**Technical Notes:** Use `npx create-next-app@latest wgetube --typescript --tailwind --eslint --app --import-alias "@/*"`. Install `ytdlp-nodejs`.

### Story 1.2: Basic Video Download via URL

As a user,
I want to paste a YouTube or Instagram Reels URL and initiate a download,
So that I can save the video for offline viewing.

**Acceptance Criteria:**

**Given** I am on the downloader page
**When** I paste a valid YouTube video URL into the input field and click "Fetch Details"
**Then** the system displays video details (thumbnail, title, duration) and available formats.

**And** the system performs sanity checks on the pasted URL to ensure it's a valid video source and prevents unnecessary resource usage for invalid links.
**And** the system optimizes the process to quickly display download options and initiate download without wasting resources.
**And** when I select a desired format/quality and click "Download", then the video download initiates and progress is shown.
**And** when the download is complete, then the system proceeds to save the file as per Story 1.5.

**Prerequisites:** Story 1.1

**Technical Notes:** Implement a Next.js API route using `ytdlp-nodejs` to handle video fetching and downloading. Client-side UI for URL input, format selection, and download initiation. Include validation logic for URLs. Optimize API calls and data processing for efficiency.

### Story 1.3: PWA Share Target Integration

As a mobile user,
I want to share a video link directly from YouTube or Instagram to the Wgetube PWA,
So that the download process starts automatically without manual copy-pasting.

**Acceptance Criteria:**

**Given** Wgetube is installed as a PWA on my mobile device
**When** I share a YouTube or Instagram Reels link from its native app
**Then** Wgetube appears as a share target.

**And** the system performs sanity checks on the shared URL to ensure it's a valid video source and prevents unnecessary resource usage for invalid links.
**And** the system optimizes the process to quickly display download options and initiate download without wasting resources.
**And** when Wgetube is selected as a share target, then the PWA opens, video details are automatically fetched, and the download process is initiated.
**And** when the download is complete, then the downloaded video is available in my local library.

**Prerequisites:** Story 1.1, Story 1.2

**Technical Notes:** Implement PWA Web Share Target API. Configure `manifest.json` and service worker to handle shared URLs. Include validation logic for shared URLs. Optimize PWA service worker handling and data processing for efficiency.

### Story 1.4: Domain Replacement Download Trigger

As a user,
I want to be able to replace "youtube.com" or "instagram.com" in a video URL with "wgetube.hammaadworks.com" in my browser's address bar,
So that the Wgetube application automatically processes the video for download.

**Acceptance Criteria:**

**Given** I am viewing a video on a supported platform (e.g., YouTube, Instagram).
**When** I manually change the domain in the URL from `youtube.com` to `wgetube.hammaadworks.com` (e.g., `https://www.youtube.com/watch?v=abc` becomes `https://www.wgetube.hammaadworks.com/watch?v=abc`) and navigate to it.
**Then** the Wgetube application launches (if not already open) and automatically initiates the video details fetching process for the original video URL.
**And** the system performs sanity checks on the modified URL to ensure it's a valid video source.
**And** the system optimizes the process to quickly display download options without unnecessary resource consumption.

**Prerequisites:** Story 1.1, Story 1.2

**Technical Notes:** Implement URL parsing logic to detect the `wgetube.hammaadworks.com` domain and extract the original video URL. Redirect or process the request to trigger the download flow. Consider server-side routing or client-side URL handling.

### Story 1.5: Direct File System Access for Downloaded Content

As a user,
I want to directly select the download location for video and audio content on my device,
So that I have full control over where my files are stored.

**Acceptance Criteria:**

**Given** I initiate a download (from Story 1.2 or 1.4)
**When** the download is complete
**Then** the browser prompts me to select a save location using the File System Access API.
**And** before prompting for file system access, the app educates the user on why this permission is required for smooth functioning.
**And** if the user grants permission, then the browser prompts me to select a save location using the File System Access API.
**And** if the user denies permission, then the file is stored in the browser's default download location or IndexedDB as a fallback.

**And** when I select a save location, then the video and its metadata (title, duration, source) are stored in the chosen location.
**And** when content is stored locally, then I can still access and play the content from the saved location.
**And** when content is stored locally, then I browse my library, and the content is listed with its metadata, referencing its location on the file system.

**Prerequisites:** Story 1.2, Story 1.4

**Technical Notes:** Utilize the File System Access API (`window.showSaveFilePicker`) for direct user-selected file saving. Implement a user-friendly interstitial screen or dialog to explain permission needs. Implement fallback logic for permission denial. Store file handles or paths (if available and persistent) and metadata in IndexedDB for library management.

---

## Epic 2: Looper Tutor & Media Management

Provide a specialized player for rote learning and allow users to manage their downloaded/imported content.

### Story 2.1: Import Local Media

As a user,
I want to import local video and audio files from my device into Wgetube's library,
So that I can use the Looper Tutor with my existing media.

**Acceptance Criteria:**

**Given** I am in the library
**When** I select "Import Media"
**Then** a file picker appears.

**And** when a file is selected, then it is imported into my library with associated metadata and can be used with the Looper Tutor.

**Prerequisites:** Story 1.5

**Technical Notes:** Implement file import functionality using browser file APIs.

### Story 2.2: Remove Library Media

As a user,
I want to remove downloaded or imported media from my local library,
So that I can manage my storage and keep my library organized.

**Acceptance Criteria:**

**Given** I am in the library
**When** I select a media item
**Then** I see an option to "Remove from Library".

**And** when I confirm the removal, then the media item is deleted from my local storage and no longer appears in my library.

**Prerequisites:** Story 2.1

**Technical Notes:** Implement deletion logic for media files, ensuring proper cleanup of associated metadata from IndexedDB.

### Story 2.3: Basic Media Playback

As a user,
I want to play downloaded video and audio content,
So that I can consume the media.

**Acceptance Criteria:**

**Given** I have downloaded content
**When** I select an item from my library and click "Play"
**Then** the media starts playing in a dedicated player.

**And** when I interact with basic controls (play/pause, scrub bar, volume), then the playback responds accordingly.
**And** when I activate fullscreen mode, then the video expands to fill the screen.
**And** when I activate black screen mode, then the screen turns black and only audio plays.

**Prerequisites:** Story 1.5, Story 2.1

**Technical Notes:** Implement a media player component. Handle fullscreen and black screen modes.

### Story 2.4: Playback Speed Control

As a user,
I want to adjust the playback speed of content,
So that I can learn at my own pace.

**Acceptance Criteria:**

**Given** media is playing
**When** I interact with a speed slider/control
**Then** I can select speeds like 0.5x, 1.0x, 1.25x, and intermediate values.

**And** when I change the playback speed, then the media playback speed adjusts immediately without altering pitch.

**Prerequisites:** Story 2.3

**Technical Notes:** Integrate playback speed control into the media player.

### Story 2.5: A-B Section Looping

As a user,
I want to define and loop specific A-B sections of content,
So that I can repeat challenging parts for memorization.

**Acceptance Criteria:**

**Given** media is playing
**When** I activate the A-B loop feature
**Then** a visual interface appears for setting A and B points.

**And** when I set A and B points with precision, then the player seamlessly loops that section.
**And** when a loop is active, then the loop count is displayed, accurately tracking current session and historical plays.

**Prerequisites:** Story 2.3

**Technical Notes:** Implement A-B loop logic within the player, including UI for setting points and displaying loop count.

### Story 2.6: Saved Loops Management

As a user,
I want to save specific points and defined A-B loop sections as "saved loops",
So that I can quickly access important points and reuse specific learning segments.

**Acceptance Criteria:**

**Given** media is playing
**When** I save a specific point or an A-B loop
**Then** it is stored as a "saved loop" and accessible for quick navigation.

**And** when a "saved loop" is defined, then I save it with a custom name, and it is stored and can be reused.
**And** when a "saved loop", then I edit its name or timestamps, and the changes are reflected.

**Prerequisites:** Story 2.5

**Technical Notes:** Implement saving and management of "saved loops" (both single points and A-B sections), including storage and editing functionality.

### Story 2.7: Background and Screen-off Playback

As a user,
I want audio to continue playing when the app is in the background or my screen is off,
So that I can continue learning without interruption.

**Acceptance Criteria:**

**Given** audio content is playing
**When** I switch to another app or lock my screen
**Then** the audio continues to play.

**Prerequisites:** Story 2.3

**Technical Notes:** Implement background audio playback capabilities for PWA.

### Story 2.8: Basic Content Organization

As a user,
I want to access and perform basic organization of my downloaded and imported content,
So that I can easily find and manage my media.

**Acceptance Criteria:**

**Given** I am in the library
**When** I browse my content
**Then** I can view it by date and title.

**And** when I am in the settings, then I configure system default settings (e.g., theme, default playback speed, etc.).

**Prerequisites:** Story 1.5, Story 2.1

**Technical Notes:** Implement library browsing and basic sorting/filtering. Implement settings management for user preferences.

---

## Epic 3: Tasbeeh Counter & Personalization

Offer a dedicated Tasbeeh counter feature with customization and history, and allow for general application personalization.

### Story 3.1: Tasbeeh Counter Core Functionality

As a user,
I want to access a dedicated Tasbeeh Counter, view the current count, and increment/decrement it,
So that I can track my Zikr.

**Acceptance Criteria:**

**Given** I navigate to the Tasbeeh Counter
**When** the page loads
**Then** a prominent current count, configurable Zikr phrase, and its translation are displayed.

**And** when I tap the increment button, then the count increases and haptic feedback is provided.
**And** when I tap the decrement button (if configured), then the count decreases and haptic feedback is provided.

**Prerequisites:** None (can be standalone)

**Technical Notes:** Implement UI for counter, Zikr display, and increment/decrement buttons. Integrate haptic feedback.

### Story 3.2: Zikr Management

As a user,
I want to add, edit, and delete custom Zikr phrases and their translations,
So that I can personalize my Tasbeeh practice.

**Acceptance Criteria:**

**Given** I am on the Tasbeeh Counter page
**When** I access Zikr management
**Then** I can view a list of existing Zikrs.

**And** when I add a new Zikr (phrase and translation), then it appears in my list and can be selected for counting.
**And** when I edit an existing Zikr, then its phrase and translation are updated.
**And** when I delete a Zikr, then it is removed from my list.

**Prerequisites:** Story 3.1

**Technical Notes:** Implement CRUD operations for Zikr phrases and translations, likely using local storage (IndexedDB).

### Story 3.3: Configurable Input Methods & Milestones

As a user,
I want to configure input methods for the counter and receive visual feedback on milestones,
So that my Tasbeeh practice is convenient and motivating.

**Acceptance Criteria:**

**Given** I am in Tasbeeh settings
**When** I configure input methods
**Then** I can assign volume up/down buttons (mobile) or specific keyboard keys (desktop) for incrementing/decrementing.

**And** when I am counting, then I reach milestones (e.g., 10, 33, 66, 99) or a user-defined session target, and visual feedback (e.g., confetti) is provided.

**Prerequisites:** Story 3.1

**Technical Notes:** Implement event listeners for volume buttons/keyboard keys. Implement visual feedback for milestones.

### Story 3.4: Session Target & History

As a user,
I want to set a target for my current session and view a history of my Zikrs,
So that I can track my progress over time.

**Acceptance Criteria:**

**Given** I am on the Tasbeeh Counter page
**When** I set a session target
**Then** the counter tracks my progress towards it.

**And** when I have completed Zikr sessions, then I view my history, and I can see previous Zikrs and their counts as cards.
**And** when I am viewing history, then I select a previous Zikr, and I can resume counting from its last state.

**Prerequisites:** Story 3.1

**Technical Notes:** Implement session target tracking and history storage (IndexedDB). Implement UI for displaying history and resuming Zikrs.

---

## Epic 4: User Experience & Accessibility

Ensure the application provides a minimalist, intuitive, and highly accessible user interface across all features.

### Story 4.1: Minimalist and Intuitive UI

As a user,
I want a minimalist and intuitive user interface,
So that I can easily navigate and use the application without prior training.

**Acceptance Criteria:**

**Given** I am using the application
**When** I interact with any feature
**Then** the UI is clean, uncluttered, and self-explanatory.

**And** when I first use the application, then I can understand its functionalities without needing a tutorial.

**Prerequisites:** All other UI-related stories

**Technical Notes:** Adhere to UX Design Specification principles (minimalist design, delightful interactions, intuitive).

### Story 4.2: WCAG Highest Standards Compliance

As a user with diverse abilities,
I want the application to adhere to the highest WCAG standards,
So that I can use it effectively regardless of my accessibility needs.

**Acceptance Criteria:**

**Given** I am using a screen reader
**When** I navigate the application
**Then** all interactive elements have appropriate ARIA labels and are correctly announced.

**And** when I am using keyboard navigation, then all elements are focusable and operable via keyboard.
**And** when I am viewing the application, then text or interactive elements meet WCAG color contrast standards.

**Prerequisites:** All UI-related stories

**Technical Notes:** Implement accessibility features (ARIA attributes, keyboard navigation, color contrast checks) as per WCAG guidelines.

### Story 4.3: High Performance and Seamless Experience

As a user,
I want a highly performant and seamless user experience, particularly for downloading and playback,
So that I can use the application efficiently and without frustration.

**Acceptance Criteria:**

**Given** I initiate a download
**When** the download is in progress
**Then** the application remains responsive and does not lag.

**And** when I am playing media, then I interact with playback controls, and responses are instantaneous and fluid.
**And** when navigating between sections, then transitions are smooth and fast.

**Prerequisites:** All core functional stories

**Technical Notes:** Optimize code for performance, minimize latency, and ensure efficient resource utilization, especially for video processing and playback.

---

## Epic 5: Landing Page & Growth Features

Provide an informative landing page and lay the groundwork for future growth capabilities.

### Story 5.1: Informative Landing Page

As a potential user,
I want to access a clean and informative landing page,
So that I can understand Wgetube's value proposition and key features.

**Acceptance Criteria:**

**Given** I navigate to the application's root URL
**When** the landing page loads
**Then** it displays a clear hero section, key features, and calls to action.

**And** when I browse its content, then I can find information about the downloader, Looper Tutor, and Tasbeeh Counter.

**Prerequisites:** None (can be developed independently)

**Technical Notes:** Implement a static landing page with clear sections for features and calls to action.

### Story 5.2: Smart Segment Downloading (Growth)

As a user,
I want to download specific video chapters or define custom start/end timestamps for downloads,
So that I can get only the relevant parts of a video.

**Acceptance Criteria:**

**Given** I am on the downloader page
**When** I fetch video details
**Then** I can see available chapters or input custom start/end times.

**And** when I define a segment, then I initiate download, and only that specific segment of the video is downloaded.

**Prerequisites:** Story 1.2

**Technical Notes:** Enhance `ytdlp-nodejs` integration to support segment downloading. UI for chapter selection or timestamp input.

### Story 5.3: Browser Extension for One-Click Download (Growth)

As a desktop user,
I want to initiate downloads via a browser extension,
So that I can save videos with one click directly from video platforms.

**Acceptance Criteria:**

**Given** I have the Wgetube browser extension installed
**When** I am on a supported video platform page
**Then** a one-click download button is available.

**And** when the button is clicked, then the download is initiated, and the video is downloaded to my Wgetube library.

**Prerequisites:** Story 1.2

**Technical Notes:** Develop a browser extension (e.g., for Chrome/Firefox) that interacts with the Wgetube PWA or API for downloading.

---

## Summary

The Wgetube project has been broken down into 5 epics, covering all functional requirements from the PRD. The epics are structured to deliver incremental user value, starting with foundational elements and progressing to core features, personalization, user experience, and future growth capabilities. Each epic contains bite-sized stories with detailed acceptance criteria, designed for single-developer session completion. All FRs are covered, and the breakdown is aligned with the project's goals of empowering productive personal growth during disconnected moments, particularly for Quran Hifz.

---

_For implementation: Use the `create-story` workflow to generate individual story implementation plans from this epic breakdown._

_This document will be updated after UX Design and Architecture workflows to incorporate interaction details and technical decisions._