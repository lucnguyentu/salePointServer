import { db } from '../config/firebase.js';
import ErrorHandler from '../utils/errorHandler.js';
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';

export async function createCarInfo(carInfoData) {
    try {
        const docRef = await setDoc(doc(db, 'CarInfo', carInfoData?.id), carInfoData, { merge: true });
        return docRef;
    } catch (error) {
        console.error('Error creating CarInfo: ', error);
        throw new ErrorHandler('Error creating CarInfo: ', 400);
    }
}

export async function getCarInfoById(CarInfoId) {
    try {
        const CarInfoDoc = await getDoc(doc(db, 'CarInfo', CarInfoId));
        if (CarInfoDoc.exists()) {
            return CarInfoDoc.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error getting CarInfo by id: ', error);
        throw new ErrorHandler('Error getting CarInfo by id: ', 400);
    }
}

export async function updateCarInfo(CarInfoId, newData) {
    try {
        await updateDoc(doc(db, 'CarInfo', CarInfoId), newData);
    } catch (error) {
        console.error('Error updating CarInfo: ', error);
        throw new ErrorHandler('Error updating CarInfo: ', 400);
    }
}

export async function deleteCarInfo(CarInfoId) {
    try {
        await deleteDoc(doc(db, 'CarInfo', CarInfoId));
    } catch (error) {
        console.error('Error deleting CarInfo: ', error);
        throw new ErrorHandler('Error deleting CarInfo: ', 400);
    }
}

export async function getAllCarInfo() {
    try {
        const CarInfoCollection = collection(db, 'CarInfo');
        const CarInfoQuery = query(CarInfoCollection);
        const CarInfonapshot = await getDocs(CarInfoQuery);
        const CarInfo = [];

        CarInfonapshot.forEach((doc) => {
            CarInfo.push(doc.data());
        });

        return CarInfo;
    } catch (error) {
        console.error('Error getting all CarInfo: ', error);
        throw new ErrorHandler('Error getting all CarInfo: ', 400);
    }
}

export async function getAllActiveCarInfo() {
    try {
        const CarInfoCollection = collection(db, 'CarInfo');
        const CarInfoQuery = query(CarInfoCollection, where('isActive', '==', true));
        const CarInfonapshot = await getDocs(CarInfoQuery);
        const CarInfo = [];

        CarInfonapshot.forEach((doc) => {
            CarInfo.push(doc.data());
        });

        console.log(CarInfonapshot);

        return CarInfo;
    } catch (error) {
        console.error('Error getting all active CarInfo: ', error);
        throw new ErrorHandler('Error getting all active CarInfo: ', 400);
    }
}

export async function filterCarInfoByCondition(condition, value) {
    try {
        const CarInfoCollection = collection(db, 'CarInfo');
        const CarInfoQuery = query(CarInfoCollection, where(condition, '==', value));
        const CarInfonapshot = await getDocs(CarInfoQuery);
        const CarInfo = [];

        CarInfonapshot.forEach((doc) => {
            CarInfo.push(doc.data());
        });

        return CarInfo;
    } catch (error) {
        console.error('Error filtering CarInfo by condition: ', error);
        throw new ErrorHandler('Error filtering CarInfo by condition: ', 400);
    }
}