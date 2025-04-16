import { Router } from "express";
import { roles } from "../../Database/models/user.model.js";
import { isAuthenticate, isAuthorized } from "../../middleware/auth.middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
import { createCitizen, deleteCitizen, findCitizenNationalID, updateCitizen } from "./citizen.controller.js";
import { createCitizenValidation, deleteCitizenValidation, updateCitizenValidation } from "./citizen.validation.js";



const citizenRouter = Router()
citizenRouter.post('/create-citizen', isAuthenticate, isAuthorized(roles.DOCTOR, roles.SUPERADMIN), validation(createCitizenValidation), createCitizen)
// citizenRouter.get('/', findAllCitizen)
citizenRouter.get('/search', isAuthenticate, findCitizenNationalID)
// citizenRouter.get('/:id', findCitizenByID)

citizenRouter.patch('/update-citizen/:national_ID', isAuthenticate, isAuthorized(roles.DOCTOR, roles.ADMIN, roles.SUPERADMIN), validation(updateCitizenValidation), updateCitizen)
citizenRouter.delete('/delete-citizen/:national_ID', isAuthenticate, isAuthorized(roles.ADMIN, roles.SUPERADMIN), validation(deleteCitizenValidation), deleteCitizen)






export default citizenRouter