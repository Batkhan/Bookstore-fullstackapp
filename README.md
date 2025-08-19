Bookstore MERN Application

A full-stack Bookstore Management System built with the MERN stack (MongoDB, Express, React, Node.js). The app allows users to browse, add, edit, and manage books with authentication and role-based access.

Features

1. User Authentication (Register, Login, Logout)

2. Book Management

- Add new books

- Edit existing books

- Delete books

1. Genres & Categories support

2. Role-based Access (Admin can add/edit, normal users can view)

3. Responsive UI built with React + Tailwind CSS

4. REST API backend with Express & MongoDB

Tech Stack

Frontend: React, React Router, Context API, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ODM)
Authentication: JWT (JSON Web Token)

 Project Structure
Bookstore/
│── backend/                # Express backend
│   ├── Models/             # MongoDB models
│   ├── app.js              # Express app entry
│   └── package.json
│
│── frontend/               # React frontend
│   ├── src/
│   │   ├── Pages/          # React pages (Home, Login, Register, AddBook, etc.)
│   │   ├── AuthContext.jsx # Authentication context
│   │   ├── App.js          # Routes & layout
│   │   └── index.css
│   ├── tailwind.config.js  # Tailwind setup
│   └── package.json
│
└── README.md

⚙️ Installation & Setup

Clone the repo:

git clone https://github.com/your-username/bookstore.git
cd bookstore

Backend Setup
cd bookstore
nodemon


Backend will run on: http://localhost:5000/

Frontend Setup
cd frontend
npm install
npm start


Frontend will run on: http://localhost:3000/

 Screenshots

 Home page

<img width="1895" height="855" alt="Screenshot 2025-08-19 134604" src="https://github.com/user-attachments/assets/03553079-43fb-448d-b38c-755d22dbc9ab" />

<img width="1602" height="855" alt="Screenshot 2025-08-19 134618" src="https://github.com/user-attachments/assets/c7673d6f-22df-4ac1-a676-fb9241bdbc59" />

Login page

<img width="1919" height="859" alt="Screenshot 2025-08-19 134632" src="https://github.com/user-attachments/assets/c3195f5c-a67b-48d9-a3ed-c4d63ae1c131" />

Register page

<img width="1919" height="859" alt="Screenshot 2025-08-19 134658" src="https://github.com/user-attachments/assets/b3b3412c-c0a8-4e2e-8418-c11f662f141d" />



 Future Improvements


Image upload for book covers

Deployment with CI/CD (Vercel + Render)

Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
