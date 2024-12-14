# Zigmatron Blog

This repository contains a full-stack blog application with a React.js frontend and a Node.js backend.

## Features

- **Frontend**:
  - Built with React.js and Vite for fast development.
  - Firebase integration for authentication
- **Backend**:
  - Node.js with Express for server-side logic.
  - MongoDB as the database for storing blog posts, users, and other data.
  - JWT (JSON Web Token) for secure authentication.

## Getting Started

### Prerequisites

- Node.js and npm/yarn installed on your machine.
- MongoDB instance (local or cloud-based).
- Firebase account for frontend integration.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <zigmatron-blog>
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   # Navigate to the frontend directory
   cd client
   npm install

   # Navigate to the backend directory
   cd ../server
   npm install
   ```

### Environment Variables

#### Frontend (React.js)

Create a `.env` file in the `client` directory with the following content:

```env
VITE_FIREBASE_API_KEY=<firebase_key>
```

#### Backend (Node.js)

Create a `.env` file in the `server` directory with the following content:

```env
MONGO_URL=<mongo db url>
JWT_SECRET=<jwt_secret>
```

Replace `<firebase_key>`, `<mongo db url>`, and `<jwt_secret>` with your actual credentials.

### Running the Application

#### Frontend

1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. The frontend will be available at `http://localhost:5173`.

#### Backend

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. The backend API will be available at `http://localhost:3000`.

### Project Structure

```
repository_name/
├── client/     # React.js frontend code
│   ├── src/
│   ├── public/
│   └── ...
├── server/     # Node.js backend code
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── ...
└── README.md
```

## Scripts

#### Frontend

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run preview`: Serves the production build locally.

#### Backend

- `npm start`: Starts the server.
- `npm run dev`: Starts the server with hot-reloading (if configured with nodemon).

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## Acknowledgments

- React.js and Vite for the frontend framework and tooling.
- Node.js and Express for the backend server.
- MongoDB for database management.
- Firebase for additional services and integrations.

