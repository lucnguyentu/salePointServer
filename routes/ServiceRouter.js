import express from 'express';
import {
    newServiceController,
    getServiceByIdController,
    updateServiceController,
    deleteServiceController,
    getAllServicesController,
    filterServicesByConditionController,
    getAllServicesForManagerController,
} from '../controllers/ServiceController.js';

const router = express.Router();

router.post('/services/new', newServiceController);
router.get('/services/:serviceId', getServiceByIdController);
router.get('/services', getAllServicesController);
router.post('/services/filter', filterServicesByConditionController);

// for admin
router.get('/admin/services/', getAllServicesForManagerController);
router.put('/services/:serviceId', updateServiceController);
router.delete('/services/:serviceId', deleteServiceController);

export default router;
