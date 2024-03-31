import { db } from '../config/firebase.js';
import convertTimestamp from '../utils/convertTimestamp.js';
import ErrorHandler from '../utils/errorHandler.js';
import { v4 as uuidv4 } from 'uuid';
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
    limit,
} from 'firebase/firestore';

export async function createReceipt(ReceiptData) {
    try {
        let pointDoc;
        const querySnapshot = await getDocs(
            query(collection(db, 'Point'), where('customer', '==', ReceiptData.customer), limit(1)),
        );
        let currentExchangePoints = ReceiptData.totalPrice / 1000;

        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                pointDoc = doc.data();
            });

            let newPoint = 0;
            if (ReceiptData.exchange_points) {
                if (pointDoc.point < ReceiptData.exchange_points) {
                    throw new ErrorHandler('Error over echange points: ', 400);
                }
                newPoint = pointDoc.point - ReceiptData.exchange_points + currentExchangePoints;
            } else {
                newPoint = pointDoc.point + currentExchangePoints;
            }
            await updateDoc(doc(db, 'Point', pointDoc.id), { point: newPoint });
        } else {
            const point = currentExchangePoints;
            const pointId = uuidv4();

            const pointData = {
                id: pointId,
                point,
                customer: ReceiptData.customer,
                createdAt: ReceiptData.createdAt,
                modified: ReceiptData.modified,
                isActive: true,
            };

            await setDoc(doc(db, 'Point', pointData?.id), pointData, { merge: true });
        }

        const newTotalPrice = ReceiptData.exchange_points
            ? ReceiptData.totalPrice - ReceiptData.exchange_points
            : ReceiptData.totalPrice;
        ReceiptData.totalPrice = newTotalPrice;

        const docRef = await setDoc(doc(db, 'Receipt', ReceiptData?.id), ReceiptData, { merge: false });
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

// Point
export async function getPointByUserId(userId) {
    try {
        let pointDoc;
        const querySnapshot = await getDocs(query(collection(db, 'Point'), where('customer', '==', userId), limit(1)));

        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                pointDoc = doc.data();
            });

            return convertTimestamp(pointDoc);
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error getting Point by userId: ', error);
        throw new ErrorHandler('Error getting Point by userId: ', 400);
    }
}

export async function getAllPoints() {
    try {
        const PointCollection = collection(db, 'Point');
        const PointQuery = query(PointCollection);
        const Pointnapshot = await getDocs(PointQuery);
        const Point = [];

        Pointnapshot.forEach((doc) => {
            const PointData = convertTimestamp(doc.data());
            Point.push(PointData);
        });

        return Point;
    } catch (error) {
        console.error('Error getting all Point: ', error);
        throw new ErrorHandler('Error getting all Point: ', 400);
    }
}
