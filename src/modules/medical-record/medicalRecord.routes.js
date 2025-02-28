import { Router } from "express";
import { validation } from "../../middleware/validation.middleware.js";
import { createMedicalRecord, deleteMedicalRecord, findMedicalRecord, findMedicalRecordByID, updateMedicalRecord } from "./medicalRecord.controller.js";
import { createMedicalRecordValidation, deleteMedicalRecordValidation, updateMedicalRecordValidation } from "./medicalRecord.validation.js";
import { authenticate, authorizeRoles } from "../../middleware/auth.middleware.js";

const medicalRecordRouter = Router()

medicalRecordRouter.post('/create-medical-record', validation(createMedicalRecordValidation), createMedicalRecord)
medicalRecordRouter.get('/', findMedicalRecord)
medicalRecordRouter.get('/:national_ID', findMedicalRecordByID)
medicalRecordRouter.patch('/update-medical-record/:national_ID', validation(updateMedicalRecordValidation), updateMedicalRecord)
medicalRecordRouter.delete('/delete-medical-record/:national_ID', validation(deleteMedicalRecordValidation),deleteMedicalRecord)






export default medicalRecordRouter