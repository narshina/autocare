# 🚗 AutoCare – Vehicle Service Reminder System

AutoCare is a **full-stack MERN application** that helps users manage their vehicles, track service schedules, and receive **email & notification reminders** for upcoming vehicle services.

---

## 🔥 Key Features

### 👤 User Features
- User registration with **Email OTP verification**
- Secure login using **JWT authentication**
- Add vehicles with:
  - Vehicle type
  - Registration number
  - Last service date
  - Service reminder interval
  - Vehicle image upload
- Automatic calculation of **next service date**
- View, edit, and delete vehicles
- Service status labels:
  - Upcoming
  - Due Soon
  - Overdue
- Email & in-app **service reminders**
- Notifications panel with read/unread status

---

### 🛠 Admin Features
- Admin dashboard with:
  - Total users
  - Verified users
  - Vehicle statistics
- Manage users:
  - View all users
  - Delete users
  - View user-wise vehicles
- Manage vehicles:
  - View all vehicles
  - Delete any vehicle
- Vehicle distribution chart (Cars / Bikes / Scooters)

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (Image Upload)
- Nodemailer (Email Service)
- Node-Cron (Service Reminder Scheduler)

---

## 📁 Project Structure

