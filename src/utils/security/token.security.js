import jwt from "jsonwebtoken";

export const verifyToken = ({ token, secretKey = process.env.SECRET_JWT }) => {
  try {
    return jwt.verify(token, secretKey); // obj >> id , email
  } catch (error) {
    return { error }; // obj >> error
  } // payload , throw error
};


export const generateToken = ({
  payload,
  secretKey = process.env.SECRET_JWT,
  options = {},
}) => {
  return jwt.sign(payload, secretKey, options);
};