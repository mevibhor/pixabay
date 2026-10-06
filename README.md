<img width="1376" height="768" alt="pixabay-readme-image" src="https://github.com/user-attachments/assets/80992eea-7efb-4dbc-be28-d3e18aaf1c56" />

# Pixabay Media Explorer

A responsive Pixabay-inspired media discovery application built with React. Users can search and explore royalty-free images and videos, view detailed media information, save favourites, and manage their personal library.

## Features

* Search Pixabay images and videos
* Image and video filtering
* Related search suggestions
* Responsive masonry media grid
* Media detail modal
* Firebase email/password authentication
* Google authentication
* Favourites / saved media
* Download history
* Responsive design for desktop, tablet, and mobile
* Loading states and error handling
* Toast notifications
* TanStack Query for API data fetching and caching

## Tech Stack

* React
* Vite
* React Router
* TanStack Query
* Firebase
* Tailwind CSS
* Pixabay API
* Lucide React
* Sonner

## Responsive Design

The application is designed to provide a consistent experience across desktop, tablet, and mobile devices.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mevibhor/pixabay
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and add your Firebase and Pixabay API credentials.

```env
VITE_FIREBASE_API_KEY=
VITE_PIXABAY_AUTH_DOMAIN=
VITE_PIXABAY_PROJECT_ID=
VITE_PIXABAY_STORAGE_BUCKET=
VITE_PIXABAY_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_PIXABAY_API_KEY=
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

## Build

```bash
npm run build
```

## Note

This project uses the Pixabay API for media search and Firebase for authentication and user data.
