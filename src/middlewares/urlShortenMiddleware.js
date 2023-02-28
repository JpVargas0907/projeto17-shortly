import { urlShortenSchema } from "../schemas/urlShortenSchema.js";

export default async function urlShortenMiddleware(req, res, next) {
  const validation = urlShortenSchema.validate(req.body);
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.sendStatus(401);
  } else if (validation.error) {
    return res.sendStatus(422);
  }

  next();
}
