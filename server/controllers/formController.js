const AdoptionForm = require('../models/AdoptionForm'); 

exports.saveAdoptionForm = async (req, res) => {
  try {
    console.log('Request received:', req.body);
    const formData = req.body;
    formData.userId = req.user.id;
    const newAdoptionForm = new AdoptionForm(formData);
    const savedForm = await newAdoptionForm.save();

    res.status(201).json(savedForm);
  } catch (error) {
    console.error('Error saving adoption form:', error);
    res.status(500).json({ message: 'Failed to submit form' });
  }
};

exports.getAdoptionData= async (req,res)=>{
  try{
    const Forms=await AdoptionForm.find({});
    res.json(Forms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
exports.getAdoptionFormById= async (req,res)=>{
  try{
    const Form=await AdoptionForm.findById(req.params.id);
    res.json(Form);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}
