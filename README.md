# 🖼️ BgRemover AI — Full Stack AI Background Removal SaaS

> A production-ready Full Stack AI SaaS app built with React JS, Node.js, MongoDB, Clerk Authentication & Razorpay payments. Remove image backgrounds in seconds using the ClipDrop AI API.

![Tech Stack](https://img.shields.io/badge/React-18-blue?logo=react) ![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js) ![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb) ![Clerk](https://img.shields.io/badge/Auth-Clerk-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwindcss)

---

## 🚀 Live Demo

> Deploy link goes here after you push to Vercel/Render

---

## ✨ Features

- 🤖 **AI Background Removal** — Powered by ClipDrop API
- 🔐 **Clerk Authentication** — Sign up, login, Google/GitHub OAuth
- 💳 **Credit System** — 5 free credits on signup, buy more via Razorpay
- 💰 **Razorpay Payments** — Secure payment gateway integration
- 📱 **Fully Responsive** — Works on mobile, tablet and desktop
- ⚡ **Real-time Processing** — Instant AI processing with live preview
- 🎨 **Beautiful UI** — Built with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React JS 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Auth | Clerk (webhooks for user sync) |
| AI API | ClipDrop Background Removal API |
| Payments | Razorpay |
| Deployment | Vercel (Frontend) + Render (Backend) |

---

## 📁 Project Structure

```
bg-removal-saas/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx  # Global state
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Landing page + upload
│   │   │   ├── Result.jsx      # Before/after comparison
│   │   │   └── BuyCredit.jsx   # Pricing & payment
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   └── package.json
│
├── server/                     # Node.js + Express Backend
│   ├── configs/
│   │   ├── mongodb.js          # DB connection
│   │   └── multer.js           # File upload config
│   ├── controllers/
│   │   ├── userController.js   # Credits + payment logic
│   │   └── imageController.js  # ClipDrop API call
│   ├── middlewares/
│   │   └── auth.js             # Clerk webhook + auth
│   ├── models/
│   │   ├── userModel.js
│   │   └── transactionModel.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── imageRoutes.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)
- Clerk account (free)
- ClipDrop API key (free tier available)
- Razorpay account (test mode)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/bg-removal-saas.git
cd bg-removal-saas
```

### 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` with your credentials:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
CLIPDROP_API=your_clipdrop_key
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
PORT=4000
CURRENCY=inr
```

### 3. Setup Frontend

```bash
cd ../client
npm install
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=rzp_test_...
```

### 4. Run the app

From root folder:
```bash
npm install
npm run dev
```

Or separately:
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm run dev
```

App runs at: `http://localhost:5173`

---

## 🔑 Getting API Keys

### ClipDrop API (Background Removal)
1. Go to [clipdrop.co/apis](https://clipdrop.co/apis)
2. Sign up for free
3. Get your API key from the dashboard
4. Free tier: 100 API calls/month

### Clerk Authentication
1. Go to [clerk.com](https://clerk.com) and create a new app
2. Copy your Publishable Key and Secret Key
3. Set up Webhooks:
   - URL: `https://your-backend-url.com/api/user/webhooks`
   - Events: `user.created`, `user.updated`, `user.deleted`
4. Copy the Webhook Signing Secret

### Razorpay
1. Go to [razorpay.com](https://razorpay.com) and sign up
2. Use **Test Mode** for development
3. Get Key ID and Key Secret from Settings > API Keys

### MongoDB Atlas
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free cluster
3. Get your connection string

---

## 🚀 Deployment

### Deploy Frontend to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

cd client
vercel

# Set environment variables in Vercel dashboard:
# VITE_CLERK_PUBLISHABLE_KEY
# VITE_BACKEND_URL (your Render backend URL)
# VITE_RAZORPAY_KEY_ID
```

### Deploy Backend to Render
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add all environment variables from `server/.env`

### Update Clerk Webhook
After deploying backend, update your Clerk webhook URL to:
`https://your-render-app.onrender.com/api/user/webhooks`

---

## 📸 Screenshots

> Add screenshots here after running the app

---

## 🧑‍💻 Author

Built by following the **GreatStack** YouTube tutorial:
[Full Stack AI BG Removal SaaS App](https://youtu.be/tCxj8PwBYjc)

---

## 📄 License

MIT License — feel free to use for personal and commercial projects.
