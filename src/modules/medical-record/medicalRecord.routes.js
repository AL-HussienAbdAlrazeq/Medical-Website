import { Router } from "express";
import { validation } from "../../middleware/validation.middleware.js";
import { createMedicalRecord, deleteMedicalRecord, findMedicalRecord, findMedicalRecordByID, updateMedicalRecord } from "./medicalRecord.controller.js";
import { createMedicalRecordValidation, deleteMedicalRecordValidation, updateMedicalRecordValidation } from "./medicalRecord.validation.js";
import { isAuthenticate, isAuthorized } from "../../middleware/auth.middleware.js";
import { roles } from "../../Database/models/user.model.js";


const medicalRecordRouter = Router()

medicalRecordRouter.post('/create-medical-record',isAuthenticate,isAuthorized(roles.DOCTOR, roles.SUPERADMIN), validation(createMedicalRecordValidation), createMedicalRecord)
// medicalRecordRouter.get('/', findMedicalRecord)
medicalRecordRouter.get('/:national_ID',isAuthenticate, findMedicalRecordByID)
medicalRecordRouter.patch('/update-medical-record/:national_ID/:id',isAuthenticate,isAuthorized(roles.DOCTOR , roles.SUPERADMIN), validation(updateMedicalRecordValidation), updateMedicalRecord)
medicalRecordRouter.delete('/delete-medical-record/:national_ID/:id',isAuthenticate,isAuthorized(roles.DOCTOR,roles.ADMIN, roles.SUPERADMIN), validation(deleteMedicalRecordValidation),deleteMedicalRecord)






export default medicalRecordRouter