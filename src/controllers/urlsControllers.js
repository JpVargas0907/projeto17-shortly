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
      `SELECT url, views FROM "public.urls" WHERE "shortUrl" = $1`,
      [shortUrl]
    );

    if (urlBody.rowCount > 0) {
      const viewCounter = urlBody.rows[0].views + 1;

      await db.query(
        `UPDATE "public.urls" SET views = $1 WHERE "shortUrl" = $2`,
        [viewCounter, shortUrl]
      );

      res.redirect(urlBody.rows[0].url);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.send(error.message);
  }
}

export async function deleteUrl(req, res) {
  const urlId = req.params.id;
  const user = req.user;
  const urlUserId = await db.query(
    `SELECT "userId" FROM "public.urls" WHERE id = $1`,
    [urlId]
  );
  const userId = await db.query(
    `SELECT id FROM "public.users" WHERE  email = $1`,
    [user.email]
  );

  try {
    if (urlUserId.rowCount > 0) {
      if (urlUserId.rows[0].userId !== userId.rows[0].id) {
        res.sendStatus(401);
      } else {
        await db.query(`DELETE FROM "public.urls" WHERE id = $1`, [urlId]);
        res.sendStatus(204);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.send(error.message);
  }
}
