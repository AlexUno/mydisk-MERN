import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { tokenService } from "../services/token.service.js";
import { UserDto } from "../dtos/user.dto.js";
import { HttpError } from "../exceptions/http.error.js";

class AuthService {
  async getDataForResponse(user) {
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken2Db(userDto.id, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens,
    };
  }

  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw HttpError.BadRequest(`User with this email address already exists`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const user = new UserModel({ email, password: hashPassword });
    await user.save();

    return await this.getDataForResponse(user);
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw HttpError.BadRequest("User with this email address was not found");
    }

    const isComparePassword = await bcrypt.compare(password, user.password);
    if (!isComparePassword) {
      throw HttpError.BadRequest("Invalid password");
    }

    return await this.getDataForResponse(user);
  }

  async logout(refreshToken) {
    const token = await tokenService.removeTokenFromDb(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw HttpError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken2Db(refreshToken);

    if (!userData || !tokenFromDb) {
      throw HttpError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    return await this.getDataForResponse(user);
  }
}

export const authService = new AuthService();
