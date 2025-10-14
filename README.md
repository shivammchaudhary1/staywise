# 🏨 StayWise - Property Booking Platform

![StayWise Logo](public/assets/staywise-logo.png)

**StayWise** is a modern, full-stack web application for property listings and bookings, simulating the backbone of a villas/hotels platform. Built with a focus on clean code, functionality, and modern web technologies.

## 🌟 Overview

StayWise provides a comprehensive platform where users can:

- Browse and search property listings
- View detailed property information
- Create and manage bookings
- Secure user authentication and authorization
- Admin panel for property and booking management

## ✨ Features

### Core Functionality

- 🔐 **Authentication & Authorization**

  - Email/password signup & login
  - Secure password hashing with bcrypt
  - JWT-based authentication
  - Protected routes and middleware

- 🏠 **Property Management**

  - Browse property listings
  - Detailed property views
  - Property search and filtering
  - Featured properties showcase

- 📅 **Booking System**
  - Create new bookings
  - View personal booking history
  - Admin can view all bookings
  - Booking status management

### User Experience

- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Optimized with Next.js App Router
- 🔒 **Secure** - Protected API endpoints and user data

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.5.4 (App Router)
- **Styling**: Tailwind CSS 4.0
- **Language**: TypeScript 5.x
- **UI Components**: React 19.1.0
- **Icons**: React Icons

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Language**: TypeScript 5.9.3
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt

### Database

- **Database**: MongoDB




## 📁 Project Structure

```
staywisee/
├── client/                    # Next.js Frontend Application
│   ├── public/               # Static assets
│   │   └── assets/          # Images and logos
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   │   ├── auth/        # Authentication pages
│   │   │   │   ├── login/   # Login page
│   │   │   │   └── register/ # Registration page
│   │   │   ├── globals.css  # Global styles
│   │   │   ├── layout.tsx   # Root layout
│   │   │   └── page.tsx     # Home page
│   │   ├── components/      # Reusable components
│   │   │   ├── booking/     # Booking components
│   │   │   ├── common/      # Shared components
│   │   │   └── property/    # Property components
│   │   ├── styles/          # CSS modules
│   │   └── types/           # TypeScript definitions
│   ├── package.json
│   └── tsconfig.json
│
└── server/                   # Express.js Backend Application
    ├── src/
    │   ├── config/          # Configuration files
    │   │   ├── database/    # Database connection
    │   │   ├── environments/ # Environment variables
    │   │   ├── express/     # Express app setup
    │   │   └── libraries/   # Third-party libraries
    │   ├── controllers/     # Route handlers
    │   ├── middleware/      # Custom middleware
    │   ├── models/          # Database models
    │   ├── routes/          # API routes
    │   ├── types/           # TypeScript definitions
    │   └── server.ts        # Entry point
    ├── package.json
    └── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shivammchaudhary1/staywise.git
   cd staywise
   ```

2. **Install dependencies for both client and server**

   **Backend setup:**

   ```bash
   cd server
   npm install
   ```

   **Frontend setup:**

   ```bash
   cd ../client
   npm install
   ```

### Environment Configuration

1. **Server Environment Variables**

   Create a `.env` file in the `server` directory:

   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/staywise
   # OR use MongoDB Atlas
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/staywise

   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # CORS
   FRONTEND_URL=http://localhost:3000
   ```

2. **Client Environment Variables**

   Create a `.env.local` file in the `client` directory:

   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```

### Running the Application

1. **Start the Backend Server**

   ```bash
   cd server
   npm run dev
   ```

   The server will run on `http://localhost:8080`

2. **Start the Frontend Application**

   ```bash
   cd client
   npm run dev
   ```

   The client will run on `http://localhost:3000`

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Property Routes (`/api/properties`) - Protected

- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create new property (admin)
- `PUT /api/properties/:id` - Update property (admin)
- `DELETE /api/properties/:id` - Delete property (admin)

### Booking Routes (`/api/booking`) - Protected

- `GET /api/booking` - Get user bookings
- `GET /api/booking/all` - Get all bookings (admin)
- `POST /api/booking` - Create new booking
- `PUT /api/booking/:id` - Update booking status
- `DELETE /api/booking/:id` - Cancel booking

## 🔧 Scripts

### Frontend (Client)

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
```

### Backend (Server)

```bash
npm run dev      # Start development server with nodemon
npm run build    # Compile TypeScript to JavaScript
npm start        # Build and start production server
npm test         # Run tests (not implemented yet)
```

## 🏗️ Database Schema

### User Model

```typescript
{
  email: string(unique);
  password: string(hashed);
  firstName: string;
  lastName: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}
```

### Property Model

```typescript
{
  userId: ObjectId (ref: User)
  title: string
  description: string
  price: number
  location: string
  amenities: string[]
  images: string[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Booking Model

```typescript
{
  userId: ObjectId (ref: User)
  propertyId: ObjectId (ref: Property)
  checkIn: Date
  checkOut: Date
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
}
```


### Environment Variables for Production

```env
# Backend
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
FRONTEND_URL=your-deployed-frontend-url

# Frontend
NEXT_PUBLIC_API_URL=your-deployed-backend-url/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Shivam Chaudhary**

- GitHub: [@shivammchaudhary1](https://github.com/shivammchaudhary1)

## 🎯 Roadmap

- [ ] Property search and filtering
- [ ] Payment integration
- [ ] Email notifications
- [ ] Property reviews and ratings
- [ ] Real-time availability checking
- [ ] Mobile app development
- [ ] Advanced admin analytics

---

**Built with ❤️ using modern web technologies**
