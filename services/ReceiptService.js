import { db } from '../config/firebase.js';
import convertTimestamp from '../utils/convertTimestamp.js';
import ErrorHandler from '../utils/errorHandler.js';
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';

export async function createReceipt(ReceiptData) {
    try {
        const docRef = await setDoc(doc(db, 'Receipt', ReceiptData?.id), ReceiptData, { merge: true });
        return docRef;
    } catch (error) {
        console.error('Error creating Receipt: ', error);
        throw new ErrorHandler('Error creating Receipt: ', 400);
    }
}

export async function getReceiptById(ReceiptId) {
    try {
        const ReceiptDoc = await getDoc(doc(db, 'Receipt', ReceiptId));
        if (ReceiptDoc.exists()) {
            const ReceiptData = ReceiptDoc.data();
            return convertTimestamp(ReceiptData);
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error getting Receipt by id: ', error);
        throw new ErrorHandler('Error getting Receipt by id: ', 400);
    }
}

export async function updateReceipt(ReceiptId, newData) {
    try {
        await updateDoc(doc(db, 'Receipt', ReceiptId), newData);
    } catch (error) {
        console.error('Error updating Receipt: ', error);
        throw new ErrorHandler('Error updating Receipt: ', 400);
    }
}

export async function deleteReceipt(ReceiptId) {
    try {
        await deleteDoc(doc(db, 'Receipt', ReceiptId));
    } catch (error) {
        console.error('Error deleting Receipt: ', error);
        throw new ErrorHandler('Error deleting Receipt: ', 400);
    }
}

export async function getAllReceipt() {
    try {
        const ReceiptCollection = collection(db, 'Receipt');
        const ReceiptQuery = query(ReceiptCollection);
        const Receiptnapshot = await getDocs(ReceiptQuery);
        const Receipt = [];

        Receiptnapshot.forEach((doc) => {
            const ReceiptData = convertTimestamp(doc.data());
            Receipt.push(ReceiptData);
        });

        return Receipt;
    } catch (error) {
        console.error('Error getting all Receipt: ', error);
        throw new ErrorHandler('Error getting all Receipt: ', 400);
    }
}

export async function getAllActiveReceipt() {
    try {
        const ReceiptCollection = collection(db, 'Receipt');
        const ReceiptQuery = query(ReceiptCollection, where('isActive', '==', true));
        const Receiptnapshot = await getDocs(ReceiptQuery);
        const Receipt = [];

        Receiptnapshot.forEach((doc) => {
            const ReceiptData = convertTimestamp(doc.data());
            Receipt.push(ReceiptData);
        });

        return Receipt;
    } catch (error) {
        console.error('Error getting all active Receipt: ', error);
        throw new ErrorHandler('Error getting all active Receipt: ', 400);
    }
}

export async function filterReceiptByCondition(condition, value) {
    try {
        const ReceiptCollection = collection(db, 'Receipt');
        const ReceiptQuery = query(ReceiptCollection, where(condition, '==', value));
        const Receiptnapshot = await getDocs(ReceiptQuery);
        const Receipt = [];

        Receiptnapshot.forEach((doc) => {
            const ReceiptData = convertTimestamp(doc.data());
            Receipt.push(ReceiptData);
        });

        return Receipt;
    } catch (error) {
        console.error('Error filtering Receipt by condition: ', error);
        throw new ErrorHandler('Error filtering Receipt by condition: ', 400);
    }
}

export async function getCarsBelongToUser(id = '0') {
    try {
        const ReceiptCollection = collection(db, 'Receipt');
        const ReceiptQuery = query(ReceiptCollection, where('user', '==', id));
        const Receiptnapshot = await getDocs(ReceiptQuery);
        const Receipt = [];

        Receiptnapshot.forEach((doc) => {
            const ReceiptData = convertTimestamp(doc.data());
            Receipt.push(ReceiptData);
        });

        return Receipt;
    } catch (error) {
        console.error('Error getting all Receipt: ', error);
        throw new ErrorHandler('Error getting all Receipt: ', 400);
    }
}
