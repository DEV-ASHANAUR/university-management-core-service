import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { courseFilterableFields } from './course.constant';
import { CourseService } from './course.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created Successfully!',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, courseFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await CourseService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched Successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.getByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course fetched Successfully!',
    data: result,
  });
});
const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.updateOneInDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Update SuccessFully!',
    data: result,
  });
});
const deleteIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.deleteIntoDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course deleted Successfully!',
    data: result,
  });
});

const assignFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.assignFaculties(
    req.params.id,
    req.body.faculties
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Faculty Assign Successfully!',
    data: result,
  });
});

const removeFaculties = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.removeFaculties(
    req.params.id,
    req.body.faculties
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Faculty remove Successfully!',
    data: result,
  });
});

export const CourseController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteIntoDB,
  assignFaculty,
  removeFaculties,
};
