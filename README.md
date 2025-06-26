# 🎵 Chatify – MERN Stack Music & Chat App

Chatify is a full-featured **music streaming and chat application** built with the **MERN stack** (MongoDB, Express, React, Node.js).

It allows users to **listen to songs, explore albums, and chat with others in real time**. Chatify is equipped with **user authentication**, **admin-only pages**, and functionality to **upload songs and albums** via an admin dashboard.

Uses **Socket.IO** for real-time communication features.

## 🚀 Features

- 👨‍💼 **User Roles:** Stream individual songs or entire albums seamlessly
- 📀 **Play Albums:** Enjoy full albums with continuous playback.
- ⏭️ **Play Next/Previous:** Navigate through songs with next/prev controls.
- 💬 **Real-time Chat:** Chat with other users while listening to music. *(Powered by Socket.IO)*
- 🧑‍🤝‍🧑 **User Presence:** See who is online or offline in real time. *(Uses Socket.IO for live presence updates)*
- 👀 **User Activity Feed:** View what others are listening to or doing on the platform. *(Real-time updates via Socket.IO)*
- 📤 **Admin Uploads:** Admins can upload new songs and albums through a dedicated dashboard.

## 🛠️ Tech Stack

- **Frontend:** React  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** Express  
- **Real-time Communication:** Socket.IO  
- **State Management:** Zustand  

---
## 📦 Setup Instructions

### 🔁 Clone the Repository

1. Clone this repository to your local machine
   
        git clone https://github.com/AshutoshChoudhary2004/CHATIFY.git
        (cd CHATIFY)

---

### 🛠️ Backend Setup

2. Install backend dependencies
   
         cd backend
         npm install

3.  Create a `.env` file and add your environment variables  

4. Start the backend server
   
         npm run dev

---

### 💻 Frontend Setup

5. Install frontend dependencies
   
         cd ../frontend
         npm install

6. Create a `.env.local` file and configure the environment variables  

7. Start the frontend application
   
         npm run dev

---
