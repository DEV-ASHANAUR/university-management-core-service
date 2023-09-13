import { Room } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { roomFilterableFields } from './room.constant';
import { RoomService } from './room.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.insertIntoDB(req.body);
  sendResponse<Room>(res, {
    statusCode: httpStatus.OK,
    message: 'Room created SuccessFully!',
    success: true,
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, roomFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await RoomService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Room fetched successfully!',
    success: true,
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.getByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Room fetched successfully!',
    success: true,
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.updateIntoDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Room updated successfully!',
    success: true,
    data: result,
  });
});

const deleteIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.deleteIntoDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Room Deleted successfully!',
    success: true,
    data: result,
  });
});

export const RoomController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteIntoDB,
};
