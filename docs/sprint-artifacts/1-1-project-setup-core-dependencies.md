# Story 1.1: Project Setup & Core Dependencies

## Requirements Context Summary

## Structure Alignment Summary

This is the first story in Epic 1, so there are no previous story learnings or architectural deviations to consider from prior development. No `unified-project-structure.md` was found to align against. The project structure will be established as per the `create-next-app` command in the acceptance criteria.

## Story Body

As a developer,
I want to set up the basic project structure and integrate core dependencies,
So that I can begin building the application.

## Dev Notes & Citations

*   **Technical Notes:**
    *   Use `npx create-next-app@latest wgetube --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`.
    *   Install `ytdlp-nodejs`.
*   **Architectural Context:**
    *   The project will be initialized with Next.js, TypeScript, Tailwind CSS, ESLint, and Next.js as the build tooling.
    *   `ytdlp-nodejs` is a critical dependency for video downloading functionality.
    *   [Source: `architecture.md`]

## Change Log

*   **2025-11-19**: Story created by hammaadworks.

**Status:** ready-for-dev


## Acceptance Criteria

*   **Given** a new project
*   **When** `create-next-app` is run with `--typescript --tailwind --eslint --app --import-alias "@/*"`
*   **Then** the project structure is initialized.
*   **And** core dependencies like `ytdlp-nodejs` are installed and available for use.
*   **And** `npm run dev` starts the development server without errors.

## Tasks & Subtasks

*   **Task 1: Initialize Next.js Project**
    *   Run `npx create-next-app@latest wgetube --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
    *   Verify project structure is created as expected.
*   **Task 2: Install Core Dependencies**
    *   Install `ytdlp-nodejs` using `npm install ytdlp-nodejs` (or equivalent).
    *   Verify `ytdlp-nodejs` is listed in `package.json` and `node_modules`.
*   **Task 3: Verify Development Server Startup**
    *   Run `npm run dev`.
    *   Verify the development server starts without errors.
    *   Access the application in a browser to confirm basic functionality.
*   **Task 4: Testing**
    *   Create a basic unit test to confirm `ytdlp-nodejs` can be imported and a dummy function can be called (if applicable).
    *   Create an integration test to verify `npm run dev` command.



**User Story:**
As a developer,
I want to set up the basic project structure and integrate core dependencies,
So that I can begin building the application.

**Acceptance Criteria:**
*   **Given** a new project
*   **When** `create-next-app` is run with `--typescript --tailwind --eslint --app --import-alias "@/*"`
*   **Then** the project structure is initialized.
*   **And** core dependencies like `ytdlp-nodejs` are installed and available for use.
*   **And** `npm run dev` starts the development server without errors.

**Technical Notes & Architectural Context:**
The project will be initialized using `npx create-next-app@latest wgetube --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`. This establishes the base architecture with Next.js, TypeScript, Tailwind CSS, ESLint, and Next.js as the build tooling. The `ytdlp-nodejs` dependency is critical for video downloading functionality.

**Source:** `epics.md`, `architecture.md`

## Dev Agent Record

*   **Context Reference:** [1-1-project-setup-core-dependencies.context.xml](stories/1-1-project-setup-core-dependencies.context.xml)
