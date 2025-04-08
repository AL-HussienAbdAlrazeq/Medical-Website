import { Router } from "express";
import { validation } from "../../middleware/validation.middleware.js";

import { fileTypes, uploadCloudFile } from "../../utils/multer/cloud.multer.js";
import { createRadiology, deleteRadiology, findAllRadiology, findRadiologyByID, updateRadiology } from "./radiology.controller.js";
import { createRadiologyValidation, deleteRadiologyValidation, updateRadiologyValidation } from "./radiology.validation.js";
import { isAuthenticate, isAuthorized } from "../../middleware/auth.middleware.js";
import { roles } from "../../Database/models/user.model.js";


const radiologyRouter = Router()

radiologyRouter.post('/create-radiology',
    isAuthenticate, isAuthorized(roles.DOCTOR),
    uploadCloudFile(fileTypes.allowedAttachments).array('images', 2),
    validation(createRadiologyValidation),
    createRadiology
)
// radiologyRouter.post('/create-radiology', uploadCloudFile(fileTypes.allowedAttachments).single('image'),validation(createRadiologyValidation), createRadiology)

// radiologyRouter.get('/', findAllRadiology)
radiologyRouter.get('/:national_ID', findRadiologyByID)
radiologyRouter.patch('/update-citizen/:national_ID',
    isAuthenticate, isAuthorized(roles.DOCTOR),
    uploadCloudFile(fileTypes.allowedAttachments).array('images', 2),
    validation(updateRadiologyValidation),
    updateRadiology
)
radiologyRouter.delete('/delete-citizen/:national_ID', isAuthenticate, isAuthorized(roles.DOCTOR,roles.ADMIN), validation(deleteRadiologyValidation), deleteRadiology)






export default radiologyRouter