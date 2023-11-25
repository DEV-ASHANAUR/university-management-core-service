import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingController } from './building.controller';
import { BuildingValidation } from './building.validation';
const router = express.Router();

router.post(
  '/',
  validateRequest(BuildingValidation.create),
  BuildingController.insertIntoDB
);
router.patch(
  '/:id',
  validateRequest(BuildingValidation.update),
  BuildingController.updateIntoDB
);
router.get('/', BuildingController.getAllFromDB);
router.delete('/:id',BuildingController.deleteIntoDB);
router.get('/:id', BuildingController.getByIdFromDB);


export const BuildingRoutes = router;
