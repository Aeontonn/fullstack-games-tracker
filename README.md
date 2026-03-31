# Fullstack Games Tracker 🎮

A complete Fullstack CRUD application built to track and manage a personal video game library. This project demonstrates the integration of a modern frontend, a robust backend API, database management, and automated End-to-End (E2E) testing.

## 🛠️ Tech Stack

- **Frontend:** React (Bootstrapped with Vite)
- **Backend:** Python, FastAPI
- **Database:** SQLite (managed via SQLAlchemy ORM)
- **Data Validation:** Pydantic
- **Testing:** Cypress (E2E)

## 🚀 Features

- **Create:** Add new games with details like title, genre, release year, and personal rating.
- **Read:** View the entire library dynamically fetched from the database.
- **Update:** Toggle the completion status of a game with a single click.
- **Delete:** Remove games from the library.
- **Responsive UI:** Clean, modern interface with interactive elements and status indicators.

## 💻 How to Run the Project locally

To run this project, you will need to start both the backend server and the frontend development server in two separate terminal instances.

### Prerequisites

- Python 3.8+
- Node.js (LTS version)

### 1. Start the Backend (FastAPI)

Open a terminal, navigate to the `backend` folder, and set up the Python environment:

`bash
cd backend

# Create a virtual environment (if you haven't already)

python -m venv venv

# Activate the virtual environment

# On Windows:

source venv/Scripts/activate

# On Mac/Linux:

source venv/bin/activate

# Install dependencies

pip install fastapi uvicorn sqlalchemy pydantic

# Start the server

uvicorn app:app --reload
`The backend API will be running at`http://localhost:8000`. You can view the interactive API documentation (Swagger UI) at `http://localhost:8000/docs`.

### 2. Start the Frontend (React)

Open a _new_ terminal tab, navigate to the `frontend` folder, and start the Vite server:

`bash
cd frontend

# Install node modules (first time only)

npm install

# Start the development server

npm run dev
`The React application will be accessible in your browser at`http://localhost:5173`.

---

## 🧪 Running Automated Tests

This project includes automated End-to-End testing using Cypress to verify the core CRUD functionality.

With both the backend and frontend servers running, open a third terminal instance:
`bash
cd frontend
npx cypress open
`
Select **E2E Testing** and choose your preferred browser to run the test suite (`home.cy.js`).
