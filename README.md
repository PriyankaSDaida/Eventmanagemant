# EventHorizon - Event Management Platform

EventHorizon is a modern, comprehensive event management web application built with React, TypeScript, and Tailwind CSS. It leverages Google's Gemini AI for smart content generation and features a "Vibrant Professional" light theme designed for clarity and engagement.

## 🚀 Features

### Public-Facing
*   **Modern Homepage**: Engaging landing page with a hero section, featured categories, and trusted partner showcase.
*   **Event Discovery**: "Explore Events" page with a floating glass search bar and advanced filtering (category, price, date).
*   **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices with smooth animations.

### For Attendees
*   **Event Details**: Immersive event pages featuring a gradient-overlay hero section, detailed agenda, and speaker profiles.
*   **Ticketing System**: Interactive ticket selection cards with real-time status (Sold Out / Limited Availability).
*   **Smart Dashboard**: Personal dashboard to track registered events and upcoming schedules.

### For Organizers
*   **AI-Powered Creation**: Integrated **Google Gemini AI** (Model: `gemini-2.5-flash`) to automatically generate:
    *   Compelling marketing descriptions.
    *   Structured agendas with time slots and activities.
    *   Relevant category tags.
    *   *All from simple context notes.*
*   **Analytics Dashboard**: Visualizations of revenue, attendee engagement, and ticket sales using Recharts.
*   **Event Management**: Intuitive wizard for creating and publishing events.

## 🛠️ Technology Stack

*   **Frontend**: React 18, TypeScript, Vite
*   **Styling**: Tailwind CSS
    *   *Theme*: "Vibrant Professional" (Light Mode)
    *   *System*: Glassmorphism, Mesh Gradients, Slate-50 Background
*   **Icons**: Lucide React
*   **Charts**: Recharts
*   **AI Integration**: Google GenAI SDK (`@google/genai`)

## 🎨 Design System

The application features a polished "Vibrant Professional" light theme:

| Role | Color | Hex | Use Case |
|------|-------|-----|----------|
| **Background** | Slate 50 | `#f8fafc` | Main application background |
| **Primary** | Indigo 600 | `#4f46e5` | Key actions, brand identity, trustworthiness |
| **Secondary** | Pink 600 | `#db2777` | Creative accents, highlights, excitement |
| **Accent** | Teal 600 | `#0d9488` | Success states, freshness, status indicators |

*   **Glassmorphism**: A "Light Frost" effect (`bg-white/70`, `backdrop-blur-xl`) used on cards and navigation for a modern, airy feel.
*   **Typography**: `Inter` for clean legibility and `Outfit` for modern, bold headings.

## 📂 Project Structure

```
/
├── components/        # Reusable UI components (Navbar, EventCard, Layout, etc.)
├── services/          # API integrations (Gemini AI, Mock Auth, Storage)
├── views/             # Page components
│   ├── Dashboard.tsx    # Analytics & Stats
│   ├── CreateEvent.tsx  # Event Wizard with AI
│   ├── EventDetails.tsx # Public event view
│   ├── EventsList.tsx   # Search & Discovery
│   └── ...
├── types.ts           # TypeScript definitions
├── App.tsx            # Main routing and state management
└── index.html         # Entry point & Global CSS Variables
```

## 🏗️ Architecture

```mermaid
graph TD
    User([User]) -->|Interacts| Client[Browser]
    Client -->|Loads| App[React Application]

    subgraph "Frontend Architecture"
        App -->|Routing| Router[React Router]
        Router -->|Renders| Layout[Main Layout]
        
        Layout -->|Contains| Navbar
        Layout -->|Contains| Views
        
        subgraph "Views"
            Views --> Home
            Views --> Dashboard
            Views --> EventsList[Explore Events]
            Views --> EventDetails
            Views --> CreateEvent[Create Wizard]
        end
        
        subgraph "Components"
            Home --> EventCard
            EventsList --> EventCard
            Dashboard --> Recharts[Charts & Stats]
        end
        
        CreateEvent -->|Uses| GeminiService
        EventsList -->|Reads| MockData[Data Store]
        Dashboard -->|Reads| MockData
    end

    subgraph "External Services"
        GeminiService -->|API Call| GoogleAI[Google Gemini API]
        GeminiService -.->|Fallback| MockGen[Mock Generator]
    end
    
    classDef primary fill:#4f46e5,stroke:#333,stroke-width:2px,color:white;
    classDef secondary fill:#db2777,stroke:#333,stroke-width:2px,color:white;
    classDef external fill:#0f172a,stroke:#333,stroke-width:2px,color:white;
    
    class App,Router,Layout primary;
    class CreateEvent,Dashboard,EventDetails secondary;
    class GoogleAI external;
```

## ⚙️ Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/eventhorizon.git
    cd eventhorizon
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add your Google Gemini API key:
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```
    *Note: If no API key is provided, the app will seamlessly fallback to using high-quality mock data for demonstrations.*

4.  **Run the development server**
    ```bash
    npm run dev
    ```

## 🤖 AI Features

The application uses the **Gemini 2.5 Flash** model via the `@google/genai` SDK.
*   **Smart Fallback**: The `geminiService.ts` includes a robust mock generator that produces context-aware content (Tech vs. Music vs. General) if the API is unreachable, ensuring the demo never breaks.

## 📄 License

This project is open-source and available under the MIT License.
