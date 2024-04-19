const express = require("express")
const router = express.Router();
const fs = require('fs');

const productRoutes = require('./product.js') // import product route
router.use(productRoutes) // use product route

const orderRoutes = require('./order.js') // import order route
router.use(orderRoutes) // use order route

const pdftemplateRoutes = require('./pdftemplate.js') // import order route
router.use(pdftemplateRoutes) // use order route

module.exports = router;