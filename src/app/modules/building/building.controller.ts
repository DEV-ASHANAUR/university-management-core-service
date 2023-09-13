import { Building } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { buildingFilterableFields } from './building.constant';
import { BuildingService } from './building.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.insertIntoDB(req.body);
  sendResponse<Building>(res, {
    statusCode: httpStatus.OK,
    message: 'Building created SuccessFully!',
    success: true,
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, buildingFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await BuildingService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Building fetched successfully!',
    success: true,
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.getByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Building fetched successfully!',
    success: true,
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.updateIntoDB(req.params.id,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Building updated successfully!',
    success: true,
    data: result,
  });
});

const deleteIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.deleteIntoDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Building Deleted successfully!',
    success: true,
    data: result,
  });
});

export const BuildingController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteIntoDB,
};
