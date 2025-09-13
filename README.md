# LocalGuide AI

LocalGuide AI is a web application that lets users interact with a **local LLM** (Ollama) to find places to go, eat, or visit. The app provides results via **Google Maps**, allowing users to view directions on an embedded map or open the location in Google Maps.

---

## Features

- **Full-Stack Next.js:** Both frontend and backend handled with Next.js.  
- **Local LLM Integration:** Uses Ollama to process user prompts and return location-based suggestions.  
- **Google Maps Integration:** Displays results on an embedded map with clickable directions.  
- **Secure API Usage:** Handles API keys safely and implements usage limits.  
- **Modern UI:** Responsive and clean interface using Tailwind CSS.

---

## Tech Stack

- **Frontend:** Next.js + TypeScript + Tailwind CSS  
- **Backend:** Next.js API routes (TypeScript)  
- **LLM:** Ollama (local model)  
- **Maps:** Google Maps API  

---

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/miftakhussalam/LocalGuide.git
cd LocalGuide
```
### 2. install dependencies:

```bash
yarn install || bun install || npm install
```

### 3. Create a `.env.local` file with your API keys:
```.env
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
OLLAMA_API_URL=http://localhost:11434
```

### 4. Run the development server:
```bash
yarn dev || bun run dev || npm run dev
```

