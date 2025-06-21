import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    console.log("hi")
    const token = req.headers.authorization?.split(" ")[1];
    //console.log("Token received:", token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware;
