# 🏨 StayWise - Property Booking Platform

A modern, full-stack property booking platform built with Next.js and Node.js. Users can browse properties, make bookings, and manage their reservations with a clean, responsive interface.

## ✨ Features

- **User Authentication** - Secure signup/login with JWT authentication
- **Property Browsing** - View and search property listings
- **Booking Management** - Create and manage property bookings
- **Admin Panel** - Admin interface for managing properties and bookings
- **Responsive Design** - Works seamlessly on all devices

## 🛠️ Tech Stack

**Frontend**

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- React 19

**Backend**

- Node.js
- Express.js
- TypeScript
- JWT Authentication
- bcrypt

**Database**

- MongoDB

## 📁 Project Structure

```
staywisee/
├── client/          # Next.js Frontend
│   ├── src/app/    # App Router pages
│   ├── src/components/  # React components
│   └── src/apis/   # API service calls
│
└── server/         # Express.js Backend
    ├── src/controllers/  # Route handlers
    ├── src/models/      # Database models
    └── src/routes/      # API routes
```

## 🚀 How to Run Locally

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/shivammchaudhary1/staywise.git
   cd staywise
   ```

2. **Install dependencies**

   ```bash
   # Backend
   cd server
   npm install

   # Frontend
   cd ../client
   npm install
   ```

3. **Environment Variables**

   Create `.env` in `server/` directory:

   ```env
   MONGODB_URI=mongodb://localhost:27017/staywise
   JWT_SECRET=your-jwt-secret-key
   JWT_EXPIRES_IN=7d
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

   Create `.env.local` in `client/` directory:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```

4. **Start the applications**

   ```bash
   # Terminal 1: Start Backend (from server directory)
   cd server
   npm run dev

   # Terminal 2: Start Frontend (from client directory)
   cd client
   npm run dev
   ```

5. **Access the app**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api

## � Key Functionality

- **User Authentication** - Secure login/register with JWT tokens
- **Property Management** - Browse, view, and manage property listings
- **Booking System** - Create, view, and manage property bookings
- **Admin Panel** - Admin interface for managing properties and all bookings
- **Responsive UI** - Mobile-friendly design with Tailwind CSS

## 👨‍💻 Author

**Shivam Chaudhary**

- GitHub: [@shivammchaudhary1](https://github.com/shivammchaudhary1)

---

_Built with Next.js, Node.js, and MongoDB_
