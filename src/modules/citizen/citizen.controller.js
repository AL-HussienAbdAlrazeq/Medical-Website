
import Citizen from "../../Database/models/citizen.model.js";
import { asyncHandler } from "../../utils/errors/error.response.js";


export const createCitizen = asyncHandler(async (req, res, next) => {
  const { national_ID, full_name, address, blood_type, birth_date, mobileNumber } = req.body;

  if (!national_ID || !full_name || !address || !blood_type || !birth_date) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (national_ID === null || national_ID === undefined) {
    return res.status(400).json({ error: "National ID cannot be null or undefined." });
  }

  const existingCitizen = await Citizen.findOne({ national_ID });

  if (existingCitizen) {
    return res.status(400).json({ error: "Citizen with this National ID already exists." });
  }

  const citizen = await Citizen.create({ national_ID, full_name, address, blood_type, birth_date, mobileNumber });
  return res.status(201).json({ message: "Citizen Created Successfully", citizen });
});


export const findAllCitizen = asyncHandler(async (req, res, next) => {
  const citizens = await Citizen.find();
  return res.status(200).json({ message: "Citizens Retrieved Successfully", citizens });
});


export const findCitizenByID = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const citizen = await Citizen.findById(id);

  if (!citizen) {
    return next(new Error("Citizen not found"));
  }

  return res.status(200).json({ message: "Citizen Retrieved Successfully", citizen });
});



export const findCitizenNationalID = asyncHandler(async (req, res, next) => {

  const { national_ID } = req.query

  if (!national_ID) {
    return res.status(400).json({ message: 'National ID is required' });
  }

  const citizen = await Citizen.findOne({ national_ID });

  if (!citizen) {
    return next(new Error("Citizen not found"));
  }

  return res.status(200).json({ message: "Citizen Retrieved Successfully", citizen });
});



export const updateCitizen = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const citizen = await Citizen.findByIdAndUpdate(id, req.body, { new: true });

  if (!citizen) {
    return next(new Error("Citizen not found"));
  }

  return res.status(200).json({ message: "Citizen Updated Successfully", citizen });
});


export const deleteCitizen = asyncHandler(async (req, res, next) => {
  const { national_ID } = req.params;
  const citizen = await Citizen.findOne({ national_ID });
  if (!citizen) {
    return next(new Error("Citizen not found", { cause: 404 }));
  }

  await Citizen.findOneAndDelete({ national_ID });

  return res.status(200).json({ message: "Citizen Deleted Successfully", citizen });
});
