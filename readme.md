<div align="center">
  <h1>Code-Blitz</h1>
  <em>Code-Blitz: Outcode or get outclassed</em>
  <br />
  <img src="https://img.shields.io/github/languages/top/jeet-dot-dev/CodeBlits?style=for-the-badge" />
  <img src="https://img.shields.io/github/last-commit/jeet-dot-dev/CodeBlits?style=for-the-badge" />
</div>

---

## 🧠 The Problem Code-Blitz Solves

Tired of coding alone in your dark room, wondering if your solution is actually good?  
Sick of boring LeetCode grinds that feel like homework?

> **Code-Blitz** brings the thrill of a competitive battleground to DSA. It's like **chess.com meets 1v1 LeetCode**, powered by AI!

---

## 👾 What Can You Use It For?

- Flex your code muscles in live 1v1 DSA battles.
- Make DSA practice for interviews feel like a game — not a chore.
- Get AI feedback on code quality, efficiency, and best practices.
- Earn ELO ratings, climb the leaderboard, and show who's boss.

---

## 🚀 Features

- ⚔️ **1v1 Coding Battles** with real-time multiplayer using **Socket.IO**
- 🤖 **AI-Powered Evaluation** – feedback based on readability, efficiency, and complexity
- 🎮 Custom Game Settings: choose topic (Array, Tree, etc.), difficulty, and number of questions
- 🏅 **Dynamic ELO Rating System** (like chess.com!)
- 📊 **Leaderboard** tracking wins, losses, and ELO
- 👨‍🏫 **Post-Battle Suggestions** from AI on how to improve
- 🖥️ Monaco Editor for code battles
- 💡 Built-in code starter templates for multiple languages

---

## 🏗️ Tech Stack

- **Frontend**: React.js, TailwindCSS, JavaScript, Vite, Zustand, GSAP, Monaco Editor + Piston API 
- **Backend**: Node.js, Express.js, MongoDB, Socket.IO, OpenAI API


---



## 🌐 Live Link

👉 **https://code-blitz-ils2dcerh-jeet-mandals-projects.vercel.app/**



## 🧩 Project Structure

```sh
└── CodeBlits/
    ├── backend
    │   ├── controllers
    │   │   └── userController.js
    │   ├── db
    │   │   └── db.js
    │   ├── index.js
    │   ├── middlewares
    │   │   └── authMiddleware.js
    │   ├── models
    │   │   └── userSchems.js
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── routes
    │   │   └── userRoute.js
    │   └── sockets
    │       ├── ai
    │       │   ├── analyze.js
    │       │   └── openai.js
    │       ├── controllers
    │       │   ├── codeSubmitHandler.js
    │       │   ├── gameStart.js
    │       │   ├── joinRoom.js
    │       │   ├── roomCreated.js
    │       │   └── roomJoined.js
    │       ├── handler
    │       │   └── handlers.js
    │       ├── index.js
    │       ├── middlewares
    │       │   └── socketAuth.js
    │       └── store
    │           └── roomStore.js
    ├── frontend
    │   ├── .gitignore
    │   ├── README.md
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── postcss.config.js
    │   ├── public
    │   │   └── vite.svg
    │   ├── src
    │   │   ├── App.css
    │   │   ├── App.jsx
    │   │   ├── SocketContext.js
    │   │   ├── assets
    │   │   │   └── react.svg
    │   │   ├── components
    │   │   │   ├── Dropdown.jsx
    │   │   │   ├── Editor.jsx
    │   │   │   ├── GameTimer.jsx
    │   │   │   ├── Header.jsx
    │   │   │   ├── LoadingAnimation.jsx
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── QuestionScetion.jsx
    │   │   │   └── ui
    │   │   │       └── floating-navbar.jsx
    │   │   ├── constant.js
    │   │   ├── hooks
    │   │   │   └── fetchdata.jsx
    │   │   ├── index.css
    │   │   ├── lib
    │   │   │   └── utils.js
    │   │   ├── main.jsx
    │   │   ├── pages
    │   │   │   ├── BattlePage.jsx
    │   │   │   ├── Home.jsx
    │   │   │   ├── Login.jsx
    │   │   │   ├── Profile.jsx
    │   │   │   ├── ResWait.jsx
    │   │   │   ├── Result.jsx
    │   │   │   ├── RoomCreate.jsx
    │   │   │   └── Waiting.jsx
    │   │   ├── store
    │   │   │   └── roomStore.js
    │   │   └── utils
    │   │       └── ProtectRoute.jsx
    │   ├── tailwind.config.js
    │   └── vite.config.js
    ├── readme.md
    └── todo.md


# Clone the repository
git clone https://github.com/jeet-dot-dev/CodeBlits

# Set up the backend
cd CodeBlits/backend
npm install
node index.js

# In a new terminal tab, set up the frontend
cd ../frontend
npm install
npm run dev




