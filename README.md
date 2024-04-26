# Flow (Languages LMS)

## Overview

Flow is a modern LMS like (`Duolingo`) for learning languages effectively with interactive UI and game play style.

## Features

Key Features:

- Next.js 14 & server actions
- AI Voices using Elevenlabs AI
- Beautiful component system using Shadcn UI
- Amazing characters thanks to KenneyNL
- Auth using Clerk
- Sound effects
- Hearts system
- Points / XP system
- No hearts left popup
- Exit confirmation popup
- Practice old lessons to regain hearts
- Leaderboard
- Quests milestones
- Shop system to exchange points with hearts
- Pro tier for unlimited hearts using Stripe
- Landing page
- Admin dashboard React Admin
- ORM using DrizzleORM
- PostgresDB using NeonDB
- Deployment on Vercel
- Mobile responsiveness

## Tech Stack

- Next.js 14
- Postgresql (Neon cloud)
- DrizzleORM
- Clerk (Auth)
- TypeScript
- Tailwind / ShadcnUI
- Read Admin
- Stripe

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Postgresql database for storing application data.

### Installation

1. Clone the repository: `git clone https://github.com/Kei-K23/Flow-LMS`
2. Navigate to the project directory: `cd Flow-LMS`
3. Install dependencies: `npm install`
4. Configure environment variables.
5. Start the application locally: `npm run dev`

### Configuration

Make sure to set the following environment variables:

- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<YOUR_CLERK_PUBLISHABLE_KEY>
- CLERK_SECRET_KEY=<YOUR_CLERK_SECRET_KEY>

- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in<modify_as_you_need>
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up<modify_as_you_need>
- NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/<modify_as_you_need>
- NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/<modify_as_you_need>

- NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=<YOUR_UNSPLASH_ACCESS_KEY>
- NEXT_PUBLIC_UNSPLASH_SECRET_KEY=<YOUR_UNSPLASH_SECRET_KEY>

- DB_CONNECTION=<DB_CONNECTION>
- STRIPE_API_KEY=<STRIPE_API_KEY>
- NEXT_PUBLIC_BASE_URL=<NEXT_PUBLIC_BASE_URL>
- STRIPE_WEBHOOK_SECRET=<STRIPE_WEBHOOK_SECRET>
- ADMIN_ACCOUNT_ID=<ADMIN_ACCOUNT_ID_FROM_CLERK>

## Contributing

We welcome contributions from the community! If you find a bug or have an idea for an improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- First, this project is not copy pasting project.
- `Duolingo` for the inspiration.
- [Build a Duolingo Clone With Nextjs, React, Drizzle, Stripe (2024)](https://www.youtube.com/watch?v=dP75Khfy4s4) for the inspiration and learning.
