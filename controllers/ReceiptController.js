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
    getAllPoints,
    deleteReceipt,
} from '../services/ReceiptService.js';
import Receipt from '../models/Receipt.js';
import {
    getHistoryByUser,
    getTopCustomer,
    getTopCustomerByMonth,
    getTotalRevenue,
} from '../services/HistoryService.js';

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
    const ReceiptId = req.params.receiptId;

    const Receipt = await deleteReceipt(ReceiptId);

    res.status(200).json({
        success: true,
        message: Receipt.isActive ? 'Receipt restore successfully' : 'Receipt deleted successfully',
        Receipt,
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

// Point
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

export const getAllPointsController = catchAsyncErrors(async (req, res, next) => {
    const Points = await getAllPoints();

    res.status(200).json({
        success: true,
        Points,
    });
});

// History
export const getHistoryByUserIdController = catchAsyncErrors(async (req, res, next) => {
    const Histories = await getHistoryByUser(req.params.userId);

    res.status(200).json({
        success: true,
        Histories,
    });
});

// Total revenue
export const getTotalRevenueController = catchAsyncErrors(async (req, res, next) => {
    const Revenue = await getTotalRevenue();

    res.status(200).json({
        success: true,
        Revenue,
    });
});

// Top customers
export const getTopCustomerController = catchAsyncErrors(async (req, res, next) => {
    const topCustomer = await getTopCustomer();

    res.status(200).json({
        success: true,
        topCustomer,
    });
});
