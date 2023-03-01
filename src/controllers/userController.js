import { db } from "../database/postgres.js";

export default async function userController(req, res) {
  const user = req.user;

  try {
    const userData = await db.query(
      `
    SELECT 
      users.id, 
      users.name, 
      SUM(urls.views) AS "visitCount", 
      json_agg(
        json_build_object(
          'id', urls.id,
          'shortUrl', urls."shortUrl",
          'url', urls.url,
          'visitCount', urls.views
        )
      ) AS "shortenedUrls"
    FROM 
      "public.users" AS users
      LEFT JOIN "public.urls" AS urls ON users.id = urls."userId"
    WHERE 
      users.email = $1
    GROUP BY 
      users.id
  `,
      [user.email]
    );

    res.send(userData.rows[0]);
  } catch (error) {
    res.send(error.message);
  }
}
