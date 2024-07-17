const express = require('express');
const router = express.Router();
const { saveAdoptionForm ,getAdoptionData,getAdoptionFormById} = require('../controllers/formController');
const auth = require('../middleware/auth');

router.post('/', auth,saveAdoptionForm);
router.get('/getAdoptionData',getAdoptionData);
router.get('/:id',getAdoptionFormById);

module.exports = router;
