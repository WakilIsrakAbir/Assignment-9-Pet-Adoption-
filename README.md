# PetAdopt - Pet Adoption Platform

## 📌 Project Purpose
PetAdopt is a full-stack web application designed to connect loving individuals with adorable pets in need of a forever home. Users can browse available pets, filter them by species, view detailed information, and submit adoption requests. Pet owners can list their pets for adoption, manage incoming requests, and update or delete their listings.

## 🔗 Live URL
*(Add your Vercel/Netlify live URL here after deployment)*
`https://your-live-url.vercel.app`

## ✨ Key Features
1. **User Authentication & Authorization**: Secure login and registration using Better-Auth. Users must be logged in to adopt pets or manage their dashboard.
2. **Dynamic Search & Filtering**: Advanced real-time search functionality on the "All Pets" page, filtering by pet name (`$regex`) and species (`$in`).
3. **Comprehensive Dashboard Management**: Users can add new pet listings, view all their listings, edit pet details, and delete listings with confirmation modals.
4. **Adoption Request Workflow**: Users can request to adopt a pet (unless they are the owner). Pet owners can view requests for their listings and approve or reject them. Approving a request marks the pet as "Adopted" and rejects other pending requests.
5. **Modern UI & Aesthetics**: Built with Next.js, Tailwind CSS v4, HeroUI components, and Framer Motion for smooth, dynamic, and responsive user experiences, complete with Light/Dark mode toggling.

## 📦 NPM Packages Used
- **next**: Modern React framework for SSR and App Router.
- **react / react-dom**: UI component building.
- **tailwindcss / @tailwindcss/postcss**: Styling and layout.
- **@heroui/react**: Beautiful, accessible UI components.
- **better-auth**: Comprehensive authentication solution.
- **axios**: Promise-based HTTP client for API requests.
- **mongoose**: MongoDB object modeling tool.
- **framer-motion**: Animation library for React.
- **react-hot-toast**: Beautiful notifications for React.
- **react-icons**: SVG icon library.
- **next-themes**: Dark/Light mode theme toggling.
