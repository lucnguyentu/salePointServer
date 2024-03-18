import app from './app.js';
import dotenv from 'dotenv';
import { innitializeFirebaseApp } from './config/firebase.js';

dotenv.config();

// Handling Uncaught Exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

const port = process.env.PORT || 3000;

// Connecting to database
innitializeFirebaseApp();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${port}`);
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});
