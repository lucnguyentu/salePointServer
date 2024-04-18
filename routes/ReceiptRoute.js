import express from 'express';
import {
    newReceiptController,
    getReceiptByIdController,
    updateReceiptController,
    deleteReceiptController,
    getAllReceiptController,
    filterReceiptByConditionController,
    getAllReceiptForManagerController,
    getPointByUserIdController,
    getAllPointsController,
    getHistoryByUserIdController,
    getTotalRevenueController,
    getTopCustomerController,
    filterReceiptController,
} from '../controllers/ReceiptController.js';

const router = express.Router();

router.post('/receipts/new', newReceiptController);
router.get('/receipts/:receiptId', getReceiptByIdController);
router.get('/receipts', getAllReceiptController);
// router.post('/receipts/filter', filterReceiptByConditionController);
router.post('/receipts/filter', filterReceiptController);

// for admin
router.get('/admin/receipts', getAllReceiptForManagerController);
router.put('/receipts/:receiptId', updateReceiptController);
router.delete('/receipts/:receiptId', deleteReceiptController);

// get point
router.get('/points', getAllPointsController);
router.get('/point/:userId', getPointByUserIdController);

// history
router.get('/history/:userId', getHistoryByUserIdController);

// statistical
router.get('/statistical/totalRevenue', getTotalRevenueController);
router.get('/statistical/topCustomer', getTopCustomerController);

export default router;
