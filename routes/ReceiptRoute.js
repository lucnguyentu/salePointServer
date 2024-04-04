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
} from '../controllers/ReceiptController.js';

const router = express.Router();

router.post('/receipt/new', newReceiptController);
router.get('/receipt/:receiptId', getReceiptByIdController);
router.get('/receipt', getAllReceiptController);
router.post('/receipt/filter', filterReceiptByConditionController);

// for admin
router.get('/admin/receipt/', getAllReceiptForManagerController);
router.put('/receipt/:receiptId', updateReceiptController);
router.delete('/receipt/:receiptId', deleteReceiptController);

// get point
router.get('/points', getAllPointsController);
router.get('/point/:userId', getPointByUserIdController);

export default router;
