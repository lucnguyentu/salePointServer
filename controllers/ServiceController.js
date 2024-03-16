import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import { createService } from '../models/Services.js';

// Create new Order
export const newService = catchAsyncErrors(async (req, res, next) => {
    const { name, price, createdAt, updatedAt, isDelete } = req.body;

    const serviceData = {
        id,
        name,
        price,
        createdAt,
        updatedAt,
        isDelete,
    };

    const order = await createService(serviceData);

    res.status(201).json({
        success: true,
        order,
    });
});
