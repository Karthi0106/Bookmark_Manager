📌 Bookmark Manager
A modern full-stack bookmark manager built with Next.js (App Router) and Supabase.
Users can securely log in with Google, save private bookmarks, and see real-time updates across tabs.

🚀 Live Demo
👉 https://bookmark-manager-bay-three.vercel.app/


✨ Features
🔐 Google OAuth Authentication (no email/password)
📚 Add bookmarks (Title + URL)
🔒 Private per-user data
⚡ Real-time updates (no refresh required)
🗑 Delete bookmarks
🎨 Modern SaaS-style UI (Tailwind CSS)
☁️ Deployed on Vercel


🛠 Tech Stack
Frontend: Next.js (App Router)
Auth & Database: Supabase
Realtime: Supabase Realtime
Styling: Tailwind CSS
Deployment: Vercel


📂 Project Structure
app/
  page.tsx              → Login page
  dashboard/page.tsx    → Dashboard page

components/
  AddBookmark.tsx
  BookmarkList.tsx

lib/
  supabaseClient.ts


🔐 Authentication
Google OAuth is handled using Supabase Auth.
Each bookmark is linked to a user_id and protected via:
Row Level Security (RLS)
Supabase policies


🗄 Database Schema

Table: bookmarks
| Column     | Type      |
| ---------- | --------- |
| id         | uuid (PK) |
| title      | text      |
| url        | text      |
| user_id    | uuid (FK) |
| created_at | timestamp |


⚡ Realtime Functionality
The app subscribes to Supabase realtime updates:
1.INSERT
2.DELETE
3.UPDATE

Filtered by:
user_id = current_user_id


This ensures:
Private data
Instant UI updates across tabs


🧑‍💻 Local Development

1. Clone repo
git clone https://github.com/your-username/your-repo.git
cd your-repo

2. Install dependencies
npm install

3. Create .env.local
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

4. Run dev server
npm run dev

🌍 Deployment (Vercel)


Push to GitHub
Import project in Vercel
Add environment variables
Add Vercel domain to Supabase OAuth redirect URLs
Deploy 🎉


🧠 What I Learned
Implementing OAuth with Supabase
Securing data using Row Level Security
Handling realtime subscriptions
Building production-ready UI with Tailwind
Deploying Next.js apps to Vercel