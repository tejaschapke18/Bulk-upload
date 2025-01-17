import { Router } from "express";
import { importCSV } from "../Controllers/csvController";
import { uploadCSV } from "../Middleware/upload";
import customerController from "../Controllers/customerController";
import authenticate from "../Middleware/authMiddleware";

const router = Router();
// router.use(authenticate);

/**
 * @swagger
 * tags:
 *   - name: Customer
 *     description: Endpoints related to customer data operations
 */

/**
 * @swagger
 * /api/customerinfo:
 *   post:
 *     summary: Fetch customer data with pagination
 *     tags: [Data]
 *     description: Retrieve customer data with pagination
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number
 *         required: false
 *         type: integer
 *       - in: query
 *         name: limit
 *         description: Number of items per page
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: Data fetched successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No data found
 */
router.post("/customerinfo", customerController.getAllCustomerData);

/**
 * @swagger
 * /api/addcustomer:
 *   post:
 *     summary: Add a new customer
 *     tags: [Data]
 *     description: Create a new customer entry
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Customer data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             customerId:
 *               type: string
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             company:
 *               type: string
 *             city:
 *               type: string
 *             country:
 *               type: string
 *             phone1:
 *               type: string
 *             phone2:
 *               type: string
 *             email:
 *               type: string
 *             subscriptionDate:
 *               type: string
 *               format: date
 *             website:
 *               type: string
 *     responses:
 *       200:
 *         description: Customer created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/addcustomer", customerController.createData);

/**
 * @swagger
 * /api/import-csv:
 *   post:
 *     summary: Import customers from CSV file
 *     tags: [Data]
 *     description: Import customer data from a CSV file
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The CSV file to upload
 *         required: true
 *     responses:
 *       200:
 *         description: CSV file imported successfully
 *       400:
 *         description: File path not found
 *       500:
 *         description: Internal server error
 */
router.post("/import-csv", uploadCSV, importCSV);

/**
 * @swagger
 * /api/get-customer:
 *   post:
 *     summary: Get a single customer by ID
 *     tags: [Data]
 *     description: Retrieve a single customer's details by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Customer ID
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             customerId:
 *               type: string
 *     responses:
 *       200:
 *         description: Customer found
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
router.post("/get-customer", customerController.getSingleCustomer);

/**
 * @swagger
 * /api/edit-customer:
 *   put:
 *     summary: Edit customer data
 *     tags: [Data]
 *     description: Edit an existing customer's data
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Customer data to edit
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             customerId:
 *               type: string
 *             newData:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 company:
 *                   type: string
 *                 city:
 *                   type: string
 *                 country:
 *                   type: string
 *                 phone1:
 *                   type: string
 *                 phone2:
 *                   type: string
 *                 email:
 *                   type: string
 *                 subscriptionDate:
 *                   type: string
 *                   format: date
 *                 website:
 *                   type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.put("/edit-customer", customerController.editCustomer);

/**
 * @swagger
 * /api/getcsvinfo:
 *   get:
 *     summary: Fetch CSV import info
 *     tags: [Data]
 *     description: Retrieve information about imported CSV files
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Page number
 *         required: false
 *         type: integer
 *       - in: query
 *         name: limit
 *         description: Number of items per page
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: Data fetched successfully
 *       500:
 *         description: Internal server error
 */
router.get("/getcsvinfo", customerController.getCsvInfos);

/**
 * @swagger
 * /api/getallerrorsofcsv:
 *   get:
 *     summary: Get all errors of a CSV
 *     tags: [Data]
 *     description: Retrieve all errors associated with a CSV file using its ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         description: The ID of the CSV file
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *       '404':
 *         description: No data found with the provided CSV ID
 *       '500':
 *         description: Internal server error
 */
router.get("/getallerrorsofcsv", customerController.getAllErrors);

export default router;
