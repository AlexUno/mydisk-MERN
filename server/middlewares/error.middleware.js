import { HttpError } from "../exceptions/http.error.js";

export const errorMiddleware = function (err, req, res, next) {
  console.log(err);

  if (err instanceof HttpError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: "Unexpected error" });
};
