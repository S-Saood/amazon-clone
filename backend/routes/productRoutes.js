import express from 'express'
import { processPayment, getKey, paymentVarification } from '../controlleres/product_controller.js'

const router = express.Router();



router.route("/payment/process").post(processPayment)
router.route("/getKey").get(getKey)
router.route("/paymentVarification").post(paymentVarification)
export default router;
