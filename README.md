# 🏆 PrimeBid - Online Auction Platform

A modern, full-stack online auction platform built with React, Node.js, and MongoDB. PrimeBid provides a complete auction experience with real-time bidding, user management, commission tracking, and admin controls.

## ✨ Features

### 🎯 Core Auction Features
- **Real-time Bidding System** - Live auction bidding with instant updates
- **Auction Management** - Create, edit, and manage auction items
- **Bid History** - Track all bids and bidder information
- **Auction Timer** - Automatic auction end times with notifications
- **Image Upload** - Cloudinary integration for auction item images

### 👥 User Management
- **User Registration & Authentication** - Secure JWT-based authentication
- **User Profiles** - Detailed user profiles with bidding history
- **Role-based Access** - User, Admin, and Super Admin roles
- **Password Security** - bcrypt password hashing

### �� Commission System
- **Commission Tracking** - Track and manage commission payments
- **Commission Proof Upload** - Users can upload payment proofs
- **Commission History** - Complete commission transaction history

### 📊 Analytics & Dashboard
- **Leaderboard** - Top bidders and auction performance
- **Data Visualization** - Chart.js integration for analytics
- **User Dashboard** - Personal bidding and auction statistics
- **Admin Dashboard** - Comprehensive admin controls

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Data visualization
- **React Icons** - Icon library
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing
- **Cloudinary** - Cloud image storage
- **Nodemailer** - Email sending
- **node-cron** - Scheduled tasks

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/keshav-porwal1/PrimeBid.git
cd PrimeBid
```

### Step 2: Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 3: Environment Setup
1. Create a `config.env` file in the `backend` directory
2. Add your environment variables
3. Create a `.env` file in the `frontend` directory
4. Add your frontend environment variables

## 🎯 Usage

### Development Mode

#### Start Backend Server
```bash
cd backend
npm run dev
```

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
```

### Production Build
```bash
cd frontend
npm run build

cd ../backend
npm start
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Auctions
- `GET /api/auctions` - Get all auctions
- `POST /api/auctions` - Create new auction
- `GET /api/auctions/:id` - Get auction details
- `PUT /api/auctions/:id` - Update auction
- `DELETE /api/auctions/:id` - Delete auction

### Bidding
- `POST /api/bids` - Place a bid
- `GET /api/bids/auction/:auctionId` - Get bids for auction
- `GET /api/bids/user/:userId` - Get user's bids

### Commissions
- `POST /api/commissions` - Submit commission proof
- `GET /api/commissions` - Get commission history
- `PUT /api/commissions/:id` - Update commission status

## �� Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Contributors

- **Keshav Porwal** - [@keshav-porwal1](https://github.com/keshav-porwal1)
- **Zeeshu Coder** - [@ZeeshuCoder](https://github.com/ZeeshuCoder)

## 📝 License

This project is licensed under the ISC License.

---

**Made with ❤️ by the PrimeBid Team**

*An innovative auction platform for the modern digital age*
