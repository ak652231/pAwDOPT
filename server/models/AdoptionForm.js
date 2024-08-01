const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdoptionFormSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  petId: { type: Schema.Types.ObjectId, ref: 'Pet', required: true }, 
  hoursAlone: { type: String, required: true },
  householdAgreement: { type: String, required: true },
  petLocation: { type: String, required: true },
  regularCare: { type: String, required: true },
  currentPets: { type: String, required: true },
  currentPetsComfort: { type: String, required: true },
  aggressiveBehavior: { type: String, required: true },
  trainingAccidents: { type: String, required: true },
  homeSpace: { type: String, required: true },
  financialPreparation: { type: String, required: true },
  lifetimeCommitment: { type: String, required: true },
  ngoWorkerApproved: { type: Boolean, default: false },
  adminApproved: { type: Boolean, default: false },
  rejected: { type: Boolean, default: false },
  assignedWorker: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('AdoptionForm', AdoptionFormSchema);
