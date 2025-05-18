# DJDJ Frontend

D J D J is a frontend application built with Next.js that features Spotify login integration.

## Getting Started

Ensure you have Node.js 14.0.0 or higher and either npm or yarn installed. 
First, create a new app on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications) and set the Redirect URI to `http://127.0.0.1:3000/api/auth/callback/spotify`. 

Then, create a `.env.local` file and add the following:
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
NEXTAUTH_URL=http://127.0.0.1:3000
NEXTAUTH_SECRET=your_random_secret_here

To install dependencies and run the app, use `npm install` or `yarn`, followed by `npm run dev` or `yarn dev`. Open [http://127.0.0.1:3000](http://127.0.0.1:3000) in your browser to view the application.

## Features

- Login with Spotify  
- Display user profile  
- Auto-refresh access token  

## Project Structure

- `/pages` – All page components  
- `/components` – Reusable UI elements  
- `/styles` – CSS module files  
- `/public` – Static assets (images, etc.)  
- `/pages/api` – API routes including NextAuth.js config
