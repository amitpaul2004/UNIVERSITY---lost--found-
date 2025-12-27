const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// --- EMAIL CONFIGURATION ---
// ⚠️ REPLACE WITH YOUR REAL CREDENTIALS
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rdxeveil@gmail.com',  // <--- YOUR EMAIL
        pass: 'xdbo bzau wsqi wlde'    // <--- YOUR APP PASSWORD
    }
});

app.post('/send-report', async (req, res) => {
    const { userEmail, Name, itemName, refId, dateLost, location } = req.body;

    console.log(`Sending email to ${userEmail} for Ref: ${refId}`);

    const mailOptions = {
        from: '"JISU Student Services" <your_email@gmail.com>',
        to: userEmail,
        subject: `ACTION REQUIRED: Report Submitted (${refId})`,
        html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                
                <div style="background-color: #1e2a5e; padding: 20px; text-align: center; color: white;">
                    <h2 style="margin: 0;">Report Received</h2>
                </div>

                <div style="padding: 30px; background-color: #ffffff;">
                    <p>Dear <strong>${Name}</strong>,</p>
                    <p>Your report has been successfully logged in our system.</p>

                    <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #3b82f6; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>Ref ID:</strong> <span style="font-family: monospace; color: #1e2a5e;">${refId}</span></p>
                        <p style="margin: 5px 0;"><strong>Item:</strong> ${itemName}</p>
                        <p style="margin: 5px 0;"><strong>Date:</strong> ${dateLost}</p>
                        <p style="margin: 5px 0;"><strong>Location:</strong> ${location}</p>
                    </div>

                    <div style="background-color: #fffbeb; border: 1px solid #fcd34d; padding: 15px; border-radius: 6px; margin-top: 25px;">
                        <h3 style="color: #92400e; margin-top: 0; font-size: 16px;">⚠️ Action Required</h3>
                        <p style="color: #b45309; margin-bottom: 0; font-size: 14px;">
                            Please <strong>visit the Library Help Desk</strong> immediately to submit the found item or verify your lost item claim.
                            <br>Quote your Reference ID at the desk.
                        </p>
                    </div>

                  <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">

                    <h3 style="color: #1e2a5e; font-size: 16px; margin-bottom: 10px;">Track Your Request</h3>
                    <p style="color: #666; font-size: 14px;">
                        You can check the current status of your report at any time on our website using your Reference ID.
                    </p>
                    <a href="http://localhost:5500/claim_status.html" style="display: inline-block; background-color: #1e2a5e; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold; font-size: 14px; margin-top: 5px;">Check Status</a>
                </div>

                <div style="background-color: #f1f5f9; padding: 15px; text-align: center; color: #888; font-size: 12px;">
                    &copy; 2025 JIS University Student Services. <br>
                    This is an automated message. Please do not reply directly to this email.
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email Sent" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Failed" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});