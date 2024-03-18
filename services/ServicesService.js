import { db } from '../config/firebase.js';
import ErrorHandler from '../utils/errorHandler.js';
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';

export async function createService(serviceData) {
    try {
        const docRef = await setDoc(doc(db, 'Services', serviceData?.id), serviceData, { merge: true });
        return docRef;
    } catch (error) {
        console.error('Error creating service: ', error);
        throw new ErrorHandler('Error creating service: ', 400);
    }
}

export async function getServiceById(serviceId) {
    try {
        const serviceDoc = await getDoc(doc(db, 'Services', serviceId));
        if (serviceDoc.exists()) {
            return serviceDoc.data();
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
        await updateDoc(doc(db, 'Services', serviceId), newData);
    } catch (error) {
        console.error('Error updating service: ', error);
        throw new ErrorHandler('Error updating service: ', 400);
    }
}

export async function deleteService(serviceId) {
    try {
        await deleteDoc(doc(db, 'Services', serviceId));
    } catch (error) {
        console.error('Error deleting service: ', error);
        throw new ErrorHandler('Error deleting service: ', 400);
    }
}

export async function getAllServices() {
    try {
        const serviceCollection = collection(db, 'Services');
        const serviceQuery = query(serviceCollection);
        const serviceSnapshot = await getDocs(serviceQuery);
        const services = [];

        serviceSnapshot.forEach((doc) => {
            services.push(doc.data());
        });

        return services;
    } catch (error) {
        console.error('Error getting all services: ', error);
        throw new ErrorHandler('Error getting all services: ', 400);
    }
}

export async function getAllActiveServices() {
    try {
        const serviceCollection = collection(db, 'Services');
        const serviceQuery = query(serviceCollection, where('isActive', '==', true));
        const serviceSnapshot = await getDocs(serviceQuery);
        const services = [];

        serviceSnapshot.forEach((doc) => {
            services.push(doc.data());
        });

        return services;
    } catch (error) {
        console.error('Error getting all active services: ', error);
        throw new ErrorHandler('Error getting all active services: ', 400);
    }
}

export async function filterServicesByCondition(condition, value) {
    try {
        const serviceCollection = collection(db, 'Services');
        const serviceQuery = query(serviceCollection, where(condition, '==', value));
        const serviceSnapshot = await getDocs(serviceQuery);
        const services = [];

        serviceSnapshot.forEach((doc) => {
            services.push(doc.data());
        });

        return services;
    } catch (error) {
        console.error('Error filtering services by condition: ', error);
        throw new ErrorHandler('Error filtering services by condition: ', 400);
    }
}
