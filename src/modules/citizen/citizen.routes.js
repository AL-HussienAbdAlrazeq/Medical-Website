import { Router } from "express";
import { createCitizen, deleteCitizen, findAllCitizen, findCitizenByID, findCitizenNationalID, updateCitizen } from "./citizen.controller.js";
import { validation } from "../../middleware/validation.middleware.js";
import { createCitizenValidation, deleteCitizenValidation, updateCitizenValidation } from "./citizen.validation.js";
import { isAuthenticate, isAuthorized } from "../../middleware/auth.middleware.js";
import { roles } from "../../Database/models/user.model.js";



const citizenRouter = Router()

citizenRouter.post('/create-citizen', isAuthenticate, isAuthorized(roles.DOCTOR), validation(createCitizenValidation), createCitizen)
// citizenRouter.get('/', findAllCitizen)
citizenRouter.get('/search', isAuthenticate, findCitizenNationalID)
// citizenRouter.get('/:id', findCitizenByID)

citizenRouter.patch('/update-citizen/:id', isAuthenticate, isAuthorized(roles.DOCTOR, roles.ADMIN), validation(updateCitizenValidation), updateCitizen)
citizenRouter.delete('/delete-citizen/:national_ID', isAuthenticate, isAuthorized(roles.ADMIN), validation(deleteCitizenValidation),deleteCitizen)






export default citizenRouter