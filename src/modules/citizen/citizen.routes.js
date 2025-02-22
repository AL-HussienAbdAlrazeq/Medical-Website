import { Router } from "express";
import { createCitizen, deleteCitizen, findAllCitizen, findCitizenByID, findCitizenNationalID, updateCitizen } from "./citizen.controller.js";
import { validation } from "../../middleware/validation.middleware.js";
import { createCitizenValidation, updateCitizenValidation } from "./citizen.validation.js";

const citizenRouter = Router()

citizenRouter.post('/create-citizen', validation(createCitizenValidation), createCitizen)
citizenRouter.get('/', findAllCitizen)
citizenRouter.get('/search', findCitizenNationalID)
citizenRouter.get('/:id', findCitizenByID)

citizenRouter.patch('/update-citizen/:id', validation(updateCitizenValidation), updateCitizen)
citizenRouter.delete('/delete-citizen/:id', deleteCitizen)






export default citizenRouter