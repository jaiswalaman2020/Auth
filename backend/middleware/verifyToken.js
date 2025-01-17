import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model.js";
import { Google } from "../models/google.model.js";

dotenv.config({ path: "../.env" });

// export const verifyToken = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Unauthorized-Token is required" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded) {
//       return res.status(401).json({ success: false, message: "Invalid token" });
//     }

//     //check if user exists
//     const user = await User.findById(decoded.userId);
//     if (!user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "user no longer exists" });
//     }

//     // console.log("decoded", decoded);
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     return res.status(501).json({ success: false, message: "Serverss Error" });
//   }
// };

// export const verifyToken = async (req, res, next) => {
//   // 1. Check for session (Google login)
//   let session = req.session;
//   if (!session) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Unauthorized-Token is required" });
//   }
//   if (session) {
//     try {
//       const googleUser = await Google.findOne({ googleId: req.user.googleId });
//       if (!googleUser) {
//         return res
//           .status(401)
//           .json({ success: false, message: "Google user no longer exists" });
//       }
//       req.userId = googleUser._id;
//       req.userType = "google"; // Add user type for future use
//       return next();
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Server Error during session check" });
//     }
//   }

//   // 2. Fallback to JWT verification (Username/Password login)
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized - Token or Session required",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded) {
//       return res.status(401).json({ success: false, message: "Invalid token" });
//     }

//     const user = await User.findById(decoded.userId);
//     if (!user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "User no longer exists" });
//     }

//     req.userId = user._id;
//     req.userType = "jwt"; // Add user type for future use
//     next();
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server Error during token verification",
//     });
//   }
// };

export const verifyToken = async (req, res, next) => {
  // 1. Check for session (Google login)
  if (req.isAuthenticated && req.isAuthenticated()) {
    try {
      const googleUser = await User.findOne({ googleId: req.user.googleId });
      console.log("googleUser", googleUser);
      if (!googleUser) {
        return res
          .status(401)
          .json({ success: false, message: "Google user no longer exists" });
      }
      req.userId = googleUser._id;
      req.userType = "google"; // Add user type for future use
      return next();
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Server Error during session check" });
    }
  }

  // 2. Fallback to JWT verification (Username/Password login)
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Token or Session required",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User no longer exists" });
    }

    req.userId = user._id;
    req.userType = "jwt";
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error during token verification",
    });
  }
};
