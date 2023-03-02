import { db } from "../database/postgres.js";
import dayjs from "dayjs";
import bcrypt from "bcryptjs";

export async function registerUser(req, res) {
  const { name, email, password } = req.body;
  const createdAt = dayjs();
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    await db.query(
      `
      INSERT INTO 
          "public.users" (name, email, password, "createdAt") 
      VALUES 
          ($1, $2, $3, $4)`,
      [name, email, hashedPassword, createdAt]
    );
    return res.sendStatus(201);
  } catch (error) {
    return res.send(error.message);
  }
}
