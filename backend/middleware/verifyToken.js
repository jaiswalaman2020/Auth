import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized-Token is required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    //check if user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "user no longer exists" });
    }

    //check if user changed password after token was issued

    console.log("decoded", decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(501).json({ success: false, message: "Server Error" });
  }
};
