import { urlShortenSchema } from "../schemas/urlShortenSchema.js";
import jwt from "jsonwebtoken";

export default async function urlShortenMiddleware(req, res, next) {
  const validation = urlShortenSchema.validate(req.body);
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.send("Deu ruim");
  } else if (validation.error) {
    return res.sendStatus(422);
  }

  try {
    const decoded = jwt.verify(token, "minha-chave-secreta");
    req.user = decoded;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}
