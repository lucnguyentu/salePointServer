import express from 'express';
import {
    newServiceController,
    getServiceByIdController,
    updateServiceController,
    deleteServiceController,
    getAllServicesController,
    filterServicesByConditionController,
} from '../controllers/ServiceController.js';

const router = express.Router();

router.post('/services/new', newServiceController);
router.get('/services/:serviceId', getServiceByIdController);
router.put('/services/:serviceId', updateServiceController);
router.delete('/services/:serviceId', deleteServiceController);
router.get('/services', getAllServicesController);
router.post('/services/filter', filterServicesByConditionController);

export default router;
