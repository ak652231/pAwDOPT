const express = require('express');
const router = express.Router();
const { createPet, getPets, getFilteredPets, getPetById, updatePet, deletePet } = require('../controllers/petController');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

router.post('/', auth, upload, createPet);

router.get('/', getPets);

router.get('/:id', getPetById);

router.put('/:id', auth, upload, updatePet);

router.delete('/:id', auth, deletePet);

module.exports = router;
