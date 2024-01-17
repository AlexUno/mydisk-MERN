import { HttpError } from "../exceptions/http.error.js";
import { tokenService } from "../services/token.service.js";

export const authMiddleware = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(HttpError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(HttpError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(HttpError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(HttpError.UnauthorizedError());
  }
};
