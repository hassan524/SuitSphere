"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AsyncErrorHandler_1 = __importDefault(require("../utils/AsyncErrorHandler"));
const cartController_1 = require("../controller/cartController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/addProduct', authMiddleware_1.authMiddleware, (0, AsyncErrorHandler_1.default)(cartController_1.addToCart));
router.get('/getProduct', authMiddleware_1.authMiddleware, (0, AsyncErrorHandler_1.default)(cartController_1.getCarts));
exports.default = router;
