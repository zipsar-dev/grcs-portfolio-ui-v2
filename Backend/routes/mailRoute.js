const express = require("express");
const { sendOrderEmail } = require("../controller/mailController");
const router = express.Router();

router.route("/order/email").post(sendOrderEmail);

module.exports = router;
