"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const building_controller_1 = require("./building.controller");
const building_validation_1 = require("./building.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(building_validation_1.BuildingValidation.create), building_controller_1.BuildingController.insertIntoDB);
router.patch('/:id', (0, validateRequest_1.default)(building_validation_1.BuildingValidation.update), building_controller_1.BuildingController.updateIntoDB);
router.get('/', building_controller_1.BuildingController.getAllFromDB);
router.delete('/:id', building_controller_1.BuildingController.deleteIntoDB);
router.get('/:id', building_controller_1.BuildingController.getByIdFromDB);
exports.BuildingRoutes = router;
