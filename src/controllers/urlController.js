import { connection } from "../database.js";


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
    try {
        
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}