import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
import { TokenModel } from "../models/token.model.js";

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken2Db(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }

    const token = new TokenModel({ refreshToken, user: userId });
    await token.save();
    return token;
  }
}

export const tokenService = new TokenService();
