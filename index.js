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
