# Part 1: Introduction & System Overview

## 1.1. Purpose of This Guide

Welcome to the "Understand.me" Developer Guide! This comprehensive document is intended for software engineers, architects, and technical project managers involved in the design, development, and maintenance of the "Understand.me" mobile application.

This guide covers:
*   **System Architecture:** An overview of the components and how they interact.
*   **Technology Stack:** Detailed information on the tools and platforms used.
*   **Development Best Practices:** Guidelines for coding, testing, and deployment.
*   **API Integrations:** How we connect with various third-party services.
*   **Data Models and Flows:** Understanding how information is structured and processed.
*   **Key Feature Implementation Details:** Insights into the development of core functionalities.

Its primary goal is to provide a unified understanding of the system, enabling efficient and consistent development efforts, facilitating onboarding for new team members, and serving as a reference for ongoing technical decisions.

## 1.2. Application Overview

"Understand.me" is an AI-mediated mobile application designed to enhance communication, facilitate understanding, and guide users through structured conversational processes, particularly in situations involving potential conflict or requiring deep mutual understanding. It aims to create clearer, more empathetic, and productive interactions.

For a complete understanding of the application's strategic background, user flows, and UI design, please refer to the following companion documents:

*   **Research & Strategy Report:** (Located at `[Link to Research & Strategy Report - TBD]`) - This document outlines the market research, user needs, competitive analysis, and overall strategic vision that underpins "Understand.me."
*   **Understand.me Mermaid Flow Diagram:** (Located at `../understand_me_mermaid_flow updated.mermaid`) - This diagram visually represents the complete user journey and interaction flows within the application, from onboarding to post-session activities.
*   **UI Development Guide:** (Located at `../development_guide/README.md`) - This multi-part guide details the UI/UX principles, screen-by-screen breakdowns, shared UI components, and the persona of "Alex," our AI voice agent, specifically for the Expo (React Native) mobile application.

## 1.3. Serverless Architecture Philosophy

"Understand.me" embraces a **serverless-first architecture philosophy** where feasible, aiming to minimize backend infrastructure management, maximize scalability, and optimize operational costs. Our core principles include:

*   **Leverage Managed Services:** Prioritize the use of fully managed services (like Supabase for BaaS, Google GenAI SDK for AI, ElevenLabs for voice synthesis, Sentry for monitoring) to reduce operational overhead.
*   **Event-Driven & Function-Based Logic:** Implement backend logic primarily through serverless functions (e.g., Supabase Edge Functions, potential Nodely workflows) that respond to events or API calls.
*   **Scalability & Resilience:** Design components to scale independently based on demand and ensure resilience through distributed services.
*   **Focus on Core Application Logic:** By offloading infrastructure concerns, the development team can focus more on building the unique features and user experience of "Understand.me."
*   **Modularity:** Services like PicaOS, Dappier, and Nodely are integrated as specialized, potentially serverless or independently scalable, components to handle specific tasks like AI orchestration, real-time data, or decentralized storage.

While some components (e.g., PicaOS if self-hosted, or specific Nodely configurations) might involve managed server instances, the goal is to abstract away as much direct server management as possible from the core application development.

## 1.4. Technology Stack Deep Dive

The "Understand.me" application utilizes a carefully selected stack of modern technologies to deliver its rich feature set:

*   **Frontend - Mobile App:**
    *   **Expo (React Native, TypeScript):** The primary framework for building the cross-platform (iOS and Android) mobile application. Expo provides a robust set of tools, libraries (like `expo-av`, `expo-document-picker`, `expo-notifications`), and services (like EAS Build) that streamline mobile development. TypeScript ensures type safety and improved code quality.
*   **Backend as a Service (BaaS):**
    *   **Supabase:** Provides the core backend infrastructure, including:
        *   **PostgreSQL Database:** For storing user data, session information, transcripts, user growth metrics, etc.
        *   **Authentication:** Manages user sign-up, login, and session security.
        *   **Storage:** Securely stores multimedia files uploaded by users (e.g., documents, images, audio snippets for context).
        *   **Realtime:** Used for features requiring real-time updates, such as live transcription display, session status changes, and potentially chat functionalities.
        *   **Edge Functions:** Serverless functions for custom backend logic, API integrations, and data processing tasks that don't fit neatly into the other services (e.g., handling callbacks from ElevenLabs or Google GenAI).
*   **AI Orchestration & Core Logic:**
    *   **PicaOS (Conceptual):** Envisioned as an intelligent orchestration layer. PicaOS is responsible for managing the flow of AI-driven tasks. This includes:
        *   Receiving requests from the Expo app (e.g., "analyze this conflict description," "guide this session phase").
        *   Coordinating calls to various AI services (Google GenAI SDK, ElevenLabs).
        *   Processing and transforming data between services.
        *   Maintaining session state and context for the AI.
        *   Potentially performing some on-device AI pre-processing or logic if it involves native capabilities bridged via Expo.
        *   The interaction between the Expo app and complex AI logic is primarily routed through PicaOS.
*   **Generative AI - Language Understanding & Insights:**
    *   **Google GenAI SDK (e.g., Gemini):** The core Large Language Model (LLM) used for understanding user inputs (text and transcribed voice), generating summaries, identifying themes, analyzing sentiment, providing insights for personal growth, and powering much of Alex's conversational intelligence. PicaOS will manage interactions with this SDK.
*   **Voice Synthesis:**
    *   **ElevenLabs API:** Used to generate the natural-sounding voice for "Alex," our AI voice agent. Requests to this API are likely proxied or orchestrated by PicaOS or a Supabase Edge Function.
