class Services {
    constructor(id, name, price, createdAt, modified, isActive) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.createdAt = createdAt;
        this.modified = modified;
        this.isActive = isActive;
    }

    static servicesFromFirestore(doc) {
        const data = doc.data();
        return new Services(doc.id, data.name, data.price, data.createdAt, data.modified, data.isActive);
    }
}

module.exports = Services;
