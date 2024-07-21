const fs = require('fs');
const path = require('path');
const Pet = require('../models/Pet');

exports.createPet = async (req, res) => {
  const { type, name, breed, age, healthInfo, compatibility } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    let photoData = null;
    let contentType = null;

    if (photo) {
      const filePath = path.join(__dirname, '../uploads', photo);
      photoData = fs.readFileSync(filePath);
      contentType = req.file.mimetype;

      fs.unlinkSync(filePath);
      console.log("Temporary file removed");
    }

    const newPet = new Pet({
      type,
      name,
      breed,
      age,
      photos: [{ data: photoData, contentType }],
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

    const petsWithBase64Images = pets.map(pet => {
      return {
        ...pet._doc,
        photos: pet.photos.map(photo => {
          const base64Data = photo.data ? photo.data.toString('base64') : null;
          return {
            ...photo._doc,
            data: base64Data
          };
        })
      };
    });

    res.json(petsWithBase64Images);
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
    const petData = {
      ...pet.toObject(),
      photos: pet.photos.map(photo => ({
        data: photo.data.toString('base64')
      }))
    };
    res.json(petData);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Pet not found' });
    }
    res.status(500).send('Server error');
  }
};

exports.updatePet = async (req, res) => {
  const { type, name, breed, age, healthInfo, compatibility } = req.body;

  const petFields = {};
  if (type) petFields.type = type;
  if (name) petFields.name = name;
  if (breed) petFields.breed = breed;
  if (age) petFields.age = age;
  if (healthInfo) petFields.healthInfo = healthInfo;
  if (compatibility) petFields.compatibility = compatibility;

  try {
    let pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ msg: 'Pet not found' });
    }
    
    if (req.file) {
      const photoData = fs.readFileSync(req.file.path);
      const contentType = req.file.mimetype;
      
      petFields.photos = [{ data: photoData, contentType }];
      
      fs.unlinkSync(req.file.path);
      console.log("Temporary file removed");
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