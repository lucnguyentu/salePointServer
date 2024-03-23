export default class Car {
    constructor(
        id,
        name,
        car_company,
        block_division,
        license_plate,
        speedometer,
        number_of_oil_changes,
        user,
        isActive,
        createdAt,
        modified,
    ) {
        this.id = id;
        this.name = name;
        this.car_company = car_company;
        this.block_division = block_division;
        this.license_plate = license_plate;
        this.speedometer = speedometer;
        this.number_of_oil_changes = number_of_oil_changes;
        this.user = user;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.modified = modified;
    }

    static servicesFromFirestore(doc) {
        const data = doc.data();
        return new Services(
            doc.id,
            data.name,
            data.car_company,
            data.block_division,
            data.license_plate,
            data.speedometer,
            data.number_of_oil_changes,
            data.user,
            data.isActive,
            data.createdAt,
            data.modified,
        );
    }
}
