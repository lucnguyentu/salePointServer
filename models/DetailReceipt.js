export default class DetailReceipt {
    constructor(id, receiptId, serviceId, serviceInfoId, price, createdAt, modified, isActive) {
        this.id = id;
        this.receiptId = receiptId;
        this.serviceId = serviceId;
        this.serviceInfoId = serviceInfoId;
        this.price = price;
        this.createdAt = createdAt;
        this.modified = modified;
        this.isActive = isActive;
    }

    static servicesFromFirestore(doc) {
        const data = doc.data();
        return new Services(
            doc.id,
            data.receiptId,
            data.serviceId,
            data.serviceInfoId,
            data.price,
            data.createdAt,
            data.modified,
            data.isActive,
        );
    }
}
