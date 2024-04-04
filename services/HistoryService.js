import { db } from '../config/firebase.js';
import convertTimestamp from '../utils/convertTimestamp.js';
import ErrorHandler from '../utils/errorHandler.js';
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
    orderBy,
} from 'firebase/firestore';

// History
export async function getHistoryByUser(userId) {
    try {
        const history = [];

        const querySnapshot = await getDocs(
            query(collection(db, 'Receipt'), where('customer', '==', userId), orderBy('createdAt', 'desc')),
        );

        querySnapshot.forEach((doc) => {
            const receiptData = doc.data();
            const receiptDate = receiptData.createdAt.toDate();

            const monthYear = `${receiptDate.getMonth() + 1}/${receiptDate.getFullYear()}`;

            const existingMonthYearIndex = history.findIndex((item) => item.date === monthYear);

            const newData = convertTimestamp(receiptData);

            if (existingMonthYearIndex === -1) {
                history.push({
                    date: monthYear,
                    receipts: [newData],
                });
            } else {
                history[existingMonthYearIndex].receipts.push(newData);
            }
        });

        return history;
    } catch (error) {
        console.error('Error getting history by userId: ', error);
        throw new ErrorHandler('Error getting history by userId: ', 400);
    }
}
