// database.js
const mysql = require("mysql2/promise");

let connection;

async function connect() {
    if (!connection) {
        connection = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "secure_system"
        });
        console.log("Database connected.");
    }
    return connection;
}

async function ensureSchema() {
    const db = await connect();

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS mysql_table (
                                                   id INT AUTO_INCREMENT PRIMARY KEY,
                                                   first_name VARCHAR(20),
            second_name VARCHAR(20),
            email VARCHAR(255),
            phone VARCHAR(10),
            eircode VARCHAR(6)
            )
    `;

    await db.execute(createTableQuery);
    console.log("Schema validated.");
}

async function insertRow(data) {
    const db = await connect();

    const sql = `
        INSERT INTO mysql_table (first_name, second_name, email, phone, eircode)
        VALUES (?, ?, ?, ?, ?)
    `;

    await db.execute(sql, [
        data.first_name,
        data.second_name,
        data.email,
        data.phone,
        data.eircode
    ]);
}