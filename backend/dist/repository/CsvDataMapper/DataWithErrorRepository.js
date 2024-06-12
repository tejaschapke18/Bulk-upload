"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataWithErrorModel_1 = require("./DataWithErrorModel");
class DataWithErrorRepository {
    constructor() {
        this.insertErrorInfo = (customersWithError) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield DataWithErrorModel_1.DataWithErrorModel.insertMany(customersWithError);
            }
            catch (error) {
                console.log(error);
                throw new Error("Error inserting customers");
            }
        });
    }
}
exports.default = new DataWithErrorRepository();