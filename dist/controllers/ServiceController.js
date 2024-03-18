"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterServicesByConditionController = exports.getAllServicesController = exports.deleteServiceController = exports.updateServiceController = exports.getServiceByIdController = exports.newServiceController = void 0;
const catchAsyncErrors_js_1 = require("../middleware/catchAsyncErrors.js");
const uuid_1 = require("uuid");
const ServicesService_1 = require("../services/ServicesService");
exports.newServiceController = (0, catchAsyncErrors_js_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price } = req.body;
    const id = (0, uuid_1.v4)();
    const createdAt = new Date();
    const modified = new Date();
    const isActive = false;
    const serviceData = {
        id,
        name,
        price,
        createdAt,
        modified,
        isActive,
    };
    const order = yield (0, ServicesService_1.createService)(serviceData);
    res.status(201).json({
        success: true,
        order,
    });
}));
exports.getServiceByIdController = (0, catchAsyncErrors_js_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceId = req.params.serviceId;
    const service = yield (0, ServicesService_1.getServiceById)(serviceId);
    if (service) {
        res.status(200).json({
            success: true,
            service,
        });
    }
    else {
        res.status(404).json({
            success: false,
            message: 'Service not found',
        });
    }
}));
exports.updateServiceController = (0, catchAsyncErrors_js_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceId = req.params.serviceId;
    const newData = req.body;
    newData.modified = new Date();
    yield (0, ServicesService_1.updateService)(serviceId, newData);
    res.status(200).json({
        success: true,
        message: 'Service updated successfully',
    });
}));
exports.deleteServiceController = (0, catchAsyncErrors_js_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceId = req.params.serviceId;
    yield (0, ServicesService_1.deleteService)(serviceId);
    res.status(200).json({
        success: true,
        message: 'Service deleted successfully',
    });
}));
exports.getAllServicesController = (0, catchAsyncErrors_js_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const services = yield (0, ServicesService_1.getAllServices)();
    res.status(200).json({
        success: true,
        services,
    });
}));
exports.filterServicesByConditionController = (0, catchAsyncErrors_js_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { condition, value } = req.body;
    const filteredServices = yield (0, ServicesService_1.filterServicesByCondition)(condition, value);
    res.status(200).json({
        success: true,
        services: filteredServices,
    });
}));
