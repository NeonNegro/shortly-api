import { connection } from "../database.js";
import {v4 as uuid} from "uuid";


export async function getUrl(req,res){

    const { shortUrl } = req.params; 

    try {
        const result = await connection.query(`
            SELECT id, "shortUrl", url
            FROM urls
            WHERE "shortUrl"=$1
        `,[shortUrl]);


        if(result.rowCount === 0){
            return res.sendstatus(404);
        }

        res.send(result.rows[0]);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function postUrl(req, res){

    const { link } = req.body;
    console.log(req.body);
    const { user } = res.locals;

    const shortenUrl = uuid().split('-')[0];

    try {
        await connection.query(`
            INSERT INTO urls 
                (url, "shortUrl", "userId" )
            VALUES
                ($1,$2,$3)
        `,[link, shortenUrl, user.id]);

        res.status(201).send({ shortenUrl });

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}