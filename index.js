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

//Check Database
db.ensureSchema();

//Route Csv Upload
app.post("/upload-csv", async (req, res) => {
    try {
        if (!req.files || !req.files.csvfile) {
            return res.status(400).send("CSV file missing.");
        }

        const csvFile = req.files.csvfile;
        const uploadPath = path.join(__dirname, "uploads", "dataset.csv");

        await csvFile.mv(uploadPath);

        const csvData = fs.readFileSync(uploadPath, "utf8");
        const { validRows, errors } = validateCSV(csvData);

        if (errors.length > 0) {
            return res.status(400).json({
                message: "Invalid CSV rows found.",
                errors,
            });
        }

        for (const row of validRows) {
            await db.insertRow(row);
        }

        res.json({ message: "CSV processed successfully", inserted: validRows.length });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
});

//Route: form submission
app.post("/submit-form", async (req, res) => {
    try {
        const { first_name, second_name, email, phone, eircode } = req.body;

        const cleanInput = {
            first_name: String(first_name).replace(/[^a-zA-Z0-9]/g, ""),
            second_name: String(second_name).replace(/[^a-zA-Z0-9]/g, ""),
            email: String(email).trim(),
            phone: String(phone).replace(/\D/g, ""),
            eircode: String(eircode).trim(),
        };

        await db.insertRow(cleanInput);

        res.json({ message: "Form data saved successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal error");
    }
});
