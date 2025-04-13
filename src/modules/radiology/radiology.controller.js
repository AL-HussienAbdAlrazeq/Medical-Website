import Citizen from "../../Database/models/citizen.model.js";
import Radiology from "../../Database/models/radiology.model.js";
import { asyncHandler } from "../../utils/errors/error.response.js";
import { cloud } from "../../utils/multer/cloudinary.multer.js";


// Create Radiology (Supports Multiple Images)
export const createRadiology = asyncHandler(async (req, res, next) => {
  const { radiology_type, radiologistNotes, national_ID } = req.body;

  let images = [];

  for (const file of req.files) {
    const { secure_url, public_id } = await cloud.uploader.upload(file.path);
    images.push({ secure_url, public_id });
  }
  const citizen = await Citizen.findOne({ national_ID });

  if (!citizen) {
    return next(new Error("Citizen does not exist or invalid ID"));
  }

  if (citizen.national_ID != national_ID) {
    return next(new Error("Citizen does not exist or invalid ID"));
  }
  const newRadiology = await Radiology.create({
    national_ID,
    radiology_type,
    radiologistNotes,
    images
  });

  return res.status(201).json({ message: 'Radiology created successfully!', data: newRadiology });
});


// Get All Radiology Records
export const findAllRadiology = asyncHandler(async (req, res, next) => {
  const radiologyRecords = await Radiology.find()
  // .populate('citizen_id', 'full_name national_ID address blood_type') // Select specific fields
  // .select('-createdAt -updatedAt -__v');// Select specific fields

  return res.status(200).json({ message: "Radiology Records Fetched Successfully", data: radiologyRecords });
});


//  Get Single Radiology Record by ID
export const findRadiologyByID = asyncHandler(async (req, res, next) => {
  const { national_ID } = req.params;
  const radiology = await Radiology.find({ national_ID })
  // .populate('national_ID', 'full_name national_ID address blood_type') // Select specific fields
  // .select('-createdAt -updatedAt -__v');


  if (!radiology) {
    return next(new Error("Radiology not found", { cause: 404 }));
  }

  return res.status(200).json({ message: "Radiology Record Found", data: radiology });
});


//  Update Radiology Record
export const updateRadiology = asyncHandler(async (req, res, next) => {
  const { national_ID } = req.params;

  // Handle file uploads (add images if provided)
  let images = [];
  if (req.files && req.files.length) {
    for (const file of req.files) {
      const { secure_url, public_id } = await cloud.uploader.upload(file.path);
      images.push({ secure_url, public_id });
    }
    req.body.images = images;  // Add to request body for update
  }

  // Find and update the radiology record directly
  const updatedRadiology = await Radiology.findOneAndUpdate(
    { national_ID },            // Search condition
    { $set: req.body },         // Update data
    { new: true }                // Return the updated document
  );

  if (!updatedRadiology) {
    return next(new Error("Radiology not found", { cause: 404 }));
  }

  return res.status(200).json({
    message: "Radiology Updated Successfully",
    data: updatedRadiology,
  });
});


//  Delete Radiology Record
export const deleteRadiology = asyncHandler(async (req, res, next) => {
  const { national_ID } = req.params;

  // Find and delete the radiology record in one step
  const radiology = await Radiology.findOneAndDelete({ national_ID });

  if (!radiology) {
    return next(new Error("Radiology not found", { cause: 404 }));
  }

  // If images exist, delete them from Cloudinary
  if (radiology.images?.length) {
    await Promise.all(
      radiology.images.map((image) => cloud.api.delete_resources(image.public_id))
    );
  }

  return res.status(200).json({ message: "Radiology Deleted Successfully", data: radiology });
});
