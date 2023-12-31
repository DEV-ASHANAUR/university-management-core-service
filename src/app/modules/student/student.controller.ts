/* eslint-disable @typescript-eslint/no-explicit-any */
import { Student } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constants';
import { StudentService } from './student.service';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.create(req.body);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully!',
    data: result,
  });
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await StudentService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched!!',
    meta: result.meta,
    data: result.data,
  });
});

const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.getDataById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched!!',
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await StudentService.updateIntoDB(id, payload);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    message: 'Student update successFully!',
    success: true,
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.deleteFromDB(id);
  sendResponse<Student>(res, {
    statusCode: httpStatus.OK,
    message: 'Student deleted successFully!',
    success: true,
    data: result,
  });
});

const myCourses = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const filter = pick(req.query,['courseId', 'academicSemesterId'])
  const result = await StudentService.myCourses(user.userId,filter);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Student Courses data fetched successfully!',
    success: true,
    data: result,
  });
});

const getMyCourseSchedules = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const filter = pick(req.query, ['courseId', 'academicSemesterId'])
  const result = await StudentService.getMyCourseSchedules(user.userId, filter);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course Schedules data fetched successfully',
      data: result
  });
});

const myAcademicInfo = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await StudentService.getMyAcademicInfo(user.userId);
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'My Academic Info data fetched successfully',
      data: result
  });
})

export const StudentController = {
  create,
  getAllFromDB,
  getDataById,
  updateIntoDB,
  deleteFromDB,
  myCourses,
  getMyCourseSchedules,
  myAcademicInfo,
};
