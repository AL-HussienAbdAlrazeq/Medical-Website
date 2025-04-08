

import jwt from "jsonwebtoken";
import Citizen from "../Database/models/citizen.model.js";
import User from "../Database/models/user.model.js";

export const isAuthenticate = async (req, res, next) => {
  try {
    // get data from req
    const { authorization } = req.headers;
    if (!authorization)
      return next(new Error("token required", { cause: 401 }));

    if (!authorization.startsWith("Bearer")) {
      return res
        .status(400)
        .json({ success: false, message: "invalid bearer key" });
    }

    const token = authorization.split(" ")[1]; // [Bearer,token]

    //  check token
    const { email } = jwt.verify(token, process.env.SECRET_JWT);

    const user = await User.findOne({ email }, { password: 0 }); // {} | null
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    req.user = user;
    return next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new Error("not authorized!", { cause: 401 }));
    return next();
  };
};

