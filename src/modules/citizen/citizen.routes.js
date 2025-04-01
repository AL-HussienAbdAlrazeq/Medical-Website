import { Router } from "express";
import { createCitizen, deleteCitizen, findAllCitizen, findCitizenByID, findCitizenNationalID, updateCitizen } from "./citizen.controller.js";
import { validation } from "../../middleware/validation.middleware.js";
import { createCitizenValidation, updateCitizenValidation } from "./citizen.validation.js";
import { isAuthenticate, isAuthorized } from "../../middleware/auth.middleware.js";
import { roles } from "../../Database/models/citizen.model.js";


const citizenRouter = Router()

citizenRouter.post('/create-citizen', isAuthenticate, isAuthorized(roles.DOCTOR), validation(createCitizenValidation), createCitizen)
// citizenRouter.get('/', findAllCitizen)
citizenRouter.get('/search', isAuthenticate, findCitizenNationalID)
// citizenRouter.get('/:id', findCitizenByID)

citizenRouter.patch('/update-citizen/:id', validation(updateCitizenValidation),isAuthenticate,isAuthorized(roles.DOCTOR,roles.ADMIN), updateCitizen)
citizenRouter.delete('/delete-citizen/:id', isAuthenticate,isAuthorized(roles.ADMIN),deleteCitizen)






export default citizenRouter