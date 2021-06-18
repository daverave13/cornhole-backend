const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const cors = require("cors");
const https = require("https");
const fs = require("fs");

const app = express();

// Initialize middleware
app.use(logger);
app.use(cors());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set a static folder
// public/index.html will be served by default
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/games", require("./routes/api/games"));
app.use("/api/teams", require("./routes/api/teams"));

const PORT = process.env.PORT || 5000;

// app.listen(PORT);


//Listen both http & https ports
const httpsServer = https.createServer({
	key: fs.readFileSync('/etc/letsencrypt/live/dslusser.com/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/dslusser.com/fullchain.pem'),	
}, app);

httpsServer.listen(5000, "0.0.0.0");
