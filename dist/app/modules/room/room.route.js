"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const room_controller_1 = require("./room.controller");
const room_validation_1 = require("./room.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(room_validation_1.RoomValidation.create), room_controller_1.RoomController.insertIntoDB);
router.patch('/:id', (0, validateRequest_1.default)(room_validation_1.RoomValidation.update), room_controller_1.RoomController.updateIntoDB);
router.get('/', room_controller_1.RoomController.getAllFromDB);
router.delete('/:id', room_controller_1.RoomController.deleteIntoDB);
router.get('/:id', room_controller_1.RoomController.getByIdFromDB);
exports.RoomRoutes = router;
