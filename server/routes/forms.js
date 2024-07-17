const express = require('express');
const router = express.Router();
const { saveAdoptionForm ,getAdoptionData,getAdoptionFormById,approveByNGOWorker, approveByAdmin,rejectAdoptionForm} = require('../controllers/formController');
const auth = require('../middleware/auth');

router.post('/', auth,saveAdoptionForm);
router.get('/getAdoptionData',getAdoptionData);
router.get('/:id', getAdoptionFormById);
router.patch('/approve/ngo/:id', approveByNGOWorker);
router.patch('/approve/admin/:id', approveByAdmin);
router.patch('/reject/:id', rejectAdoptionForm);

module.exports = router;
