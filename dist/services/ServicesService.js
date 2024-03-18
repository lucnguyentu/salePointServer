"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterServicesByCondition = exports.getAllServices = exports.deleteService = exports.updateService = exports.getServiceById = exports.createService = void 0;
const firebase_js_1 = require("../config/firebase.js");
const errorHandler_js_1 = require("../utils/errorHandler.js");
const firestore_1 = require("firebase/firestore");
function createService(serviceData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docRef = yield (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_js_1.db, 'Services', serviceData === null || serviceData === void 0 ? void 0 : serviceData.id), serviceData, { merge: true });
            return docRef;
        }
        catch (error) {
            console.error('Error creating service: ', error);
            throw new errorHandler_js_1.default('Error creating service: ', 400);
        }
    });
}
exports.createService = createService;
function getServiceById(serviceId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const serviceDoc = yield (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_js_1.db, 'Services', serviceId));
            if (serviceDoc.exists()) {
                return serviceDoc.data();
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error('Error getting service by id: ', error);
            throw new errorHandler_js_1.default('Error getting service by id: ', 400);
        }
    });
}
exports.getServiceById = getServiceById;
function updateService(serviceId, newData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(firebase_js_1.db, 'Services', serviceId), newData);
        }
        catch (error) {
            console.error('Error updating service: ', error);
            throw new errorHandler_js_1.default('Error updating service: ', 400);
        }
    });
}
exports.updateService = updateService;
function deleteService(serviceId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_js_1.db, 'Services', serviceId));
        }
        catch (error) {
            console.error('Error deleting service: ', error);
            throw new errorHandler_js_1.default('Error deleting service: ', 400);
        }
    });
}
exports.deleteService = deleteService;
function getAllServices() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const serviceCollection = (0, firestore_1.collection)(firebase_js_1.db, 'Services');
            const serviceQuery = (0, firestore_1.query)(serviceCollection);
            const serviceSnapshot = yield (0, firestore_1.getDocs)(serviceQuery);
            const services = [];
            serviceSnapshot.forEach((doc) => {
                services.push(doc.data());
            });
            return services;
        }
        catch (error) {
            console.error('Error getting all services: ', error);
            throw new errorHandler_js_1.default('Error getting all services: ', 400);
        }
    });
}
exports.getAllServices = getAllServices;
function filterServicesByCondition(condition, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const serviceCollection = (0, firestore_1.collection)(firebase_js_1.db, 'Services');
            const serviceQuery = (0, firestore_1.query)(serviceCollection, (0, firestore_1.where)(condition, '==', value));
            const serviceSnapshot = yield (0, firestore_1.getDocs)(serviceQuery);
            const services = [];
            serviceSnapshot.forEach((doc) => {
                services.push(doc.data());
            });
            return services;
        }
        catch (error) {
            console.error('Error filtering services by condition: ', error);
            throw new errorHandler_js_1.default('Error filtering services by condition: ', 400);
        }
    });
}
exports.filterServicesByCondition = filterServicesByCondition;
