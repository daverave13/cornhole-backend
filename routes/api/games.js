const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const cornholeSchema = require("../../public/connections/cornholeSchema");

const connection = mysql.createConnection(cornholeSchema);

// Get all games
router.get("/", (req, res) => {
    const sql = `SELECT * FROM games;`;
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

// Get a single Game
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM games WHERE game_id = ${id}`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);  
    });
});

// Create a game
router.post("/", (req, res) => {
    const { teamA, teamB, scoreA, scoreB, score_to_win, display_scoreA, display_scoreB } = req.body;
    if (!teamA || !teamB || scoreA < 0 || scoreB < 0 || score_to_win < 0 ) {
        res.status(400).json({
            err: "Missing Data",
        });
    } else {
        const sql = `INSERT INTO games VALUES (default, '${teamA}', '${teamB}', 0, 0, ${score_to_win}, ${display_scoreA || 0}, ${display_scoreB|| 0});`;
        connection.query(sql, (err, results) => {
            if (err) throw err;
            res.send(results);
        });
    }
});

// Update a game
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { teamA, teamB, scoreA, scoreB, score_to_win, display_scoreA, display_scoreB } = req.body;
	console.log(display_scoreA);

    if (display_scoreA === 'undefined') display_scoreA = 0;	
    if (display_scoreB === 'undefined') display_scoreB = 0;

    let sql = `UPDATE games SET teamA = '${teamA}', teamB = '${teamB}', scoreA = ${scoreA}, scoreB = ${scoreB}, score_to_win = ${score_to_win}, display_scoreA = ${display_scoreA}, display_scoreB = ${display_scoreB} WHERE game_id = '${id}';`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Delete a task
router.delete("/:id", (req, res) => {
    const sql = `DELETE FROM games WHERE game_id = '${req.params.id}';`;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

module.exports = router;
