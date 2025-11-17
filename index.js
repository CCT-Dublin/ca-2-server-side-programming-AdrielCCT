const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const https = require("https");
const { validateCSV } = require("./utils/csvValidator");
const db = require("./database");

const app = express();
const PORT = 3000;

//Security Middleware
app.use(helmet()); // CSP, XSS protection, secure headers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static("public"));

//Check Server Port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});