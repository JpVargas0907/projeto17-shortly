import jwt from "jsonwebtoken";

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = jwt.verify(token, "minha-chave-secreta");
    req.user = decoded;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}
