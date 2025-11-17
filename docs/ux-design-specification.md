# wgetube UX Design Specification

_Created on 2025-11-17 by hammaadworks_
_Generated using BMad Method - Create UX Design Workflow v1.0_

---

## Executive Summary

Wgetube aims to empower productive personal growth during disconnected moments, specifically by assisting in Quran Hifz through reliable video downloading and a specialized looping learning technique. The user wants to feel efficient, empowered, and focused.

---

## 1. Design System Foundation

### 1.1 Design System Choice

**Chosen Design System:** Radix UI (with shadcn/ui, Magic UI, and Aceternity UI components)

**Rationale:** The user prefers a highly customizable, modern aesthetic, and visually rich components. This approach leverages the accessible, unstyled primitives of Radix UI, combined with the styled components of shadcn/ui, and additional visually appealing components from Magic UI and Aceternity UI. This provides maximum flexibility and control over styling while ensuring accessibility and a great developer experience within the React ecosystem. For styling, `globals.css` will be utilized, allowing for easy theme updates via tools like `https://tweakcn.com/`.

---

## 2. Core User Experience

### 2.1 Defining Experience

download internet videos and memorise them with repetition

### 2.2 Novel UX Patterns

Looper Tutor
**User Goal:** Memorize a 30-second segment of a Quran recitation.
**Trigger:** A dedicated icon allows users to pick A and B sections precisely (down to seconds precision) and configure them with ease.
**Interaction Flow:**
1. User taps a dedicated "Loop" icon on the player interface.
2. A visual interface (e.g., timeline slider with draggable handles) appears, allowing precise selection of A and B points.
3. User adjusts A and B points using touch/drag gestures or numerical input.
4. User confirms the loop (e.g., by tapping "Set Loop" or simply by the interface closing).
**Visual Feedback:** Visual feedback (e.g., highlighting the A-B section on the timeline), haptic feedback (e.g., subtle vibration on touch interactions), and micro animations.
**States:**
- Default: Player is in normal playback mode.
- Loading: Spinner or skeleton screen when a new video is loading.
- Success: Clear active indicator for loops, "Loop Saved" toast for saving segments.
- Error: Toast for minor errors (e.g., invalid loop selection), modal for major errors (e.g., video failed to load).
**Platform Considerations:** Consistent across all platforms (mobile-first, cross-platform optimized).
**Accessibility:** Adherence to the highest WCAG standards will ensure keyboard navigation, screen reader support, and appropriate color contrast.
**Inspiration:** Advanced media players (for precise controls), language learning applications (for repetition and segment focus), and music production software (for seamless looping mechanics). The sheer effectiveness and ease of the memorization process, coupled with the ability to quickly set and save a perfect, named loop, would be highly shareable.

---

### 2.3 Core Experience Principles

**Speed:** Instantaneous and fluid. Key actions must respond without perceptible lag to maintain user flow and focus during memorization.
**Guidance:** Minimal and contextual. The interface should be self-explanatory, with guidance provided only when necessary and directly within the context of the action.
**Flexibility:** Balanced control and simplicity. Provide powerful, precise controls for learning features while maintaining an uncluttered, minimalist interface for overall ease of use.
**Feedback:** Subtle, immediate, and informative. Use micro animations, haptic feedback, and clear visual cues to confirm actions and provide status updates without distracting from the core learning task.

---

## 3. Visual Foundation

### 3.1 Color System

**Chosen Color Theme:** Theme 3: Warm & Engaging

**Color Palette:**
-   Primary: `#D35400` (Pumpkin Orange) - Main actions, key elements
-   Secondary: `#27AE60` (Jade Green) - Supporting actions, highlights
-   Accent: `#F7DC6F` (Saffron Yellow) - Subtle emphasis
-   Success: `#27AE60`
-   Warning: `#F1C40F`
-   Error: `#C0392B`
-   Neutral: `#FDF6E3` (Cream Background), `#E0D8C6` (Light Brown-Gray), `#655D50` (Dark Brown-Gray)

**Typography System:**
-   **Font Families:**
    -   Headings: `Inter`, `sans-serif`
    -   Body Text: `Inter`, `sans-serif`
    -   Monospace: `Fira Code`, `monospace`
-   **Type Scale:** A modular scale will be used for headings (h1-h6) and body text, ensuring visual hierarchy.
-   **Font Weights:** Regular, Medium, Semibold for emphasis and readability.
-   **Line Heights:** Optimized for readability, especially for body text (e.g., 1.5).

