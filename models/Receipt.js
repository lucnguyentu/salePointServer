export default class Receipt {
    constructor(
        id,
        totalPrice,
        totalQuantity,
        paymentMethod,
        customer,
        car_id,
        detailReceipt,
        createdAt,
        modified,
        isActive,
    ) {
        this.id = id;
        this.totalPrice = totalPrice;
        this.totalQuantity = totalQuantity;
        this.paymentMethod = paymentMethod;
        this.customer = customer;
        this.car_id = car_id;
        this.detailReceipt = detailReceipt;
        this.createdAt = createdAt;
        this.modified = modified;
        this.isActive = isActive;
    }

    static servicesFromFirestore(doc) {
        const data = doc.data();
        return new Services(
            doc.id,
            data.totalPrice,
            data.totalQuantity,
            data.paymentMethod,
            data.customer,
            data.car_id,
            data.detailReceipt,
            data.createdAt,
            data.modified,
            data.isActive,
        );
    }
}
