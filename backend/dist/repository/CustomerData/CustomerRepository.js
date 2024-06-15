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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomerModel_1 = __importDefault(require("./CustomerModel"));
class CustomerRepository {
    constructor() {
        this.insertCustomers = (customers) => __awaiter(this, void 0, void 0, function* () {
            try {
                const batchSize = 1000;
                let bulkOpCustomers = CustomerModel_1.default.collection.initializeUnorderedBulkOp();
                for (let i = 0; i < customers.length; i += batchSize) {
                    const batchCustomers = customers.slice(i, i + batchSize);
                    batchCustomers.forEach((customer) => {
                        bulkOpCustomers.insert(customer);
                    });
                    yield bulkOpCustomers.execute();
                    bulkOpCustomers = CustomerModel_1.default.collection.initializeUnorderedBulkOp();
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
        this.searchCustomers = (searchField, searchText) => __awaiter(this, void 0, void 0, function* () {
            const query = { [searchField]: new RegExp(searchText, "i") };
            return CustomerModel_1.default.find(query);
        });
        this.getCustomerById = (customerId) => __awaiter(this, void 0, void 0, function* () {
            return CustomerModel_1.default.findOne({ customerId }, { _id: 0 });
        });
        this.updateCustomer = (customerId, newData) => __awaiter(this, void 0, void 0, function* () {
            return CustomerModel_1.default.findOneAndUpdate({ customerId }, newData, { new: true });
        });
    }
}
exports.default = new CustomerRepository();
