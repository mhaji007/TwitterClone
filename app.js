const express = require("express")
require("dotenv").config();


const app = express();

const port = process.env.PORT;

const server = app.listen(port, () => console.log("Server listenin on port " + port))
