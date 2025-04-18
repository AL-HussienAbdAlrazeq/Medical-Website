import Citizen from "../../Database/models/citizen.model.js";
import MedicalRecord from "../../Database/models/medical_record.model.js";
import Radiology from "../../Database/models/radiology.model.js";
import User, { roles } from "../../Database/models/user.model.js";
import { asyncHandler } from "../../utils/errors/error.response.js";
import { successResponse } from "../../utils/response/success.response.js";



export const dashboard = asyncHandler(async (req, res, next) => {
    const { national_ID } = req.query
    const citizen = await Citizen.findOne({ national_ID })
    if (!citizen) {
        return next(new Error("Citizen does not exist or invalid ID"));
    }
    const result = await Promise.allSettled([
        await User.find({ _id: req.user._id }).select('userName email'),
        await MedicalRecord.find({ national_ID }),
        await Radiology.find({ national_ID })
    ])

    return successResponse({ res, data: { result } });
});


export const changeRole = asyncHandler(async (req, res, next) => {
    const { role } = req.body
    const { email } = req.body

    // const changeRole = req.user.role === roles.SUPERADMIN
    //     ? { role: { $nin: [roles.SUPERADMIN] } }
    //     : { role: { $nin: [roles.ADMIN, roles.SUPERADMIN] } }

    //   const user = await User.findOneAndUpdate(
    //     { national_ID: national_ID, ...changeRole },
    //     { role },
    //     { new: true }
    //   )


    const user = await User.findOneAndUpdate({ email },
        { role },
        { new: true }
    )
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found or unauthorized update" });
    }
    return successResponse({ res, data: { user } });

});
