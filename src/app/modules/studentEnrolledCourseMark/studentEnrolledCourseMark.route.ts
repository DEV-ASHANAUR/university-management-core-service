import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { StudentEnrolledCourseMarkController } from './studentEnrolledCourseMark.controller';

const router = express.Router();

router.patch(
  '/',
  auth(ENUM_USER_ROLE.FACULTY, ENUM_USER_ROLE.ADMIN),
  StudentEnrolledCourseMarkController.getAllFromDB
);
router.patch(
  '/update-marks',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.FACULTY),
  StudentEnrolledCourseMarkController.updateStudentMarks
);
router.patch(
  '/update-final-marks',auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.FACULTY),
  StudentEnrolledCourseMarkController.updateFinalMarks
);

export const studentEnrolledCourseMarkRoutes = router;
