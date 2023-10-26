import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";


export const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "Screate!234");
      const user=await User.findOne({_id:decoded.id}).select('-password')
      req.user=user
      next();
    } catch (error) {
      // console.log(error);
      res.status(401).json("Invalid Token & Autharization Error");
    }
  }
  if (!token) {
    console.log("No Token");
    res.status(401).json("Invalid Token");
  }
};
