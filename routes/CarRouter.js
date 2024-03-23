import express from 'express';
import {
    deleteCarInfoController,
    filterCarInfoByConditionController,
    getAllCarInfoForManagerController,
    getAllCarInforController,
    getCarInfoByIdController,
    getCarsOfUser,
    newCarInfoController,
    updateCarInfoController,
} from '../controllers/CarController.js';

const router = express.Router();

router.post('/car_info/new', newCarInfoController);
router.get('/car_info/:carInfoId', getCarInfoByIdController);
router.get('/car_infos', getAllCarInforController);
router.post('/car_info/filter', filterCarInfoByConditionController);
router.get('/:user_id/my_car_info', getCarsOfUser);

// for admin
router.get('/admin/car_infos', getAllCarInfoForManagerController);
router.put('/car_info/:carInfoId', updateCarInfoController);
router.delete('/car_info/:carInfoId', deleteCarInfoController);

export default router;
