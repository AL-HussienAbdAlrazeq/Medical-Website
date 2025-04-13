import { Router } from "express";
import { isAuthenticate, isAuthorized } from "../../middleware/auth.middleware.js";

import { roles } from "../../Database/models/user.model.js";
import { changeRole, dashboard } from "./user.controller.js";
import { endPoint } from "./user.authorization.js";

const userRouter = Router()
userRouter.get('/dashboard', isAuthenticate, isAuthorized(roles.DOCTOR, roles.ADMIN, roles.SUPERADMIN), dashboard)
userRouter.patch('/dashboard/role', isAuthenticate, isAuthorized(roles.SUPERADMIN), changeRole)

export default userRouter