*   **Real-time Data & Retrieval Augmented Generation (RAG):**
    *   **Dappier (Conceptual):** Could be leveraged for:
        *   Real-time, high-throughput data feeds or event streams relevant to active sessions (e.g., live status updates from external sources if needed).
        *   Facilitating Retrieval Augmented Generation (RAG) by providing efficient access to knowledge bases or specific datasets that Google GenAI can use to provide more contextually relevant responses during sessions. This might involve connecting to vector databases or specialized data stores.
*   **Decentralized Storage & Workflows:**
    *   **Nodely (Conceptual):** Could be integrated for:
        *   Storing and retrieving certain types of data on IPFS (InterPlanetary File System) if decentralized, content-addressable storage is beneficial (e.g., for finalized session summaries, user-uploaded evidence where immutability is key).
        *   Orchestrating complex, multi-step backend workflows that involve interactions between Supabase, AI services, and potentially Dappier or PicaOS.
*   **Application Monitoring:**
    *   **Sentry:** Used for real-time error tracking, performance monitoring, and issue diagnostics for both the Expo application and any backend services (like Supabase Edge Functions or Nodely workflows).

## 1.5. High-Level System Architecture Diagram

The following Mermaid diagram definition illustrates the high-level interactions between the key components of the "Understand.me" system.

```mermaid
graph TD
    User[Mobile App User] -->|Interacts via UI| ExpoApp[Expo (React Native) App];

    subgraph "Cloud Services & Backend"
        ExpoApp -->|API Calls/Realtime via PicaOS| PicaOS[PicaOS: AI Orchestration & Logic];
        PicaOS -->|Data Storage/Retrieval, Auth, Functions| Supabase[Supabase: PostgreSQL, Auth, Storage, Realtime, Edge Functions];
        PicaOS -->|LLM Tasks, Analysis| GoogleGenAI[Google GenAI SDK];
        PicaOS -->|Voice Synthesis| ElevenLabsAPI[ElevenLabs API];
        PicaOS -->|Real-time Data, RAG| Dappier[Dappier: Real-time Data/RAG];
        PicaOS -->|Decentralized Storage, Workflows| Nodely[Nodely: IPFS/Workflows];

        Supabase -->|Data for PicaOS| PicaOS;
        GoogleGenAI -->|Results to PicaOS| PicaOS;
        ElevenLabsAPI -->|Audio to PicaOS/App| PicaOS;
        Dappier -->|Data to PicaOS| PicaOS;
        Nodely -->|Data/Links to PicaOS| PicaOS;

        %% Optional direct interactions if PicaOS is purely orchestration
        %% ExpoApp -->|Direct API Calls, e.g. for simple data| Supabase;
    end

    subgraph "Monitoring"
        ExpoApp -->|Error/Perf Data| Sentry[Sentry: Monitoring];
        PicaOS -->|Error/Perf Data| Sentry;
        Supabase -->|Logs/Events (indirectly)| Sentry; %% Via function logging
        Nodely -->|Error/Perf Data| Sentry;
    end

    %% Data Flow Example: User Speaks in Session
    UserSpeak["User Speaks (Voice Input)"] --> ExpoApp;
    ExpoApp -->|Audio Chunk to PicaOS| PicaOS;
    PicaOS -->|Transcription Request| GoogleGenAI; %% Or other STT
    GoogleGenAI -->|Transcript Text to PicaOS| PicaOS;
    PicaOS -->|Store Transcript| Supabase;
    PicaOS -->|Send to App for UI Update| ExpoApp;
    ExpoApp -->|Displays Transcript| User;

    %% Control Flow Example: Alex Responds
    PicaOS -->|Determine Alex Response Content (using GenAI)| GoogleGenAI;
    GoogleGenAI -->|Response Text to PicaOS| PicaOS;
    PicaOS -->|Text-to-Speech Request| ElevenLabsAPI;
    ElevenLabsAPI -->|Audio Data to PicaOS| PicaOS;
    PicaOS -->|Send Audio & Text to App| ExpoApp;
    ExpoApp -->|Plays Alex's Voice & Displays Text| User;

```

**Diagram Flow Explanation:**

1.  **User Interaction:** The user interacts with the **Expo (React Native) App**.
2.  **Primary Orchestration via PicaOS:** Most interactions requiring AI logic, complex data processing, or coordination between multiple services are routed through **PicaOS**.
    *   PicaOS communicates with **Supabase** for database operations (PostgreSQL), user authentication, file storage, and real-time messaging. Supabase Edge Functions can also be triggered or called by PicaOS.
    *   PicaOS sends tasks to the **Google GenAI SDK** for core language understanding, analysis, and insight generation.
    *   PicaOS requests voice synthesis from the **ElevenLabs API** for Alex's responses.
    *   PicaOS may interact with **Dappier** for specialized real-time data feeds or to support Retrieval Augmented Generation (RAG) for the LLM.
    *   PicaOS may interface with **Nodely** for workflows or decentralized storage needs (e.g., IPFS).
3.  **Direct Supabase Interaction (Optional):** For simpler data fetching or user authentication tasks not requiring complex AI orchestration, the Expo app *might* interact directly with Supabase APIs, but the primary model favors PicaOS mediation for consistency and complex logic handling.
4.  **Monitoring:** Both the Expo app and backend services (PicaOS, Supabase functions via logging, Nodely) report errors and performance data to **Sentry**.
5.  **Example Data/Control Flows:**
    *   **User Speech:** Voice input from the app is processed (potentially via PicaOS coordinating a Speech-to-Text service like Google GenAI's STT), the transcript is stored in Supabase, and then sent back to the app for display.
    *   **Alex's Response:** PicaOS determines Alex's response content (using Google GenAI), gets it synthesized by ElevenLabs, and sends the audio and text to the app.

This architecture aims for a separation of concerns, with the mobile app focused on UI/UX and PicaOS handling the complex AI and service orchestration, all supported by the robust backend and specialized services.
