import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseController } from './offeredCourse.controller';
import { OfferedCourseValidations } from './offeredCourse.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(OfferedCourseValidations.create),
  OfferedCourseController.insertIntoDB
);

export const offeredCourseRoutes = router;
