const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const cornholeSchema = require("../../public/connections/cornholeSchema");

const connection = mysql.createConnection(cornholeSchema);

// Get all teams
router.get("/", (req, res) => {
    const sql = `SELECT * FROM teams;`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
        res.status(200);
    });
});

// test
router.get('/test', (req, res) => {
	res.send('test');
	res.status(200);
});

// Get a single team
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM teams WHERE team_id = ${id}`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);  
    });
});

// Create a team
router.post("/", (req, res) => {
    const { teamName } = req.body;
    if (!teamName ) {
        res.status(400).json({
            err: "Missing Data",
        });
    } else {
        const sql = `INSERT INTO teams VALUES (default, ${teamName}, 0});`;
        connection.query(sql, (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    }
});

// Update a team
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { teamName, eliminated } = req.body;

    let sql = `UPDATE teams SET team_name = ${teamName}, eliminated = ${eliminated} WHERE team_id = '${id}';`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Delete a task
router.delete("/:id", (req, res) => {
    const sql = `DELETE FROM teams WHERE team_id = '${req.params.id}';`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

module.exports = router;
