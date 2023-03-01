import { db } from "../database/postgres.js";

export default async function rankingController(req, res) {
  try {
    const ranking = await db.query(`
    SELECT
    users.id,
    users.name,
    COUNT(urls.id) AS "linksCount",
    COALESCE(SUM(urls.views), 0) AS "visitCount"
  FROM 
    "public.users" AS users
    LEFT JOIN "public.urls" AS urls ON users.id = urls."userId"
  GROUP BY
    users.id
  ORDER BY
    "visitCount" DESC
  LIMIT
    10
`);

    res.send(ranking.rows);
  } catch (error) {
    res.send(error.message);
  }
}
