import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';
const router = express.Router();

router.post(
  '/create',
  validateRequest(CourseValidation.create),
  CourseController.insertIntoDB
);
router.patch('/:id',validateRequest(CourseValidation.update),CourseController.updateOneInDB);
router.get('/', CourseController.getAllFromDB);
router.get('/:id', CourseController.getByIdFromDB);
router.delete('/:id', CourseController.deleteIntoDB);

export const CourseRoutes = router;
