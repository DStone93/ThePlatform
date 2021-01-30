import dotenv from 'dotenv';
dotenv.config();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: process.env.MYSQL_CONNECTION_STRING,
    user: 'admin',
    password: process.env.MYSQL_PASSWORD,
    database: 'mydb'
})

export interface articlePurchase {
    user_id:number,
    article_id: number
}

export const UserOwnsArticle = {

    create: async(purchase:articlePurchase) => {
        connection.query(`INSERT INTO user_has_article (article_id, user_id) VALUES (${purchase.article_id}, ${purchase.user_id})`,
        function(err:any, result:any){
            if(err)
            {
                throw err;
            } else {
                result;
            }
        });
    },

    retrieve: async(user_id:number):Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            connection.query(`SELECT * FROM user_has_article WHERE user_id = ${user_id}`, function(err:any, result:any){
                if(err){
                    throw err
                } else {
                    resolve(result)
                }
            })
        })
    }
}