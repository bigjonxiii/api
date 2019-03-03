"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var ProxySchema = new mongoose_1.default.Schema({
    uri: String,
    crawled_at: Date,
    verified_at: Date,
    is_valid: Boolean,
}, { collection: 'proxy' });
exports.Proxy = mongoose_1.default.model('Proxy', ProxySchema);
