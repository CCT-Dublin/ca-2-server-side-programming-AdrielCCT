// public/form.js

document.getElementById("dataForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const first_name = document.getElementById("first_name").value.trim();
    const second_name = document.getElementById("second_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const eircode = document.getElementById("eircode").value.trim();

    const valid =
        /^[a-zA-Z0-9]{1,20}$/.test(first_name) &&
        /^[a-zA-Z0-9]{1,20}$/.test(second_name) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
        /^[0-9]{10}$/.test(phone) &&
        /^[0-9][a-zA-Z0-9]{5}$/.test(eircode);

    if (!valid) {
        alert("Validation failed. Check the fields.");
        return;
    }

    const response = await fetch("/submit-form", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ first_name, second_name, email, phone, eircode })
    });

    const result = await response.json();
    alert(result.message);
});
