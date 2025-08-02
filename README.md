# Prescripto - Healthcare Appointment Booking System

A comprehensive healthcare appointment booking platform that connects patients with doctors, featuring a modern React frontend, Node.js backend API, and an admin panel for system management.

## 🏥 Project Overview

Prescripto is a full-stack healthcare appointment booking system that enables patients to:
- Browse and search for doctors by specialty
- Book appointments with available time slots
- Manage their appointments and profiles
- Make secure payments for consultations

The system also provides doctors with appointment management tools and administrators with comprehensive system oversight.

## 🏗️ Architecture

The project consists of three main components:

- **Backend API** (`/backend`) - Node.js/Express server with MongoDB
- **Frontend** (`/Frontend`) - React application for patients/users
- **Admin Panel** (`/admin`) - React application for doctors and administrators

## 🚀 Features

### For Patients/Users
- 🔐 User authentication and profile management
- 👨‍⚕️ Browse doctors by specialty
- 📅 Book appointments with available time slots
- 💳 Secure payment processing (Razorpay integration)
- 📱 Responsive design with modern UI
- 📋 View and manage appointments
- 👤 Profile customization with image upload

### For Doctors
- 🏥 Doctor profile management
- 📊 Appointment dashboard
- 📅 Manage availability and time slots
- 💰 Set consultation fees
- 📋 View patient appointments

### For Administrators
- 👥 Manage all doctors and users
- 📊 System-wide analytics
- ➕ Add new doctors to the platform
- 📋 Monitor all appointments
- 🔧 System configuration

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer + Cloudinary
- **Payment**: Razorpay integration
- **Security**: bcrypt for password hashing
- **Validation**: Validator.js

### Frontend (User & Admin)
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Linting**: ESLint

## 📁 Project Structure

```
Prescripto-main/
├── backend/                 # Node.js API server
│   ├── config/             # Database and service configurations
│   ├── controllers/        # Business logic handlers
│   ├── middlewares/        # Custom middleware functions
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API route definitions
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── Frontend/               # Patient/User React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   └── assets/         # Static assets
│   └── package.json        # Frontend dependencies
└── admin/                  # Admin/Doctor React application
    ├── src/
    │   ├── components/     # Admin UI components
    │   ├── pages/          # Admin pages
    │   │   ├── Admin/      # Administrator pages
    │   │   └── Doctor/     # Doctor-specific pages
    │   └── assets/         # Static assets
    └── package.json        # Admin dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Cloudinary account (for image uploads)
- Razorpay account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Prescripto-main
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Set up the Frontend**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Set up the Admin Panel**
   ```bash
   cd ../admin
   npm install
   ```

### Environment Configuration

Create `.env` files in the backend directory with the following variables:

```env
# Backend .env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The API will be available at `http://localhost:4000`

2. **Start the Frontend (User Interface)**
   ```bash
   cd Frontend
   npm run dev
   ```
   The user interface will be available at `http://localhost:5173`

3. **Start the Admin Panel**
   ```bash
   cd admin
   npm run dev
   ```
   The admin panel will be available at `http://localhost:5174`

## 📋 API Endpoints

### User Routes (`/api/user`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `GET /doctors` - Get all doctors
- `GET /doctors/:speciality` - Get doctors by specialty
- `POST /appointment` - Book appointment
- `GET /appointments` - Get user appointments
- `PUT /appointment/:id` - Update appointment

### Doctor Routes (`/api/doctor`)
- `POST /login` - Doctor login
- `GET /profile` - Get doctor profile
- `PUT /profile` - Update doctor profile
- `GET /appointments` - Get doctor appointments
- `PUT /appointment/:id` - Update appointment status

### Admin Routes (`/api/admin`)
- `POST /login` - Admin login
- `GET /doctors` - Get all doctors
- `POST /doctor` - Add new doctor
- `PUT /doctor/:id` - Update doctor
- `DELETE /doctor/:id` - Delete doctor
- `GET /appointments` - Get all appointments
- `GET /users` - Get all users

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Users, doctors, and administrators have separate authentication systems with role-based access control.

## 💳 Payment Integration

The system integrates with Razorpay for secure payment processing. Users can pay for appointments using various payment methods supported by Razorpay.

## 🖼️ File Upload

Cloudinary is used for image uploads, allowing users and doctors to upload profile pictures and other images securely.

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Built with Tailwind CSS for a clean, modern appearance
- **Toast Notifications**: Real-time feedback using React Toastify
- **Loading States**: Smooth user experience with loading indicators
- **Form Validation**: Client-side and server-side validation

## 🚀 Deployment

### Backend Deployment
- Deploy to platforms like Heroku, Railway, or AWS
- Set environment variables in your hosting platform
- Ensure MongoDB connection is accessible

### Frontend Deployment
- Build the application: `npm run build`
- Deploy to Vercel, Netlify, or any static hosting service
- Configure environment variables for API endpoints

### Admin Panel Deployment
- Similar to frontend deployment
- Ensure proper routing configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for better healthcare accessibility by Ansh Gadwal**
