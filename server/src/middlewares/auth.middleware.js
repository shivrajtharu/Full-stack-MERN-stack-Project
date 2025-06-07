import jwt from "jsonwebtoken";

const permissionCheck = async (req, res, next) => {
  try {
    let token = req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];

    if (!token && req.query?.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(401).json({
        code: 401,
        error: true,
        success: false,
        message: "Token is required",
        status: "UNAUTHORIZED",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decoded) {
      return res.status(401).json({
        code: 401,
        error: true,
        success: false,
        message: "Invalid token",
        status: "UNAUTHORIZED",
      });
    }

    req.userId = decoded.id;
    next();
  } catch (exception) {
    const errObj = {
      code: exception.code || 401,
      error: true,
      success: false,
      message: exception.message,
      status: "UNAUTHORIZED",
    };

    if (exception instanceof jwt.TokenExpiredError) {
      errObj.status = "TOKEN_EXPIRED";
    } else if (exception instanceof jwt.JsonWebTokenError) {
      errObj.status = "TOKEN_ERROR";
    }

    next(errObj);
  }
};

export default permissionCheck;