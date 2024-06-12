"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const CustomerModel_1 = __importStar(require("./CustomerModel"));
class CustomerRepository {
    constructor() {
        this.insertCustomers = (customers, customersWithError) => __awaiter(this, void 0, void 0, function* () {
            try {
                const batchSize = 1000;
                let bulkOpCustomers = CustomerModel_1.default.collection.initializeUnorderedBulkOp();
                let bulkOpErrors = CustomerModel_1.customerErrorModel.collection.initializeUnorderedBulkOp();
                for (let i = 0; i < customers.length; i += batchSize) {
                    const batchCustomers = customers.slice(i, i + batchSize);
                    batchCustomers.forEach((customer) => {
                        bulkOpCustomers.insert(customer);
                    });
                    yield bulkOpCustomers.execute();
                    bulkOpCustomers = CustomerModel_1.default.collection.initializeUnorderedBulkOp();
                }
                for (let i = 0; i < customersWithError.length; i += batchSize) {
                    const batchErrors = customersWithError.slice(i, i + batchSize);
                    batchErrors.forEach((errorCustomer) => {
                        bulkOpErrors.insert(errorCustomer);
                    });
                    yield bulkOpErrors.execute();
                    bulkOpErrors =
                        CustomerModel_1.customerErrorModel.collection.initializeUnorderedBulkOp();
                }
            }
            catch (error) {
                console.log(error);
                throw new Error("Error inserting customers");
            }
        });
        this.getAllCustomers = (page, limit) => __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            return CustomerModel_1.default.find().skip(skip).limit(limit);
        });
        this.getCustomerCount = () => __awaiter(this, void 0, void 0, function* () {
            return CustomerModel_1.default.countDocuments();
        });
        this.addCustomer = (body) => __awaiter(this, void 0, void 0, function* () {
            return CustomerModel_1.default.create(body);
        });
        this.addToErrorTable = (body) => __awaiter(this, void 0, void 0, function* () {
            return CustomerModel_1.customerErrorModel.create(body);
        });
    }
}
exports.default = new CustomerRepository();