**Spacing and Layout Foundation:**
-   **Base Unit:** 8px grid system for consistent spacing and sizing.
-   **Spacing Scale:** Multiples of 8px (e.g., 8px, 16px, 24px, 32px, 48px, 64px).
-   **Layout Grid:** A 12-column grid system for flexible and responsive content arrangement.
-   **Container Widths:** Max-width containers for optimal readability on larger screens, adapting responsively to smaller viewports.

**Interactive Visualizations:**

- Color Theme Explorer: [ux-color-themes.html](./ux-color-themes.html)

---

## 4. Design Direction

### 4.1 Chosen Design Approach

**Chosen Design Directions:**

-   **Download/Entry Point:** Direction 1.2 - Recent Activity & Action
    *   **Rationale:** Provides a balanced approach with immediate download functionality and quick access to recent activity, enhancing user convenience and engagement.
-   Looper Tutor Direction 2.1 - Player-Centric Controls
    *   **Rationale:** Prioritizes the immersive learning experience by keeping essential controls close to the video player, facilitating precise A-B looping and speed adjustments for memorization.
-   **Content Library:** Direction 3.2 - List View with Details
    *   **Rationale:** Offers a clear and detailed overview of downloaded content, suitable for managing a growing library, with efficient search and playback options.

**Interactive Mockups:**

- Design Direction Showcase: [ux-design-directions.html](./ux-design-directions.html)

---

## 5. User Journey Flows

### 5.1 Critical User Paths

**User Journey: "Share to Wgetube" Flow / Downloader**

**User Goal:** Download a video from YouTube/Instagram for later memorization.

**Entry Points:**
*   **Mobile Share:** User shares a video link from YouTube/Instagram app to Wgetube PWA.
*   **URL Domain Change:** User modifies a video platform's URL (e.g., `youtube.com` to `our_domain`) in their browser, triggering Wgetube.
*   **Direct Paste:** User opens Wgetube PWA and pastes a video URL into the input field.

**Flow Steps:**
1.  **Entry & Validation:**
    *   **User sees:** Wgetube PWA opens, showing a loading indicator or "Processing Link..." message.
    *   **User does:** (Mobile Share/URL Change) Nothing; (Direct Paste) Pastes URL and taps "Fetch Details".
    *   **System responds:** Performs URL validation (sanity checks). If valid, displays video details (thumbnail, title, duration) and available download formats/qualities. If invalid, shows an error (toast for minor, modal for major).
2.  **Format Selection:**
    *   **User sees:** A clear list or dropdown of available video/audio formats and qualities.
    *   **User does:** Selects the desired format/quality.
    *   **System responds:** Highlights the selected option.
3.  **Download Initiation:**
    *   **User sees:** A "Download" button. A progress indicator appears upon tapping.
    *   **User does:** Taps "Download".
    *   **System responds:** Initiates download, provides visual feedback of progress.
4.  **Success:**
    *   **User sees:** "Download Complete!" notification. The downloaded video appears in the "Library" section.
    *   **User does:** Can tap to "View in Library" or "Play Now".
    *   **System responds:** Confirms successful download, makes content accessible.
5.  **Export (Optional):**
    *   **User sees:** An "Export" option for downloaded files in the library or after download completion.
    *   **User does:** Selects "Export".
    *   **System responds:** Triggers browser's "Save As" dialog, allowing user to choose a location on their device.
6.  **Errors:**
    *   **Minor Error (e.g., invalid URL, temporary network issue):** Toast message.
    *   **Major Error (e.g., video unavailable, platform restriction):** Modal dialog with explanation and options.

---

**User Journey: Looper Tutor Usage**

**User Goal:** Memorize content (video or audio) using A-B looping, speed control, saved sections, and focused playback modes.

**Current Entry Point:** User selects a downloaded/imported video/audio file from the "Library" and taps "Play".

**Flow Steps:**
1.  **Entry:**
    *   **User sees:** The Looper Tutor screen (Direction 2.1) opens. The selected video/audio content begins playing. Essential playback controls (play/pause, scrub bar, volume) are visible. Icons for fullscreen, black screen, and lock mode are also present, typically near the player controls.
    *   **User does:** Watches/listens to the content.
    *   **System responds:** Plays the media.
