import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import ErrorHandler from '../utils/errorHandler.js';
import dotenv from 'dotenv';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

dotenv.config();

const {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGE_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
};

let app;
let fireStoreDb;

const innitializeFirebaseApp = () => {
    try {
        app = initializeApp(firebaseConfig);
        fireStoreDb = getFirestore();
        return app;
    } catch (error) {
        return new ErrorHandler(`connect to db failed, error: ${error.message}`, 404);
    }
};

export const uploadProcessData = async () => {
    const dataUpload = {
        key1: 'test',
        key2: 123,
        key3: new Date(),
    };

    try {
        const document = doc(fireStoreDb, 'receipt', 'unique_id');
        let dataCreated = await setDoc(document, dataUpload);
        return dataCreated;
    } catch (error) {
        return new ErrorHandler(`connect to db failed, error: ${error.message}`, 404);
    }
};

innitializeFirebaseApp();

const getFirebaseApp = () => app;

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { innitializeFirebaseApp, getFirebaseApp, fireStoreDb, db, auth, provider };
