import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import { v4 as uuidv4 } from 'uuid';
import {
    createCarInfo,
    deleteCarInfo,
    filterCarInfoByCondition,
    getAllActiveCarInfo,
    getAllCarInfo,
    getCarInfoById,
    getCarsBelongToUser,
    updateCarInfo,
} from '../services/CarServices.js';
import Car from '../models/Car.js';

export const newCarInfoController = catchAsyncErrors(async (req, res, next) => {
    const { name, car_company, block_division, license_plate, speedometer, number_of_oil_changes, user } = req.body;

    const id = uuidv4();
    const createdAt = new Date();
    const modified = new Date();
    const isActive = true;

    const CarInfoData = {
        id,
        name,
        car_company,
        block_division,
        license_plate,
        speedometer,
        number_of_oil_changes,
        user,
        createdAt,
        modified,
        isActive,
    };

    const CarInfo = await createCarInfo(CarInfoData);

    res.status(201).json({
        success: true,
        CarInfo,
    });
});

export const getCarInfoByIdController = catchAsyncErrors(async (req, res, next) => {
    const CarInfoId = req.params.carInfoId;

    const CarInfo = await getCarInfoById(CarInfoId);

    if (CarInfo) {
        res.status(200).json({
            success: true,
            CarInfo,
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'CarInfo not found',
        });
    }
});

export const updateCarInfoController = catchAsyncErrors(async (req, res, next) => {
    const CarInfoId = req.params.carInfoId;
    const newData = req.body;

    newData.modified = new Date();

    await updateCarInfo(CarInfoId, newData);

    res.status(200).json({
        success: true,
        message: 'CarInfo updated successfully',
    });
});

export const deleteCarInfoController = catchAsyncErrors(async (req, res, next) => {
    const CarInfoId = req.params.carInfoId;

    const carInfo = await deleteCarInfo(CarInfoId);

    res.status(200).json({
        success: true,
        message: carInfo.isActive ? 'CarInfo restore successfully' : 'CarInfo deleted successfully',
        carInfo,
    });
});

export const getAllCarInforController = catchAsyncErrors(async (req, res, next) => {
    const CarInfo = await getAllActiveCarInfo();

    res.status(200).json({
        success: true,
        CarInfo,
    });
});

export const getAllCarInfoForManagerController = catchAsyncErrors(async (req, res, next) => {
    const CarInfo = await getAllCarInfo();

    res.status(200).json({
        success: true,
        CarInfo,
    });
});

export const filterCarInfoByConditionController = catchAsyncErrors(async (req, res, next) => {
    const { condition, value } = req.body;

    const filteredCarInfo = await filterCarInfoByCondition(condition, value);

    res.status(200).json({
        success: true,
        CarInfo: filteredCarInfo,
    });
});

export const getCarsOfUser = catchAsyncErrors(async (req, res, next) => {
    const CarInfo = await getCarsBelongToUser(req.params.user_id);

    res.status(200).json({
        success: true,
        CarInfo,
    });
});
