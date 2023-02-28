import { db } from "../database/postgres.js";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

export async function urlShorten(req, res) {
  const user = req.user;
  const { url } = req.body;
  const shortUrl = nanoid(8);
  const userId = await db.query(
    `SELECT id FROM "public.users" WHERE email = $1`,
    [user.email]
  );
  const createdAt = dayjs();
  const views = 0;

  try {
    const query = await db.query(
      `INSERT INTO "public.urls" ("createdAt", url, "shortUrl", views, "userId") VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [createdAt, url, shortUrl, views, userId.rows[0].id]
    );
    const id = query.rows[0].id;

    res.status(201).json({ id, shortUrl });
  } catch (error) {
    res.sendStatus(401);
  }
}

export async function getUrlById(req, res) {
  const id = req.params.id;

  try {
    const url = await db.query(
      `SELECT id, "shortUrl", url FROM "public.urls" WHERE id=$1`,
      [id]
    );

    if (url.rowCount > 0) {
      res.send(url.rows[0]).status(200);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (error) {
    res.send(error.message);
  }
}

export async function openUrlByShortUrl(req, res) {
  const shortUrl = req.params.shortUrl;

  try {
    const urlBody = await db.query(
      `SELECT url FROM "public.urls" WHERE "shortUrl" = $1`,
      [shortUrl]
    );

    if (urlBody.rowCount > 0) {
      res.redirect(urlBody.rows[0].url);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.send(error.message);
  }
}
