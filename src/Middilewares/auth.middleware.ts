import { Request, NextFunction, Response } from "express";

const jwt = require("jsonwebtoken");

function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      Object.assign(req.body, { user: decoded });
      next();
    } catch (error) {      
      // Token verification failed, send a 401 Unauthorized response
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
}

export default auth;
