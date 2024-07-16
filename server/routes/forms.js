const express = require('express');
const router = express.Router();
const { saveAdoptionForm } = require('../controllers/formController');
const auth = require('../middleware/auth');
router.post('/', auth,saveAdoptionForm);

module.exports = router;
