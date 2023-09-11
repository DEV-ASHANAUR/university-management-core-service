import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(StudentValidation.create),
  StudentController.create
);
router.get('/', StudentController.getAllFromDB);
router.get('/:id', StudentController.getDataById);

export const StudentRoutes = router;
