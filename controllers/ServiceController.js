import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import { v4 as uuidv4 } from 'uuid';
import {
    createService,
    deleteService,
    filterServicesByCondition,
    getAllActiveServices,
    getAllServices,
    getServiceById,
    updateService,
} from '../services/ServicesService.js';

export const newServiceController = catchAsyncErrors(async (req, res, next) => {
    const { name, price } = req.body;

    const id = uuidv4();
    const createdAt = new Date();
    const modified = new Date();
    const isActive = true;

    const serviceData = {
        id,
        name,
        price,
        createdAt,
        modified,
        isActive,
    };

    const service = await createService(serviceData);

    console.log('Service: ', service);

    res.status(201).json({
        success: true,
        service,
    });
});

export const getServiceByIdController = catchAsyncErrors(async (req, res, next) => {
    const serviceId = req.params.serviceId;

    const service = await getServiceById(serviceId);

    if (service) {
        res.status(200).json({
            success: true,
            service,
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Service not found',
        });
    }
});

export const updateServiceController = catchAsyncErrors(async (req, res, next) => {
    const serviceId = req.params.serviceId;
    const newData = req.body;

    newData.modified = new Date();

    await updateService(serviceId, newData);

    res.status(200).json({
        success: true,
        message: 'Service updated successfully',
    });
});

export const deleteServiceController = catchAsyncErrors(async (req, res, next) => {
    const serviceId = req.params.serviceId;

    await updateService(serviceId, { isActive: false });

    res.status(200).json({
        success: true,
        message: 'Service deleted successfully',
    });
});

export const getAllServicesController = catchAsyncErrors(async (req, res, next) => {
    const services = await getAllActiveServices();

    res.status(200).json({
        success: true,
        services,
    });
});

export const filterServicesByConditionController = catchAsyncErrors(async (req, res, next) => {
    const { condition, value } = req.body;

    const filteredServices = await filterServicesByCondition(condition, value);

    res.status(200).json({
        success: true,
        services: filteredServices,
    });
});
