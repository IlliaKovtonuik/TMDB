# 🎬 TMDB Movie App

A mobile application built with **React Native** and **Expo** to search, view, and save movie details using **The Movie Database (TMDB)** API.

## ⚙️ Tech Stack

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/) + Redux Persist
- [Expo-router](https://docs.expo.dev/versions/latest/sdk/router/)
- [EAS Build](https://docs.expo.dev/eas/)
- [Axios](https://axios-http.com/)
- [TMDB API](https://developer.themoviedb.org/)

## 📁 Project Structure

├── api/             # API requests to TMDB
├── app/             # Expo router pages (screens)
├── assets/          # Fonts, images, icons
├── components/      # Shared reusable UI components
├── helpers/         # Utility functions and formatters
├── hooks/           # Custom React hooks
├── store/           # Redux store and slices
├── types/           # Global TypeScript types
├── android/         # Android native project (auto-generated)
├── node_modules/    # Project dependencies
├── .env             # Environment variables (not committed)
├── .gitignore       # Git ignore rules
├── app.json         # Expo app configuration
├── babel.config.js  # Babel configuration for Expo
├── eas.json         # Expo EAS Build configuration
├── env.d.ts         # Type declarations for .env
├── expo-env.d.ts    # Type declarations for Expo environment
├── package.json     # Project metadata and dependencies
├── README.md        # Project documentation
├── tsconfig.json    # TypeScript compiler options

## 📁 How to use 

### General
1. Clone the repository with `git clone https://github.com/IlliaKovtonuik/TMDB.git`
2. Run `npm install` to install dependencies
3. Start the app `npx expo start`
4. Press A to open application on Android emulator or scan QR-Code to connect via Expo Go app.
