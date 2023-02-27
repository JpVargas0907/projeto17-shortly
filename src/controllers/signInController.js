import jwt from "jsonwebtoken";

export async function signIn(req, res) {
  const user = req.body;
  const token = jwt.sign(user, "minha-chave-secreta", { expiresIn: "1h" });

  try {
    res.status(200).json({ token });
  } catch (error) {
    return res.send(error.message);
  }
}
