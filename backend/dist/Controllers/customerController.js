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
const dotenv = require("dotenv");
const CustomerRepository_1 = __importDefault(require("../repository/CustomerData/CustomerRepository"));
const customerSchema_1 = require("../config/customerSchema");
const CsvDataMapperRepository_1 = __importDefault(require("../repository/CsvDataMapper/CsvDataMapperRepository"));
const CsvDataMapperModel_1 = require("../repository/CsvDataMapper/CsvDataMapperModel");
dotenv.config();
class customerController {
    constructor() {
        this.getAllCustomerData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page);
                const limit = parseInt(req.query.limit);
                const customerData = yield CustomerRepository_1.default.getAllCustomers(page, limit);
                const totalCount = yield CustomerRepository_1.default.getCustomerCount();
                res.json({
                    message: "Data fetched successfully",
                    customerData,
                    totalCount,
                });
            }
            catch (err) {
                const typedError = err;
                res.status(500).json({ error: typedError });
            }
        });
        this.createData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const { error } = customerSchema_1.customerSchema.validate(body);
                if (error) {
                    res.json({
                        message: "Data not inserted due validation error in data provided",
                        validationErrors: error,
                    });
                    return;
                }
                const addedData = yield CustomerRepository_1.default.addCustomer(body);
                res.status(200).json({ status: "Created Successfully", addedData });
            }
            catch (error) {
                console.log("Error creating data:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
        this.searchCustomer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { searchField, searchText } = req.body;
                const searchData = yield CustomerRepository_1.default.searchCustomers(searchField, searchText);
                res.json({ message: "Search results fetched successfully", searchData });
            }
            catch (error) {
                console.log("Error searching data:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
        this.getSingleCustomer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { customerId } = req.body;
                const customer = yield CustomerRepository_1.default.getCustomerById(customerId);
                if (!customer) {
                    res.status(404).json({ error: "Customer not found" });
                    return;
                }
                res.json({ message: "Customer found", customer });
            }
            catch (error) {
                console.log("Error fetching customer:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
        this.editCustomer = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { customerId, newData } = req.body;
                const { error } = customerSchema_1.customerSchema.validate(newData);
                if (error) {
                    res.status(400).json({
                        message: "Validation error in edited data",
                        validationErrors: error,
                    });
                    return;
                }
                const updatedCustomer = yield CustomerRepository_1.default.updateCustomer(customerId, newData);
                res.json({ message: "Customer updated", customer: updatedCustomer });
            }
            catch (error) {
                console.log("Error updating customer:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
        this.getCsvInfos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page);
                const limit = parseInt(req.query.limit);
                const csvInfoData = yield CsvDataMapperRepository_1.default.getInfoData(page, limit);
                const totalCount = yield CsvDataMapperModel_1.CsvDataMapperModel.countDocuments();
                res.status(200).json({
                    message: "Data fetched successfully",
                    csvInfoData,
                    totalCount,
                });
            }
            catch (error) {
                res.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.default = new customerController();
