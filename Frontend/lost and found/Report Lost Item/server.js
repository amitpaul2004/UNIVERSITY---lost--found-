const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware (Allows frontend to talk to backend)
app.use(cors());
app.use(bodyParser.json());

// --- EMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rdxeveil@gmail.com', // <--- PUT YOUR GMAIL HERE
        pass: 'xdbo bzau wsqi wlde'   // <--- PUT YOUR 16-CHAR APP PASSWORD HERE
    }
});

// --- THE ROUTE (The Postman) ---
app.post('/send-report', async (req, res) => {
    // 1. READ THE ADDRESS: We pull the email directly from what the user sent
    const { userEmail, collectorName, itemName, refId } = req.body;

    console.log(`Sending email to: ${userEmail}`); // Shows in your terminal who is getting mail

    // 2. WRITE THE LETTER
    const mailOptions = {
        from: '"JISU Library Services" <your_email@gmail.com>', // Sender (You)
        to: userEmail, // Receiver (The User) <--- This Variable Changes Every Time!
        subject: `Report Confirmation: ${refId}`,
        html: `
            <h3>Report Submitted Successfully</h3>
            <p>Hello <strong>${collectorName}</strong>,</p>
            <p>We received your report for: <strong>${itemName}</strong>.</p>
            <p>Your Reference ID is: <span style="font-family: monospace; font-size: 16px;">${refId}</span></p>
            <br>
            <p>Please visit the library help desk for further assistance.</p>
        `
    };

    // 3. SEND THE LETTER
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email Sent Successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});