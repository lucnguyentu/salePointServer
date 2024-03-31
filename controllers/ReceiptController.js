import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import { v4 as uuidv4 } from 'uuid';
import {
    createReceipt,
    filterReceiptByCondition,
    getAllActiveReceipt,
    getAllReceipt,
    getReceiptById,
    getCarsBelongToUser,
    updateReceipt,
    getPointByUserId,
} from '../services/ReceiptService.js';
import Receipt from '../models/Receipt.js';

export const newReceiptController = catchAsyncErrors(async (req, res, next) => {
    const {
        totalPrice,
        totalQuantity,
        paymentMethod,
        customer,
        car_id,
        detailReceipt = [],
        exchange_points = 0,
    } = req.body;

    const id = uuidv4();
    const createdAt = new Date();
    const modified = new Date();
    const isActive = true;

    const ReceiptData = {
        id,
        totalPrice,
        totalQuantity,
        paymentMethod,
        customer,
        car_id,
        detailReceipt,
        exchange_points,
        createdAt,
        modified,
        isActive,
    };

    const Receipt = await createReceipt(ReceiptData);

    res.status(201).json({
        success: true,
        Receipt,
    });
});

export const getReceiptByIdController = catchAsyncErrors(async (req, res, next) => {
    const ReceiptId = req.params.ReceiptId;

    const Receipt = await getReceiptById(ReceiptId);

    if (Receipt) {
        res.status(200).json({
            success: true,
            Receipt,
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Receipt not found',
        });
    }
});

export const updateReceiptController = catchAsyncErrors(async (req, res, next) => {
    const ReceiptId = req.params.ReceiptId;
    const newData = req.body;

    newData.modified = new Date();

    await updateReceipt(ReceiptId, newData);

    res.status(200).json({
        success: true,
        message: 'Receipt updated successfully',
    });
});

export const deleteReceiptController = catchAsyncErrors(async (req, res, next) => {
    const ReceiptId = req.params.ReceiptId;

    await updateReceipt(ReceiptId, { isActive: false });

    res.status(200).json({
        success: true,
        message: 'Receipt deleted successfully',
    });
});

export const getAllReceiptController = catchAsyncErrors(async (req, res, next) => {
    const Receipt = await getAllActiveReceipt();

    res.status(200).json({
        success: true,
        Receipt,
    });
});

export const getAllReceiptForManagerController = catchAsyncErrors(async (req, res, next) => {
    const Receipt = await getAllReceipt();

    res.status(200).json({
        success: true,
        Receipt,
    });
});

export const filterReceiptByConditionController = catchAsyncErrors(async (req, res, next) => {
    const { condition, value } = req.body;

    const filteredReceipt = await filterReceiptByCondition(condition, value);

    res.status(200).json({
        success: true,
        Receipt: filteredReceipt,
    });
});

export const getPointByUserIdController = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.userId;

    const pointData = await getPointByUserId(userId);

    if (pointData) {
        res.status(200).json({
            success: true,
            pointData,
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'pointData not found',
        });
    }
});