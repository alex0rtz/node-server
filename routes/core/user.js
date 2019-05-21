const express = require('express');
const router = express.Router();

const productCtrl = require('../../controllers/core/user');

router.route('/').get(productCtrl.get);

module.exports = router;