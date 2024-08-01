const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signUp = async (req, res) => {
  const { name, email, number, address, gender, age, role, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      number,
      address,
      gender,
      age,
      role,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getUserProfile= async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'user not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'user not found' });
    }
    res.status(500).send('Server error');
  }
};
exports.EditUserById = async (req, res) => {
  console.log("Received update data:", req.body);
  const { email, name, number, address, gender, age,role } = req.body;

  const userFields = {};
  if (email) userFields.email = email;
  if (name) userFields.name = name;
  if (number) userFields.number = number;
  if (age) userFields.age = age;
  if (address) userFields.address = address;
  if (gender) userFields.gender = gender;
  if (role) userFields.role = role;

  try {
    const userId=req.user.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: 'Pet not found' });
    }
    
    user = await User.findByIdAndUpdate(
      userId,
      { $set: userFields },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({ msg: 'users not found' });
    }

    res.json(users);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'users not found' });
    }
    res.status(500).send('Server error');
  }
};
exports.getUserById = async (req, res) => {
  try {
    const userId= req.params.id;
    const users = await User.find({userId});

    if (!users) {
      return res.status(404).json({ msg: 'users not found' });
    }

    res.json(users);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'users not found' });
    }
    res.status(500).send('Server error');
  }
};