import mysql from "mysql";

const connection = mysql.createConnection({
    host: "192.168.0.100",
    user: "hapi-server",
    password: "abc123!",
    database: "buy-and-sell",
    debug: true
});

export const db = {
    connect: () => connection.connect(error => {
        if (error) {            
            console.log(`Error on DB connect.`, error);
        }
        console.log("Connected to DB.");
    }),    
    query: (queryString, escapedValues) =>
        new Promise((resolve, reject) => {
            connection.query(queryString, escapedValues, (error, results, fields) => {
                if (error) reject(error);
                resolve({ results, fields });
            })
        }),
    end: () => connection.end(error => {
        if (error) {            
            console.log(`Error on DB disconnect.`, error);
        }
        console.log("Disconnected from DB.");        
    })
};