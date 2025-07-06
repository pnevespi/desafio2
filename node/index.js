const express = require('express');
const mysql = require('mysql2/promise'); // Usando mysql2/promise para async/await

const app = express();
const port = 3000;

const dbConfig = {
    host: process.env.MYSQL_HOST || 'db', // Nome do serviço 'db' no docker-compose
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root_password',
    database: process.env.MYSQL_DATABASE || 'nodedb'
};

async function createTableIfNotExists(connection) {
    const createTableSql = `
        CREATE TABLE IF NOT EXISTS people (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
    `;
    await connection.execute(createTableSql);
    console.log("Table 'people' checked/created successfully.");
}

app.get('/', async (req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        await createTableIfNotExists(connection);

        const name = 'Full Cycle ' + Math.random().toString(36).substring(7); // Nome aleatório para demonstração
        const insertSql = `INSERT INTO people (name) VALUES (?)`;
        await connection.execute(insertSql, [name]);
        console.log(`Inserted new person: ${name}`);

        const [rows] = await connection.execute('SELECT name FROM people');
        const peopleList = rows.map(row => `<li>${row.name}</li>`).join('');

        res.send(`
            <h1>Full Cycle Rocks!</h1>
            <h2>Lista de nomes cadastrada no banco de dados:</h2>
            <ul>
                ${peopleList}
            </ul>
        `);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('<h1>Erro ao acessar o banco de dados.</h1>');
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

app.listen(port, () => {
    console.log(`Node.js app listening on port ${port}`);
});
