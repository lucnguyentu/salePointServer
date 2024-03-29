import express from 'express';
import {
    newReceiptController,
    getReceiptByIdController,
    updateReceiptController,
    deleteReceiptController,
    getAllReceiptController,
    filterReceiptByConditionController,
    getAllReceiptForManagerController,
} from '../controllers/ReceiptController.js';

const router = express.Router();

router.post('/receipt/new', newReceiptController);
router.get('/receipt/:serviceId', getReceiptByIdController);
router.get('/receipt', getAllReceiptController);
router.post('/receipt/filter', filterReceiptByConditionController);

// for admin
router.get('/admin/receipt/', getAllReceiptForManagerController);
router.put('/receipt/:serviceId', updateReceiptController);
router.delete('/receipt/:serviceId', deleteReceiptController);

export default router;
