# 🧠 CoachWise – Your AI Career Coach

CoachWise is an AI-powered career development platform that helps users generate resumes, personalized roadmaps, and career insights using modern LLMs like Gemini. It’s a one-stop tool for students, professionals, and job seekers to grow in their careers with real-time coaching.

---

## 🚀 Features

- ✅ **Resume Analyzer** – Upload a resume and get instant AI-generated feedback.
- 🧠 **Career Q&A Assistant** – Ask questions like “How to become a frontend dev?” and get guided AI responses.
- 🗺️ **Roadmap Generator** – Auto-generates a skill roadmap based on your target career.
- 📝 **Cover Letter Generator** – *(Coming Soon)* Auto-draft tailored cover letters for job roles.
- 🔐 **Clerk Authentication** – Sign up and login securely via Clerk.
- 💳 **Stripe Billing** – Manage subscriptions for premium features.
- ⚙️ **Inngest Background Jobs** – Handle resume parsing, roadmap generation, and more.
- 📄 **PDF Rendering** – Preview resume and AI insights side-by-side.

---

## 🧱 Tech Stack

| Area              | Technology                             |
|-------------------|----------------------------------------|
| Frontend          | Next.js 15, Tailwind CSS, ShadCN UI    |
| Animations        | Framer Motion                          |
| AI Integration    | Gemini API (via LangChain + axios)     |
| Authentication    | Clerk                                  |
| Billing           | Stripe                                 |
| Background Jobs   | Inngest                                 |
| Database          | Neon (PostgreSQL) + Drizzle ORM        |
| File Uploads      | ImageKit                               |
| Email             | Resend                                 |
| Roadmap Diagrams  | @xyflow/react (React Flow)             |

---

## 📸 Live Demo

👉 [https://coachwise.vercel.app](https://coachwise.vercel.app)

---

# 🛠️ Getting Started – CoachWise

Set up and run the CoachWise project locally in 4 simple steps.

---

## ✅ 1. Clone the Repository

```bash
git clone https://github.com/Aryan0512398/coachwise.git
cd coachwise
```
## ✅ 2. Install Dependencies
```bash
npm install
```
## ✅ 3 Create .env File
```bash
cp .env.example .env
```
## 🔐 .env Configuration Reference
#### Database
NEXT_PUBLIC_NEON_DB_CONNECTION_STRING=

#### Clerk Auth
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

#### Inngest
INNGEST_SIGNING_KEY=local.dev
INNGEST_SERVER_HOST=http://127.0.0.1:8288

#### ImageKit
IMAGE_KIT_PUBLIC_KEY=
IMAGE_KIT_PRIVATE_KEY=
IMAGE_KIT_ENDPOINT_URL=

#### Resend Email
RESEND_API_KEY=
## ✅ 4. Run the Project
```bash
npm run dev
```
Visit the app at 👉 http://localhost:3000




