import bcrypt from 'bcrypt';
import { connection } from '../database.js';

export async function createUser(req, res) {
  const user = req.body;

  try {
    const existingUsers = await connection.query('SELECT * FROM users WHERE email=$1', [user.email])
    if (existingUsers.rowCount > 0) {
      return res.sendStatus(409);
    }

    const passwordHash = bcrypt.hashSync(user.password, 10);

    await connection.query(`
      INSERT INTO 
        users(name, email, password) 
      VALUES ($1, $2, $3)
    `, [user.name, user.email, passwordHash])

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUser(req, res) {
  const { user } = res.locals;

  user.shortenedUrls = [];

  try {
    res.send(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUserById(req, res) {

  const { id } = req.params;

  try {

    const result = await connection.query(`
    SELECT u.id, u.name, ur.id, ur."shortUrl", ur.url, ur."visitCount", sub.total 
    FROM users u
    JOIN urls ur ON u.id=ur."userId"
    JOIN (
        SELECT ur2."userId" AS "subUserId", SUM(ur2."visitCount") AS total
        FROM urls ur2
        WHERE ur2."userId"=$1
        GROUP BY ur2."userId"
    ) AS sub ON sub."subUserId"=ur."userId"
    WHERE ur."userId"=$1
    `, [id]);


    result.rows.map(r =>{
      return ([]
      )
    });



    res.send(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}