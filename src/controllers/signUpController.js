import {db} from '../database/postgres.js'
import dayjs from 'dayjs';


export async function registerUser(req, res){
    const {name, email, password } = req.body;
    const createdAt = dayjs();
    try {
        await db.query(`INSERT INTO "public.users" (name, email, password, createdAt) VALUES ($1, $2, $3, $4)`, [name, email, password, createdAt]);
        return res.sendStatus(201);
    } catch (error) {
        return res.send(error.message);
    }
}
