# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 application that integrates with the Strava API to visualize user activity data in a GitHub-style contribution graph. The app allows users to authenticate with Strava and view their fitness activities as a heatmap based on activity distance.

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### Core Components
- **StravaAdapter** (`app/StravaAdapter.tsx`): Singleton class that handles Strava API communication, manages access tokens via localStorage, and fetches paginated activity data
- **OAuth Flow**: Handled in `app/login/page.tsx` with client-side token exchange
- **Activity Visualization**: `app/graph/page.tsx` renders a 52-week × 7-day grid showing activity intensity

### Key Features
- **Strava OAuth Integration**: Uses client ID 120867 with hardcoded client secret for token exchange
- **Activity Heatmap**: Generates GitHub-style contribution graph based on activity distance
- **Date Calculations**: Custom date manipulation functions handle leap years and month boundaries for accurate grid positioning
- **Responsive Design**: Uses Tailwind CSS with responsive breakpoints

### Environment Variables
- `NEXT_PUBLIC_URL`: Used for OAuth redirect URI construction

### Authentication Flow
1. Home page (`app/page.tsx`) initiates OAuth with Strava
2. User redirected to `/login` with authorization code
3. Client-side token exchange stores access token in localStorage
4. User redirected to `/graph` to view activity visualization

### Data Processing
- Fetches up to 5 pages (500 activities) from Strava API
- Normalizes activity distances against maximum value for color intensity
- Maps activities to calendar grid using custom date computation functions

## Technical Notes

- **Client Secret Exposure**: The Strava client secret is hardcoded in the login component (security consideration for production)
- **TypeScript**: Strict mode enabled with path aliases configured (`@/*`)
- **Styling**: Tailwind CSS with custom responsive design
- **State Management**: React hooks for component state, localStorage for token persistence