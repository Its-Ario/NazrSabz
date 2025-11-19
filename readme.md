<div align="center">
  <h1>NazrSabz 🌱</h1>
  <strong>Recycling & Waste Collection Platform</strong>
</div>

<br/>

<div align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/status-active-brightgreen.svg" alt="Project Status">
  <img src="https://img.shields.io/github/issues/Its-Ario/NazrSabz" alt="GitHub issues">
  <img src="https://img.shields.io/github/stars/Its-Ario/NazrSabz" alt="GitHub stars">
</div>

## ♻️ Introduction

**NazrSabz** is a modern web application that connects citizens and collectors to make **recycling and waste collection** easier, faster, and more sustainable.

This repository contains the **full source code** for the project.  

---

## ✨ Core Features

- 🔐 **Secure Authentication** — Safe, stateless sessions powered by **JWT**.
- 🗑️ **Smart Collection Requests** — Citizens can easily create, view, and track their waste pickup requests.
- 🚛 **Collector Dashboard** — Real-time management interface for collectors to handle assigned pickups.
- 💰 **Wallet & Transactions** — Integrated reward system for eco-friendly actions, managed via **Prisma** and **PostgreSQL**.
- 🗺️ **Live Map Integration** — Real-time user and collector tracking using **Leaflet.js** and **Yjs** for peer-to-peer sync.
- 🧩 **Modular Frontend** — A modern UI built with **Native Web Components**, styled with **TailwindCSS**, and bundled using **Vite**.

---

## 🛠️ Tech Stack

- **Frontend**: Native Web Components, [Vite](https://vitejs.dev/), [Leaflet.js](https://leafletjs.com/), [Yjs](https://docs.yjs.dev/)
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [Prisma ORM](https://www.prisma.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Authentication**: JSON Web Tokens (JWT)

---

## 🚀 Getting Started

Follow these steps to set up **NazrSabz** locally.

### Prerequisites

- **Node.js**: v18 or higher  
- **PostgreSQL**: v14 or higher  
- **pnpm**: v8 or higher (recommended package manager)

---

### Installation & Setup

1. **Clone the Repository**

    ```bash
    git clone https://github.com/Its-Ario/NazrSabz.git
    cd NazrSabz
    ```

2. **Install Dependencies**

    The project uses `pnpm` workspaces for managing frontend and backend packages:

    ```bash
    pnpm install
    ```

3. **Setup the Database**

    Copy the `.env.example` file to `.env` and update your database credentials:

    ```bash
    cp backend/.env.example backend/.env
    ```

    Then apply database migrations:

    ```bash
    cd backend
    pnpm exec prisma migrate dev
    pnpm exec prisma generate
    ```

4. **Run the Development Servers**

    You’ll need **two terminals**:

    *Terminal 1: Backend*

    ```bash
    pnpm -w run dev:backend
    ```

    *Terminal 2: Frontend*

    ```bash
    pnpm -w run dev:frontend
    ```

Open your browser at the address shown by Vite (usually `http://localhost:5173`).

---

## 🤝 Contributing

Contributions are welcome!  
If you’d like to report bugs, suggest features, or submit pull requests, please check out our [**contribution guidelines**](CONTRIBUTING.md).

See the [GitHub Issues](https://github.com/Its-Ario/NazrSabz/issues) page for open tasks and discussions.

---

## 📜 License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.
