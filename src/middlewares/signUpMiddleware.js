
import { db } from '../database/postgres.js';   
import { signUpSchema } from '../schemas/singUpSchema.js';

export default async function validateUser(req, res, next){
    const validation = signUpSchema.validate(req.body);
    const { email, password, confirmPassword } = req.body;
    const verifyEmailRegister = await db.query(`SELECT * FROM "public.users" WHERE email = $1`, [email]);

    if(validation.error || password != confirmPassword){
        return res.sendStatus(422);
    } else if (verifyEmailRegister.rowCount > 0){
        return res.sendStatus(409);
    }

    next();
}

