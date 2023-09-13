import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RoomController } from './room.controller';
import { RoomValidation } from './room.validation';
const router = express.Router();

router.post(
  '/create',
  validateRequest(RoomValidation.create),
  RoomController.insertIntoDB
);
router.patch(
  '/:id',
  validateRequest(RoomValidation.update),
  RoomController.updateIntoDB
);
router.get('/', RoomController.getAllFromDB);
router.delete('/:id',RoomController.deleteIntoDB);
router.get('/:id', RoomController.getByIdFromDB);


export const RoomRoutes = router;
