const express = require("express");
const router = express.Router();

router.use(require("./api_auth"))
router.use(require("./api_product"))

module.exports = router;
