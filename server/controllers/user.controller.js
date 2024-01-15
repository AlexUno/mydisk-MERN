class UserController {
  async getUser(req, res, next) {
    try {
      res.json(["1", "2", "3"]);
    } catch (e) {}
  }
}

export const userController = new UserController();
