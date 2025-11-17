# Wgetube - Product Requirements Document

**Author:** hammaadworks
**Date:** 2025-11-17
**Version:** 1.0

---

## Executive Summary

Wgetube aims to empower productive personal growth during disconnected moments, specifically by assisting in Quran Hifz through reliable video downloading and a specialized looping learning technique.

### What Makes This Special

Wgetube's unique value lies in its easy download functionality from YouTube/social media combined with a specialized 'Looper Tutor' that utilizes looping learning techniques, which are highly effective for long-term memorization, particularly for Quran Hifz.

---

## Project Classification

**Technical Type:** web_app
**Domain:** edtech
**Complexity:** medium

Wgetube is classified as a web application, leveraging modern web technologies to provide a seamless user experience. Its core functionality as a video downloader and specialized player places it firmly within the EdTech domain, with a medium complexity level due to the integration of video processing and advanced player features.

### Domain Context

The primary domain context for Wgetube is EdTech, with a specific focus on facilitating Quran Hifz. This involves supporting repetitive learning techniques through video content, addressing the unique needs of learners in this area.

---

## Success Criteria

Wgetube will be successful when users can seamlessly share videos from YouTube or other social media platforms directly to the Wgetube PWA on their mobile devices, triggering automatic downloads. Success will also be measured by the robust functionality of the local file management system and the "Looper Tutor," which must effectively support rote learning through features like A-B section looping and playback speed adjustment, enabling users to enhance their Quran Hifz.



---

## Product Scope

### MVP - Minimum Viable Product

The Minimum Viable Product for Wgetube will focus on delivering a seamless and effective experience for Quran Hifz. This includes:
*   **Downloader:** Functionality to easily download videos from YouTube (Videos/Shorts) and Instagram Reels, with options for format selection.
*   **"Share" Menu Integration:** A frictionless mobile experience allowing users to share video links directly to the Wgetube PWA, triggering automatic downloads without manual copy-pasting.
*   **"Looper Tutor":** A feature-rich player designed for rote learning, including A-B section looping, bookmark saving, playback speed control, and support for background/screen-off play.
*   **Basic Local File Management:** Essential capabilities for organizing and accessing downloaded content.
*   **Exclusions:** Analytics and login features are explicitly out of scope for the MVP to maintain focus on core value delivery.

### Growth Features (Post-MVP)

Following the successful delivery of the MVP, Wgetube will expand its capabilities with:
*   **"Smart Segment Downloading":** The ability to download specific video chapters or define custom start/end timestamps for downloads.
*   **Browser Extension:** A browser extension to enable one-click downloading directly from desktop browsers.

### Vision (Future)

The long-term vision for Wgetube includes:
*   **In-app Search:** Functionality to search for videos directly within the application.
*   **Expanded Video Sources:** Integration with additional popular video platforms beyond the initial scope.
*   **Automatic Transcription:** Providing searchable text transcripts for downloaded videos to further enhance the learning experience.



---


## Innovation & Novel Patterns

Wgetube exhibits innovation primarily through its seamless "Share" Menu Integration, allowing users to directly send videos from external platforms to the PWA for automatic download, eliminating friction. Furthermore, the specialized "Looper Tutor," with its focus on effective rote learning techniques like A-B looping and playback speed adjustment tailored for Quran Hifz, represents a novel approach to combining video consumption with dedicated learning methodologies.

### Validation Approach

The validation approach for these innovations will be primarily through user adoption and direct feedback. For the "Share" Menu Integration, success will be validated by the ease and frequency of use, ensuring a truly frictionless experience. For the "Looper Tutor," effectiveness will be validated by observing user engagement with the rote learning features and gathering qualitative feedback on how these features contribute to their Quran Hifz progress. Given the current scope, formal analytics or A/B testing are not in scope, so direct user interaction and qualitative assessment will be key.

---


## web_app Specific Requirements

As a web application, Wgetube will be developed as a Single Page Application (SPA) to provide a fluid user experience. It must be cross-operating system and cross-browser compliant, ensuring broad accessibility and functionality across various devices and browsers. While real-time interactions are not a primary focus, the "Looper Tutor" will incorporate necessary real-time elements for playback control. A critical requirement is adherence to the highest WCAG (Web Content Accessibility Guidelines) standards, ensuring the application is usable by individuals with disabilities. Performance will be a key consideration to deliver a seamless and reliable experience, particularly for the downloading and playback functionalities. SEO is not a primary concern at this stage.

---


## User Experience Principles

The User Experience for Wgetube will be guided by a minimalist design philosophy, ensuring a clean and uncluttered interface. Every interaction must be crafted to be delightful, providing a highly satisfying and engaging experience for the user. Above all, the application must be exceptionally intuitive, requiring no prior training as its functionalities are clear and obvious. A critical underlying principle is to achieve this delightful and intuitive UX through highly optimized code and resource utilization, ensuring the application consistently operates within free-tier hosting limits.

### Key Interactions

The most critical user interactions in Wgetube, designed to be seamless and intuitive, include:
1.  **"Share to Wgetube" Flow:** The process of sharing a video link from an external platform (like YouTube) directly to the Wgetube PWA on a mobile device, leading to automatic download initiation.
2.  **Video Download and Format Selection:** The user's journey from pasting a link (or sharing) to selecting desired video/audio formats and initiating the download.
3.  **Looper Tutor Controls:** Intuitive controls within the player for A-B section looping, adjusting playback speed, and managing bookmarks, all designed to enhance the rote learning experience for Quran Hifz.
4.  **Local File Management:** Effortless organization, access, and playback of downloaded content within the application.

