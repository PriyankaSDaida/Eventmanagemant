# EventHorizon - Event Management Platform

EventHorizon is a modern, comprehensive event management web application built with React, TypeScript, and Tailwind CSS. It leverages Google's Gemini AI for content generation and provides a seamless experience for both event organizers and attendees.

## 🚀 Features

### Public-Facing
*   **Modern Homepage**: Engaging landing page with hero section, featured events, categories, and testimonials.
*   **Event Discovery**: Advanced search and filtering capabilities (by category, date, price, location).
*   **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.

### For Attendees
*   **Event Details**: Rich event pages with agendas, speaker profiles, and location info.
*   **Ticketing System**: Seamless ticket selection with real-time availability tracking.
*   **User Dashboard**: Track upcoming events and booking history.

### For Organizers
*   **AI-Powered Creation**: Integrated **Google Gemini AI** to automatically generate marketing descriptions, agendas, and tags based on simple notes.
*   **Dashboard Analytics**: Real-time visualizations of revenue, attendee counts, and registration trends using Recharts.
*   **Event Management**: Create, edit, and manage event details and ticket types.

## 🛠️ Technology Stack

*   **Frontend Framework**: React 18 with TypeScript
*   **Styling**: Tailwind CSS with a custom design system (Indigo & Pink theme)
*   **Icons**: Lucide React
*   **Charts**: Recharts
*   **AI Integration**: Google GenAI SDK (Gemini 2.5 Flash)
*   **Build Tool**: Vite (assumed environment)

## 📂 Project Structure

```
/
├── components/        # Reusable UI components (Navbar, EventCard, Footer, etc.)
├── services/          # API integrations (Gemini AI, Mock Auth, Data persistence)
├── views/             # Page components (Home, Dashboard, EventDetails, etc.)
├── types.ts           # TypeScript definitions
├── App.tsx            # Main application logic and routing
└── index.html         # Entry point with Tailwind configuration
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

4.  **Run the development server**
    ```bash
    npm run dev
    ```

## 🤖 AI Features

The application uses the `@google/genai` SDK to enhance event creation.
*   **Model**: `gemini-2.5-flash`
*   **Functionality**: When creating an event, users can input basic notes, and the AI generates a professional description, a structured agenda with times and speakers, and relevant categorization tags.

## 🎨 Design System

The project uses a custom Tailwind configuration:
*   **Primary Color**: Indigo (`#6366f1`)
*   **Secondary Color**: Pink (`#ec4899`)
*   **Typography**: `Inter` for body text, `Poppins` for headings.

## 📄 License

This project is open-source and available under the MIT License.
