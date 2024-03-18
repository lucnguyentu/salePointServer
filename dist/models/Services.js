"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicesFromFirestore = void 0;
function servicesFromFirestore(doc) {
    const data = doc.data();
    return {
        id: doc.id,
        name: data.name,
        price: data.price,
        createdAt: data.createdAt,
        modified: data.modified,
        isActive: data.isActive
    };
}
exports.servicesFromFirestore = servicesFromFirestore;
