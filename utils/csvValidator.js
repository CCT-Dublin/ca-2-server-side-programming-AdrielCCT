// utils/csvValidator.js

function validateCSV(csvText) {
    const lines = csvText.split("\n");
    const validRows = [];
    const errors = [];
    lines.forEach((line, index) => {
        const cols = line.split(",");

        if (cols.length !== 5) {
            errors.push(`Row ${index + 1}: wrong number of columns`);
            return;
        }
        const [first_name, second_name, email, phone, eircode] = cols.map(v => v.trim());

        const valid =
            /^[a-zA-Z0-9]{1,20}$/.test(first_name) &&
            /^[a-zA-Z0-9]{1,20}$/.test(second_name) &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
            /^[0-9]{10}$/.test(phone) &&
            /^[0-9][a-zA-Z0-9]{5}$/.test(eircode);

        if (!valid) {
            errors.push(`Row ${index + 1}: invalid field(s).`);
            return;
        }
        validRows.push({ first_name, second_name, email, phone, eircode });
    });

    return { validRows, errors };
}

module.exports = { validateCSV };
