# Strava Activity Visualizer

A Next.js application that integrates with the Strava API to visualize your fitness activities in a GitHub-style contribution graph. Connect your Strava account and see your workout intensity displayed as a heatmap over the past year.

## Features

- **Strava OAuth Integration**: Secure authentication with your Strava account
- **Activity Heatmap**: GitHub-style contribution graph showing activity intensity
- **Distance-Based Visualization**: Activity squares colored by relative distance intensity
- **52-Week View**: Full year calendar layout with daily activity representation
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

## How It Works

1. **Connect**: Authenticate with your Strava account using OAuth
2. **Fetch**: Retrieves up to 500 of your recent activities via Strava API
3. **Visualize**: Maps activities to calendar grid, with color intensity based on distance
4. **Explore**: Hover over squares to see activity dates and intensity

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Strava account with activities
- Strava API credentials (Client ID and Client Secret)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd strava-contributions
```

2. Install dependencies:
```bash
npm install
```

3. Set up Strava API credentials:
   - Currently configured with hardcoded Client ID (120867)
   - Client Secret is hardcoded in `app/login/page.tsx` (line 25)
   - For production use, move these to environment variables

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Usage

1. Click "Connect with Strava" on the home page
2. Authorize the application in Strava
3. You'll be redirected to the activity graph showing your workout heatmap

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Strava API v3
- **Authentication**: OAuth 2.0
- **State Management**: React hooks + localStorage

## Architecture

- `app/page.tsx` - Landing page with Strava connect button
- `app/login/page.tsx` - OAuth callback handler and token exchange
- `app/graph/page.tsx` - Activity visualization component
- `app/StravaAdapter.tsx` - Strava API client singleton
- Custom date calculation functions for accurate calendar positioning
