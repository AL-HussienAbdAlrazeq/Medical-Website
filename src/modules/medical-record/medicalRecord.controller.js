
import Citizen from "../../Database/models/citizen.model.js";
import MedicalRecord from "../../Database/models/medical_record.model.js";
import { asyncHandler } from "../../utils/errors/error.response.js";


export const createMedicalRecord = asyncHandler(async (req, res, next) => {
  const { treatment, diagnosis, record_date, citizenNid } = req.body;

  if (!citizenNid) {
    return next(new Error("Citizen Not Found"));
  }

  const citizen = await Citizen.findOne({ national_ID: citizenNid });
  if (!citizen) {
    return next(new Error("Citizen does not exist"));
  }

  const medicalRecord = await MedicalRecord.create({
    treatment,
    diagnosis,
    record_date,
    citizenNid: citizen.national_ID, // Reference to the Citizen
  });

  return res.status(201).json({
    message: "Medical Record Created Successfully",
    medicalRecord,
  });
});


export const findMedicalRecord = asyncHandler(async (req, res, next) => {
  const medicalRecords = await MedicalRecord.find();
  return res.status(200).json({
    message: "Medical Records Retrieved Successfully",
    medicalRecords,
  });
});


export const findMedicalRecordByID = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const medicalRecord = await MedicalRecord.findById(id);

  if (!medicalRecord) {
    return next(new Error("Medical Record not found", { cause: 404 }));
  }

  return res.status(200).json({
    message: "Medical Record Retrieved Successfully",
    medicalRecord,
  });
});


export const updateMedicalRecord = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const medicalRecord = await MedicalRecord.findById(id);
  if (!medicalRecord) {
    return next(new Error("Medical Record not found", { cause: 404 }));
  }

  const updatedRecord = await MedicalRecord.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    message: "Medical Record Updated Successfully",
    updatedRecord,
  });
});

export const deleteMedicalRecord = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const medicalRecord = await MedicalRecord.findById(id);
  if (!medicalRecord) {
    return next(new Error("Medical Record not found", { cause: 404 }));
  }

  await MedicalRecord.findByIdAndDelete(id);
  return res.status(200).json({
    message: "Medical Record Deleted Successfully",
  });
});
