import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { tokenService } from "../services/token.service.js";
import { UserDto } from "../dtos/user.dto.js";
import { HttpError } from "../exceptions/http.error.js";

class AuthService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw HttpError.BadRequest(`User with this email address already exists`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const user = new UserModel({ email, password: hashPassword });
    await user.save();

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken2Db(userDto.id, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens,
    };
  }
}

export const authService = new AuthService();
