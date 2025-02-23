import { Router } from "express";
import { validation } from "../../middleware/validation.middleware.js";
import { createMedicalRecord, deleteMedicalRecord, findMedicalRecord, findMedicalRecordByID, updateMedicalRecord } from "./medicalRecord.controller.js";
import { createMedicalRecordValidation, updateMedicalRecordValidation } from "./medicalRecord.validation.js";
import { authenticate, authorizeRoles } from "../../middleware/auth.middleware.js";

const medicalRecordRouter = Router()

medicalRecordRouter.post('/create-medical-record', validation(createMedicalRecordValidation), createMedicalRecord)
medicalRecordRouter.get('/', findMedicalRecord)
medicalRecordRouter.get('/:id', findMedicalRecordByID)
medicalRecordRouter.patch('/update-medical-record/:id', validation(updateMedicalRecordValidation), updateMedicalRecord)
medicalRecordRouter.delete('/delete-medical-record/:id', deleteMedicalRecord)






export default medicalRecordRouter