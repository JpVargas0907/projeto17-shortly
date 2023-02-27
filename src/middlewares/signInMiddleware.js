import { db } from "../database/postgres.js";
import { signInSchema } from "../schemas/signInSchema.js";
import bcrypt from "bcryptjs";

export default async function validateLogin(req, res, next) {
  const validation = signInSchema.validate(req.body);
  const { email, password } = req.body;
  const verifyEmailRegister = await db.query(
    `SELECT * FROM "public.users" WHERE email = $1`,
    [email]
  );
  const hashedPassword = await db.query(
    `SELECT password FROM "public.users" WHERE email = $1`,
    [email]
  );

  if (validation.error) {
    return res.sendStatus(422);
  } else if (verifyEmailRegister.rowCount === 0) {
    return res.sendStatus(401);
  }

  const isPasswordValid = bcrypt.compareSync(
    password,
    hashedPassword.rows[0].password
  );

  if (isPasswordValid === false) {
    return res.sendStatus(401);
  }

  next();
}
