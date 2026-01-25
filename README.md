# AIConvIK 🤖💬

AIConvIK is a MERN-based AI chat application that allows users to communicate with an AI model through a clean and user-friendly interface.

---

## 🔗 Live Demo

👉 Deployed Link:  
https://aiconvik-frontend.onrender.com/

---

## 🧠 AI Model Used

- **ChatGPT 4o-mini**
- Used for generating AI responses in real time
- Lightweight, fast, and cost-efficient model

---

## 🚀 Features

- 💬 Real-time AI chat interface  
- 🔐 Secure backend with environment variables  
- 🌐 REST API based communication  
- 🧩 Clean project structure (frontend & backend separated)

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML & CSS

### Backend
- Node.js
- Express.js
- OpenAI API
- MongoDB 

---

## 📁 Project Structure

AIConvIK/
│
├── frontend/ # React frontend
│
├── backend/ # Node + Express backend
│ ├── routes/
│ ├── models/
| ├── utils/ # OpenAI setup
│ ├── .env # Environment variables (ignored in git)
│
├── .gitignore
└── README.md


---

## ⚙️ How It Works (Simple Explanation)

1. User types a message in the frontend chat UI  
2. Frontend sends the message to backend API  
3. Backend sends the prompt to OpenAI (ChatGPT 4o-mini)  
4. AI generates a response  
5. Response is sent back and shown to the user  

---
