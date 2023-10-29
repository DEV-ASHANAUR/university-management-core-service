import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { StudentEnrolledCourseMarkService } from "./studentEnrolledCourseMark.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const updateStudentMarks = catchAsync(async(req:Request,res:Response)=>{
  const result = await StudentEnrolledCourseMarkService.updateStudentMarks(req.body);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success: true,
    message: "marks updated!",
    data: result
  })
})

export const StudentEnrolledCourseMarkController = {
  updateStudentMarks
}