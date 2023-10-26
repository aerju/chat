import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const generateToken = (id) => {
  return jwt.sign({ id }, "Screate!234", {
    expiresIn: "30d",
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        name: user.name,
        email: user.email,
        _id: user.id,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ errorMsg: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ errorMsg: "Inernal error" });
  }
};

export const signupController = async (req, res) => {
  const { name, email, password } = req.body;
  const bcryptPassword = await bcrypt.hash(password, 10);
  try {
    const existsUser = await User.findOne({ email: email });
    if (existsUser) {
      return res.status(400).json({ errorMsg: "user already exist" });
    }
    const user = await User.create({
      name,
      email,
      password: bcryptPassword,
      userStatus: true,
    });
    if (user) {
      res.status(200).json({
        name: user.name,
        email: user.email,
        _id: user.id,
        token: generateToken(user.id),
      });
    } else {
      res.status(500).json({ errorMsg: "Account Creation failed" });
    }
  } catch (error) {
    res.status(500).json({ errorMsg: "Inernal error" });
  }
};

// export const startChatController = async (req, res) => {
//   console.log(req.user);
//   io.on("connection", (socket) => {
//     console.log("Socket COnnected", socket);
//     io.on("disconnect", () => {
//       console.log("Socket Disconneted");
//     });
//   });
// };

// export const startChatController = async (req, res) => {
//   const { email } = req.user;
//   try {
//     const response = await User.aggregate([
//       {
//         $match: {
//           userStatus: true,
//           email: { $ne: email },
//         },
//       },
//       {
//         $sample: {
//           size: 1,
//         },
//       },
//     ]);

//     if (response.length > 0) {
//       const randomDocument = response[0];
//       res.status(200).json(randomDocument);
//     } else {
//       res.status(400).json({ errorMsg: "No matching documents found." });
//     }
//   } catch (error) {
//     res.status(500).json({ errorMsg: "Internal Error" });
//   }
// };
