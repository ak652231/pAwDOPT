const Pet = require('../models/Pet');

exports.createPet = async (req, res) => {
  const { type, name, breed, age, photos, healthInfo, compatibility } = req.body;

  try {
    const newPet = new Pet({
      type,
      name,
      breed,
      age,
      photos,
      healthInfo,
      compatibility,
    });

    const pet = await newPet.save();
    res.json(pet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPets = async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.json(pets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ msg: 'Pet not found' });
    }

    res.json(pet);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Pet not found' });
    }
    res.status(500).send('Server error');
  }
};

exports.updatePet = async (req, res) => {
  console.log("Received update data:", req.body);
  const { type, name, breed, age, healthInfo, compatibility } = req.body;

  const petFields = { type, name, breed, age, healthInfo, compatibility };

  try {
    console.log("Received update data:", req.body);
    let pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ msg: 'Pet not found' });
    }
    pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { $set: petFields },
      { new: true }
    );

    res.json(pet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ msg: 'Pet not found' });
    }

    await pet.deleteOne();

    res.json({ msg: 'Pet removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Pet not found' });
    }
    res.status(500).send('Server error');
  }
};
