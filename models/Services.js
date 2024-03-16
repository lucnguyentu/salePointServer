import firebase from 'firebase/app';
import 'firebase/firestore';
import ErrorHandler from '../utils/errorHandler';

const db = firebase.firestore();

export async function createService(serviceData) {
    try {
        const docRef = await db.collection('Services').add(serviceData);
        return docRef.id;
    } catch (error) {
        console.error('Error creating service: ', error);
        throw new ErrorHandler('Error creating service: ', 400);
    }
}

export async function getServiceById(serviceId) {
    try {
        const serviceSnapshot = await db.collection('Services').doc(serviceId).get();
        if (serviceSnapshot.exists) {
            return serviceSnapshot.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error getting service by id: ', error);
        throw new ErrorHandler('Error getting service by id: ', 400);
    }
}

export async function updateService(serviceId, newData) {
    try {
        await db.collection('Services').doc(serviceId).update(newData);
    } catch (error) {
        console.error('Error updating service: ', error);
        throw new ErrorHandler('Error updating service: ', 400);
    }
}

export async function deleteService(serviceId) {
    try {
        await db.collection('Services').doc(serviceId).delete();
    } catch (error) {
        console.error('Error deleting service: ', error);
        throw new ErrorHandler('Error deleting service: ', 400);
    }
}
