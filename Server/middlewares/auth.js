const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const Prisma = new PrismaClient();

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.cookies.token ||
      (req.headers.authorization &&
        req.headers.authorization.replace("Bearer ", ""));
    console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      console.log(decode);
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or expired.",
        error: e.message,
      });
    }
    next();
  } catch (e) {
    console.error("Auth middleware error:", e);
    return res.status(500).json({
      success: false,
      message: "An error occurred during authorization.",
      error: e.message,
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const details = await Prisma.user.findUnique({
      where: { phone: req.user.contact },
    });
    if (details.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Only Admin is Authorized in this Route",
      });
    }
    next();
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "User Role cannot be verified",
    });
  }
};

exports.isOwner = async (req, res, next) => {
  try {
    const details = await Prisma.user.findUnique({    
      where: { phone: req.user.phone },
    });
    if (details.accountType !== "Owner") {
      return res.status(401).json({
        success: false,
        message: "Only Owner is Authorized in this Route",
      });
    }
    next();
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "User Role cannot be verified",
    });
  }
};

exports.isTenant = async (req, res, next) => {
  try {
    const details = await Prisma.user.findUnique({
      where: { phone: req.user.contact },
    });
    if (details.accountType !== "Tenant") {
      return res.status(401).json({
        success: false,
        message: "Only Tenant is Authorized in this Route",
      });
    }
    next();
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "User Role cannot be verified",
    });
  }
};