2.  **Input (Activate Fullscreen/Black Screen/Lock Mode):**
    *   **User sees:** Dedicated icons for "Fullscreen" (e.g., ⛶), "Black Screen" (e.g., 🌑), and "Lock Mode" (e.g., 🔒) on the player interface.
    *   **User does:** Taps the desired icon.
        *   **Fullscreen:** Media expands to fill the entire screen. Controls may auto-hide.
        *   **Black Screen:** Screen turns black, media continues playing audio. A subtle visual cue (e.g., four small dots in corners) appears. To exit, user connects the four dots to form a square.
        *   **Lock Mode:** All on-screen controls become unresponsive to touch, preventing accidental interactions. A visual indicator (e.g., a lock icon) shows the mode is active. To exit, user performs a specific gesture (e.g., long-press, multi-touch, or a pattern).
    *   **System responds:** Activates the selected mode, adjusts display, and modifies control responsiveness as per the mode's function.
3.  **Input (Setting A-B Loop):**
    *   **User sees:** A dedicated "Loop" icon (or similar) on the player interface.
    *   **User does:** Taps the "Loop" icon. A visual interface (e.g., timeline with draggable A and B markers) appears, allowing precise selection.
    *   **System responds:** Displays the A-B selection interface.
4.  **Input (Adjusting A-B Points):**
    *   **User sees:** Draggable A and B markers on the timeline, possibly with numerical input fields for fine-tuning (seconds precision). Immediate visual/auditory feedback (e.g., video jumps to point, tooltip with timestamp).
    *   **User does:** Drags markers or inputs precise times for A and B points.
    *   **System responds:** Updates the visual selection on the timeline. Provides haptic feedback and micro animations during dragging.
5.  **Feedback (Loop Activation & Count):**
    *   **User sees:** A "Loop Active" indicator appears. The player automatically loops the selected A-B segment. A loop counter (current session and aggregated total) is displayed.
    *   **User does:** Continues watching/listening to the looped segment.
    *   **System responds:** Plays the A-B segment repeatedly and increments the loop counter.
6.  **Input (Adjusting Playback Speed):):**
    *   **User sees:** A "Speed" slider with hints (e.g., 0.5x, 1.0x, 1.25x) and the ability to set intermediate values (e.g., 1.3x).
    *   **User does:** Adjusts the slider to select a desired playback speed.
    *   **System responds:** Adjusts the media playback speed immediately, without altering pitch.
7.  **Input (Saving Loop Section):**
    *   **User sees:** A "Save Loop" button. Tapping it opens a small input field or modal.
    *   **User does:** Taps "Save Loop", enters a name (e.g., "Ayah 30"), and confirms.
    *   **System responds:** Saves the current A-B loop with the given name. The saved loop appears in a "Saved Loops" list.
8.  **Input (Editing Saved Loop):**
    *   **User sees:** An "Edit" option next to a saved loop in the "Saved Loops" list.
    *   **User does:** Taps "Edit", modifies the name or A-B timestamps, and confirms.
    *   **System responds:** Updates the saved loop details.
9.  **Input (Accessing Saved Loops):**
    *   **User sees:** A "Saved Loops" list (e.g., an expandable panel or a dedicated section). Each item shows the loop name and time range.
    *   **User does:** Taps on a saved loop item.
    *   **System responds:** The player immediately jumps to and activates the selected saved loop.
10. **Success:**
    *   **User sees:** Content is being memorized effectively through repetition. Saved loops are easily accessible.
    *   **User does:** Achieves memorization goals.
    *   **System responds:** Provides a seamless and focused learning environment.
11. **Errors:**
    *   **Minor Error (e.g., invalid A-B points, save failed):** Toast message: "Invalid loop selection" or "Failed to save loop."
    *   **Major Error (e.g., media file corrupted):** Modal dialog: "Media playback error" with options (e.g., "Try re-downloading," "Report issue").

---

**User Journey: Content Management & Settings**

**User Goal:** Manage downloaded/imported content and personalize application settings.

**Current Entry Point:** User navigates to "Library" or "Settings" via the bottom navigation.

**Flow Steps:**
1.  **Entry (Library):**
    *   **User sees:** The "Library" screen (Direction 3.2) with a list of downloaded/imported video and audio files. Search bar and filter/sort options are visible. A prominent "Import Media" button is also visible.
    *   **User does:** Browses, searches, or filters content.
    *   **System responds:** Displays content, allows interaction.
