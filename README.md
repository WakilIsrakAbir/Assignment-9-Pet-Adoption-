# PetAdopt Platform

## Purpose
A full-stack Pet Adoption Platform allowing users to explore pets available for adoption, view detailed pet profiles, and submit adoption requests. Pet owners can list their pets and manage adoption requests securely.

## Live URL
*(Live URL goes here - e.g., Vercel / Render deployment link)*

## Features
- **User Authentication:** Secure JWT-based authentication using HTTPOnly cookies.
- **Pet Browsing & Search:** Search pets by name and filter them by species using an interactive UI.
- **Adoption Request Management:** Users can request to adopt pets (excluding their own), and owners can approve or reject these requests seamlessly.
- **Adoption Control:** When a request is approved, the pet is automatically marked as 'adopted' and all other pending requests for that pet are rejected.
- **Private Dashboard:** A secure dashboard area where users can manage their own listings, track their adoption requests, and view the status of their requests.

## NPM Packages Used
- `next` (Next.js framework)
- `react` / `react-dom`
- `tailwindcss` (Styling)
- `framer-motion` (Micro-animations and transitions)
- `axios` (API requests with credentials)
- `react-hot-toast` (UI notifications)
- `react-icons` (Scalable vector icons)

## Setup Locally
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Configure the `.env` if necessary (though the proxy `next.config.mjs` handles backend routing to `http://localhost:5000/api`).
4. Run `npm run dev` to start the frontend server.
