import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemesterRegistrationZodValidation } from './semesterRegistration.validation';

const router = express.Router();

router.get(
  '/get-my-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.getMyRegistration
);

router.get(
  '/get-my-semsester-courses',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.getMySemesterRegCouses
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.getAllFromDB
);
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.getDataById
);

router.post(
  '/start-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.startMyRegistration
);

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(SemesterRegistrationZodValidation.create),
  SemesterRegistrationController.insertIntoDB
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(SemesterRegistrationZodValidation.update),
  SemesterRegistrationController.updateOneInDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.deleteByIdFromDB
);

router.post(
  '/enroll-into-course',
  validateRequest(SemesterRegistrationZodValidation.enrollOrWithdrawCourse),
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.enrollIntoCourse
);

router.post(
  '/withdraw-from-course',
  validateRequest(SemesterRegistrationZodValidation.enrollOrWithdrawCourse),
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.withdrewFromCourse
);

router.post(
  '/confirm-my-registration',
  auth(ENUM_USER_ROLE.STUDENT),
  SemesterRegistrationController.confirmMyregistration
);

router.post(
  '/:id/start-new-semester',
  auth(ENUM_USER_ROLE.ADMIN),
  SemesterRegistrationController.startNewSemester
);

export const SemesterRegistrationRoutes = router;