2.  **Input (Import File):**
    *   **User sees:** An "Import File" button or option prominently displayed in the Library or Settings.
    *   **User does:** Taps "Import File", which triggers the device's native file picker. User then selects a local video/audio file.
    *   **System responds:** Imports the file into Wgetube's library, stores associated metadata, and makes it available for the Looper Tutor. A progress indicator may be shown for larger files.
3.  **Input (Export File):**
    *   **User sees:** An "Export" option for a specific file in the Library.
    *   **User does:** Taps "Export".
    *   **System responds:** Triggers browser's "Save As" dialog.
4.  **Entry (Settings):**
    *   **User sees:** The "Settings" screen with various configurable options (e.g., Theme, Default Playback Speed, Notifications).
    *   **User does:** Navigates through settings categories.
    *   **System responds:** Displays setting options.
5.  **Input (Change Theme):**
    *   **User sees:** A "Theme" setting with options (e.g., Light, Dark, System Default).
    *   **User does:** Selects a theme.
    *   **System responds:** Applies the selected theme immediately.
6.  **Input (Change Default Playback Speed):**
    *   **User sees:** A "Default Playback Speed" setting with a slider or dropdown.
    *   **User does:** Adjusts the default speed.
    *   **System responds:** Saves the new default speed for future playback.
7.  **Success:**
    *   **User sees:** Content is organized and accessible. Application behaves according to personalized preferences.
    *   **User does:** Efficiently manages content and customizes experience.
    *   **System responds:** Provides a personalized and efficient user environment.
8.  **Errors:**
    *   **Minor Error (e.g., import failed):** Toast message.
    *   **Major Error (e.g., storage full):** Modal dialog.

---

**User Journey: Landing Page**

**User Goal:** Understand Wgetube's value proposition, features, and how to get started.

**Current Entry Point:** User accesses Wgetube's public URL.

**Flow Steps:**
1.  **Entry:**
    *   **User sees:** A clean, visually appealing landing page with a clear hero section (value proposition, call to action).
    *   **User does:** Browses the page.
    *   **System responds:** Displays key features, benefits, and calls to action.
2.  **Information Consumption:**
    *   **User sees:** Sections detailing Downloader, Looper Tutor, Tasbeeh Counter, and Library features. Information on user training and engagement.
    *   **User does:** Reads feature descriptions, explores benefits.
    *   **System responds:** Provides clear and concise information.
3.  **Call to Action:**
    *   **User sees:** Prominent "Get Started" or "Explore App" buttons.
    *   **User does:** Clicks a call to action.
    *   **System responds:** Directs the user into the Wgetube application.
4.  **Success:**
    *   **User sees:** A clear understanding of Wgetube's capabilities and how it can benefit them.
    *   **User does:** Decides to use the application.
    *   **System responds:** Effectively communicates value and guides user to engagement.
5.  **Errors:**
    *   **Minor Error (e.g., broken link):** Standard web error handling.
    *   **Major Error (e.g., page not loading):** Standard web error handling.

---

**User Journey: Tasbeeh Counter**

**User Goal:** Track and manage Zikr counts for spiritual practice, with clear visual feedback, customizable targets, and personalized input methods. Users can also manage their list of Zikrs.

**Current Entry Point:** User navigates to "Tasbeeh" via the bottom navigation (new tab).

**Flow Steps:**
1.  **Entry:**
    *   **User sees:** The Tasbeeh Counter page with a prominently displayed current count. Below it, the configurable Zikr (phrase) and its translation. Buttons for increment (+) and reset are visible. A decrement button may be present based on configuration. An option to set a session target is also available. A button/icon to manage Zikrs (add/edit/delete) is also visible.
    *   **User does:** Initiates counting, sets a session target, configures input methods, manages Zikrs, or selects a previous Zikr.
    *   **System responds:** Displays the selected Zikr and its count, ready for interaction.
2.  **Input (Manage Zikrs - Add/Edit/Delete):**
    *   **User sees:** A "Manage Zikrs" button/icon. Tapping it opens a screen or modal to view, add, edit, or delete Zikr phrases and their translations.
    *   **User does:** Adds a new Zikr (enters phrase and translation), edits an existing Zikr, or deletes a Zikr.
    *   **System responds:** Updates the list of available Zikrs.
3.  **Input (Configure Input Methods):**
    *   **User sees:** A settings option (e.g., gear icon) on the Tasbeeh Counter page. Tapping it reveals options to configure input methods.
    *   **User does:** Taps settings, selects desired volume button behavior (e.g., Volume Up for increment, Volume Down for increment/decrement, or disabled), and/or assigns a keyboard key (e.g., spacebar) for increment/decrement. User can also toggle the visibility of the on-screen decrement button.
    *   **System responds:** Saves the user's input preferences.