---

## Functional Requirements

**I. Core Video Downloading**

*   FR1: Users can initiate video downloads by pasting a URL from YouTube (Videos/Shorts) or Instagram Reels.
*   FR2: Users can select desired video and audio formats/qualities for download.
*   FR3: The system can automatically download videos when shared directly to the Wgetube PWA from mobile devices.
*   FR4: The system can process and store downloaded video and audio content locally, along with associated metadata for history and library management.
*   FR4.1: Users can export downloaded video and audio content to their device's file system (via browser "Save As" dialog).

**II. Looper Tutor**

*   FR5: Users can play downloaded video and audio content, including fullscreen and black screen modes.
*   FR6: Users can adjust the playback speed of content via a slider with granular control and hints (e.g., 0.5x, 1.0x, 1.25x), allowing for intermediate values.
*   FR7: Users can define and loop specific A-B sections of content for repetitive learning, with seamless and precise setting mechanisms providing immediate visual/auditory feedback.
*   FR8: Users can save bookmarks within content for quick access to specific points.
*   FR8.1: Users can save defined A-B loop sections with a custom name for quick access and reuse, and edit their name and A-B timestamps later.
*   FR8.2: The Looper Tutor tracks and displays the number of times a loop has been played, both for the current session and aggregated historically.
*   FR9: The player supports background playback of audio.
*   FR10: The player supports screen-off playback of audio.
*   FR10.1: Users can import local video and audio files from their device into Wgetube's library for use with the Looper Tutor, with associated metadata stored.

**III. Content Management & Access**

*   FR11: Users can access and browse their library of downloaded content.
*   FR12: Users can perform basic organization of downloaded files (e.g., view by date, title).
*   FR12.1: Users can configure system default settings (e.g., theme, default playback speed, etc.).

**IV. User Experience & Accessibility**

*   FR13: The application provides a minimalist and intuitive user interface.
*   FR14: The application is a Single Page Application (SPA).
*   FR15: The application is cross-operating system and cross-browser compliant.
*   FR16: The application adheres to WCAG highest standards for accessibility.
*   FR17: The application delivers a highly performant and seamless user experience, particularly for downloading and playback.

**V. Future Capabilities (Post-MVP)**

*   FR18: Users can download specific video chapters or define custom start/end timestamps for downloads. (Growth Feature)
*   FR19: Users can initiate downloads via a browser extension for one-click functionality. (Growth Feature)

**VI. Tasbeeh Counter**

*   FR20: Users can access a dedicated Tasbeeh Counter feature.
*   FR20.1: Users can add, edit, and delete custom Zikr phrases and their translations.
*   FR21: The Tasbeeh Counter prominently displays the current count, along with a configurable Zikr (phrase) and its translation.
*   FR22: Users can increment and decrement the count via on-screen buttons (increment button always present, decrement button configurable), accompanied by haptic feedback.
*   FR23: Users can configure input methods for incrementing/decrementing the count, including assigning volume up/down buttons on mobile devices and specific keyboard keys (e.g., spacebar) for desktop/keyboard users.
*   FR24: Users can reset the current count.
*   FR24.1: The Tasbeeh Counter provides visual feedback (e.g., confetti-like designs) upon reaching specific milestones (e.g., 10, 33, 66, 99) and the user-defined session target.
*   FR25: The Tasbeeh Counter stores a history of Zikrs and their counts, and allows users to set a target for the current session.
*   FR26: Users can view previous Zikrs as cards and select one to resume counting.

**VII. Landing Page**

*   FR27: The application provides a clean and informative landing page that introduces Wgetube, discusses its key features, and provides information for user training and engagement.

---

## Non-Functional Requirements

### Performance

The application must deliver a highly performant and seamless user experience, particularly for video downloading and playback, while strictly adhering to the resource limitations of free-tier hosting (e.g., Vercel's Hobby Plan). This implies efficient resource utilization, optimized code, and minimal latency for core operations.



### Scalability

While initial usage is projected at approximately 1K requests per day, the architecture should be designed with future growth in mind, allowing for cost-effective scaling without requiring significant re-architecture, especially considering the free-tier hosting constraint.

### Accessibility

Wgetube must conform to the highest standards of Web Content Accessibility Guidelines (WCAG), ensuring the application is fully usable and accessible to individuals with diverse abilities across all supported platforms and browsers.

### Integration

The application requires robust integration for its sharing functionalities. This includes seamless "Share to Wgetube" integration for mobile PWAs and a browser-based mechanism where modifying a video platform's URL (e.g., `youtube.com` to `our_domain`) will trigger the fetching of video details for download.



---

_This PRD captures the essence of Wgetube - Wgetube's core value lies in empowering productive personal growth during disconnected moments, particularly for Quran Hifz learners. It achieves this by providing frictionless access to video content through easy downloading and transforming video consumption into an effective learning tool via its specialized player. The seamless integration and focus on rote learning techniques differentiate it as a powerful aid for memorization._

_Created through collaborative discovery between {{user_name}} and AI facilitator._
