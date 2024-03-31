export default class Point {
    constructor(id, point, customer, createdAt, modified, isActive) {
        this.id = id;
        this.point = point;
        this.customer = customer;
        this.createdAt = createdAt;
        this.modified = modified;
        this.isActive = isActive;
    }

    static servicesFromFirestore(doc) {
        const data = doc.data();
        return new Services(doc.id, data.point, data.customer, data.createdAt, data.modified, data.isActive);
    }
}
