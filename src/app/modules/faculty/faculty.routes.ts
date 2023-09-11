import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(FacultyValidation.create),
  FacultyController.insertIntoDB
);
router.get('/', FacultyController.getAllFromDB);
router.get('/:id', FacultyController.getByIdFromDB);

export const FacultyRoutes = router;
