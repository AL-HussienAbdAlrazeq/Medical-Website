
import Citizen from "../../Database/models/citizen.model.js";
import MedicalRecord from "../../Database/models/medical_record.model.js";
import { asyncHandler } from "../../utils/errors/error.response.js";


export const createMedicalRecord = asyncHandler(async (req, res, next) => {
  const { treatment, diagnosis, record_date, national_ID, clinic_name, clinic_code } = req.body;

  const citizen = await Citizen.findOne({ national_ID });

  if (!citizen) {
    return next(new Error("Citizen does not exist or invalid ID"));
  }

  if (citizen.national_ID != national_ID) {
    return next(new Error("Citizen does not exist or invalid ID"));
  }
  const medicalRecord = await MedicalRecord.create({
    treatment,
    diagnosis,
    record_date,
    national_ID,
    clinic_name,
    clinic_code
  });

  return res.status(201).json({
    message: "Medical Record Created Successfully",
    medicalRecord,
  });
});


export const findMedicalRecord = asyncHandler(async (req, res, next) => {
  const medicalRecords = await MedicalRecord.find()
  // .populate('citizen_id', 'full_name national_ID address blood_type') // Select specific fields
  // .select('-createdAt -updatedAt -__v');
  return res.status(200).json({
    message: "Medical Records Retrieved Successfully",
    medicalRecords,
  });
});


export const findMedicalRecordByID = asyncHandler(async (req, res, next) => {
  const { national_ID } = req.params;
  const medicalRecord = await MedicalRecord.findOne({ national_ID })
  // .populate('citizen_id', 'full_name national_ID address blood_type') // Select specific fields
  // .select('-createdAt -updatedAt -__v');;

  if (!medicalRecord) {
    return next(new Error("Medical Record not found", { cause: 404 }));
  }

  const citizen = await Citizen.findOne({ national_ID }).select("full_name national_ID address blood_type -_id");

  if (!citizen) {
    return next(new Error("Citizen not found", { cause: 404 }));
  }
  return res.status(200).json({
    message: "Medical Record Retrieved Successfully",
    medicalRecord,
    citizen
  });
});


export const updateMedicalRecord = asyncHandler(async (req, res, next) => {
  const { national_ID } = req.params;

  const medicalRecord = await MedicalRecord.findOne({ national_ID });
  if (!medicalRecord) {
    return next(new Error("Medical Record not found", { cause: 404 }));
  }

  const updatedRecord = await MedicalRecord.findOneAndUpdate({ national_ID }, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    message: "Medical Record Updated Successfully",
    updatedRecord,
  });
});

export const deleteMedicalRecord = asyncHandler(async (req, res, next) => {
  const { national_ID } = req.params;

  const medicalRecord = await MedicalRecord.findOne({ national_ID });
  if (!medicalRecord) {
    return next(new Error("Medical Record not found", { cause: 404 }));
  }

  await MedicalRecord.findOneAndDelete({ national_ID });
  return res.status(200).json({
    message: "Medical Record Deleted Successfully",
  });
});
