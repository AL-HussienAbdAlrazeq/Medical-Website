import { Router } from "express";
import { validation } from "../../middleware/validation.middleware.js";

import { fileTypes, uploadCloudFile } from "../../utils/multer/cloud.multer.js";
import { createRadiology, deleteRadiology, findAllRadiology, findRadiologyByID, updateRadiology } from "./radiology.controller.js";
import { createRadiologyValidation, updateRadiologyValidation } from "./radiology.validation.js";

const radiologyRouter = Router()

radiologyRouter.post('/create-radiology', uploadCloudFile(fileTypes.allowedAttachments).array('images',2),validation(createRadiologyValidation), createRadiology)
// radiologyRouter.post('/create-radiology', uploadCloudFile(fileTypes.allowedAttachments).single('image'),validation(createRadiologyValidation), createRadiology)

radiologyRouter.get('/', findAllRadiology)
radiologyRouter.get('/:id', findRadiologyByID)
radiologyRouter.patch('/update-citizen/:id', uploadCloudFile(fileTypes.image).array('images',2),validation(updateRadiologyValidation), updateRadiology)
radiologyRouter.delete('/delete-citizen/:id', deleteRadiology)






export default radiologyRouter