4.  **Input (Increment/Decrement Count):**
    *   **User sees:** Current count updates prominently. Visual feedback (e.g., confetti-like designs) appears upon reaching milestones (10, 33, 66, 99) and the session target.
    *   **User does:** Taps "+" or "-" buttons on-screen (if visible), uses configured volume buttons on mobile, or uses configured keyboard keys.
    *   **System responds:** Increments/decrements the count, provides haptic feedback, and triggers visual celebrations at milestones/target.
5.  **Input (Reset Count):**
    *   **User sees:** Count resets to zero.
    *   **User does:** Taps "Reset" button.
    *   **System responds:** Resets the current count.
6.  **Input (Set Session Target):**
    *   **User sees:** An input field or selector for setting a numerical target for the current session.
    *   **User does:** Enters or selects a target value.
    *   **System responds:** Displays the active target and tracks progress towards it.
7.  **Input (Select Previous Zikr):**
    *   **User sees:** A section displaying previous Zikrs as cards (Zikr name, last recorded count, date). Each card has a "Resume" button.
    *   **User does:** Taps on a "Resume" button for a previous Zikr.
    *   **System responds:** Navigates to the count page for the selected Zikr, loading its last recorded count (if not reset) and associated target (if any).
8.  **Success:**
    *   **User sees:** Zikr counts are accurately tracked and managed, with motivating visual and haptic feedback, using their preferred input method. Users can easily manage and switch between different Zikrs.
    *   **User does:** Successfully completes Zikr sessions and achieves targets.
    *   **System responds:** Provides a focused and convenient tool for spiritual practice, enhancing engagement and personalization.
9.  **Errors:**
    *   **Minor Error (e.g., failed to save history):** Toast message.
    *   **Major Error (e.g., data corruption):** Modal dialog.


---

## 6. Component Library

### 6.1 Component Strategy

{{component_library_strategy}}

---

## 7. UX Pattern Decisions

### 7.1 Consistency Rules

{{ux_pattern_decisions}}

---

## 8. Responsive Design & Accessibility

### 8.1 Responsive Strategy

{{responsive_accessibility_strategy}}

### 8.2 Theme Switching (Light/Dark Mode)

**Requirement:** The application must include a theme switcher to allow users to toggle between light and dark modes. This enhances user preference and accessibility, especially in varying lighting conditions.

**Implementation Note:** The chosen design system (Radix UI with shadcn/ui) supports flexible theming, which will facilitate the implementation of this feature.

---

## 9. Implementation Guidance

### 9.1 Completion Summary

{{completion_summary}}

---

## Appendix

### Related Documents

- Product Requirements: `{{prd_file}}`
- Product Brief: `{{brief_file}}`
- Brainstorming: `{{brainstorm_file}}`

### Core Interactive Deliverables

This UX Design Specification was created through visual collaboration:

- **Color Theme Visualizer**: {{color_themes_html}}
  - Interactive HTML showing all color theme options explored
  - Live UI component examples in each theme
  - Side-by-side comparison and semantic color usage

- **Design Direction Mockups**: {{design_directions_html}}
  - Interactive HTML with 6-8 complete design approaches
  - Full-screen mockups of key screens
  - Design philosophy and rationale for each direction

### Optional Enhancement Deliverables

_This section will be populated if additional UX artifacts are generated through follow-up workflows._

<!-- Additional deliverables added here by other workflows -->

### Next Steps & Follow-Up Workflows

This UX Design Specification can serve as input to:

- **Wireframe Generation Workflow** - Create detailed wireframes from user flows
- **Figma Design Workflow** - Generate Figma files via MCP integration
- **Interactive Prototype Workflow** - Build clickable HTML prototypes
- **Component Showcase Workflow** - Create interactive component library
- **AI Frontend Prompt Workflow** - Generate prompts for v0, Lovable, Bolt, etc.
- **Solution Architecture Workflow** - Define technical architecture with UX context

### Version History

| Date     | Version | Changes                         | Author        |
| -------- | ------- | ------------------------------- | ------------- |
| 2025-11-17 | 1.0     | Initial UX Design Specification | hammaadworks |

---

_This UX Design Specification was created through collaborative design facilitation, not template generation. All decisions were made with user input and are documented with rationale._
