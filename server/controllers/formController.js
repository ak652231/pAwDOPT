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

exports.getAdoptionData = async (req, res) => {
  try {
    const adoptionForms = await AdoptionForm.find({})
      .populate('userId') 
      .populate('petId'); 

    res.json(adoptionForms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
exports.getAdoptionFormById= async (req,res)=>{
  try{
    const Form=await AdoptionForm.findById(req.params.id).populate('userId') 
    .populate('petId');
    res.json(Form);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

exports.approveByNGOWorker = async (req, res) => {
  try {
    const adoptionForm = await AdoptionForm.findById(req.params.id);

    if (!adoptionForm) {
      return res.status(404).json({ message: 'Adoption form not found' });
    }

    adoptionForm.ngoWorkerApproved = true;
    await adoptionForm.save();

    res.status(200).json({ message: 'Adoption form approved by NGO worker' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.approveByAdmin = async (req, res) => {
  try {
    const adoptionForm = await AdoptionForm.findById(req.params.id);

    if (!adoptionForm) {
      return res.status(404).json({ message: 'Adoption form not found' });
    }

    if (!adoptionForm.ngoWorkerApproved) {
      return res.status(400).json({ message: 'Form must be approved by NGO worker first' });
    }

    adoptionForm.adminApproved = true;
    await adoptionForm.save();

    res.status(200).json({ message: 'Adoption form approved by Admin' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.rejectAdoptionForm = async (req, res) => {
  try {
    const adoptionForm = await AdoptionForm.findById(req.params.id);

    if (!adoptionForm) {
      return res.status(404).json({ message: 'Adoption form not found' });
    }

    adoptionForm.rejected = true;
    await adoptionForm.save();

    res.status(200).json({ message: 'Adoption form rejected' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAdoptionRequestsByUserId = async (req, res) => {
  const userId = req.user.id;

  try {
    const adoptionRequests = await AdoptionForm.find({ userId: userId }).populate('petId');

    res.json(adoptionRequests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};