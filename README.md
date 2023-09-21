# React and .NET Core Starter Kit coach-ticket-booking

This repository contains a full-stack web application coach-ticket-booking with a React frontend and a .NET Core backend.
## Features

- **React Frontend**:
  - Modern and responsive user interface.
  - Redux for state management.
  - Axios for handling HTTP requests.
  - React Router for client-side routing.
  - Easily customizable components and styling.

- **.NET Core Backend**:
  - RESTful API endpoints.
  - Entity Framework for database operations.
  - Authentication and authorization using JWT tokens.
  - Example CRUD operations with models and controllers.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js and npm (for the React frontend).
- .NET Core SDK (for the backend).
- SQL Server or another preferred database.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git

Frontend Setup:
  ```bash
  cd frontend
  npm install
  npm start
Backend Setup:
  cd backend
  dotnet restore
  dotnet ef database update
  dotnet run

  
Access the application:
Frontend (home): http://localhost:3000 
Frontend (admin): http://localhost:8000 
Backend (api): http://localhost:5000
