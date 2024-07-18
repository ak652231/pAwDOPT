const express = require('express');
const router = express.Router();
const { createPet, getPets, getFilteredPets, getPetById, updatePet, deletePet } = require('../controllers/petController');
const auth = require('../middleware/auth');

router.post('/', auth, createPet);

router.get('/', getPets);

router.get('/:id', getPetById);

router.put('/:id', auth, updatePet);

router.delete('/:id', auth, deletePet);

module.exports = router;
