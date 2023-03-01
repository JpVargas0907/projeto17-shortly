import { urlShortenSchema } from "../schemas/urlShortenSchema.js";

export default async function urlShortenMiddleware(req, res, next) {
  const validation = urlShortenSchema.validate(req.body);
  if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}
