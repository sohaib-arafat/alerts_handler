const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASS
    }
});

  async function send(receiver, body) {
   await transporter.sendMail({
        from: '"Eco Track ♻️" sohaib.arafat@outlook.com',
        to: receiver,
        subject: "Alert ⚠️",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Environmental Alert</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f6f6f6;
            margin: 0;
            padding: 0;
        }

  

        header a {
            color: #ffffff;
            text-decoration: none;
            padding: 8px 15px;
            border-radius: 5px;
            background-color: #009688; /* Choose a color that complements your theme */
        }

        .container {
            max-width: 800px;
            margin: 20px auto;
            background: linear-gradient(to bottom, #004080, #00bfff);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
            color: #ffffff;
            position: relative;
        }

        h1 {
            color: #ffffff;
            margin-bottom: 20px;
            font-size: 28px;
            font-weight: bold;
            text-align: center;
        }

        p {
            line-height: 1.6;
            margin-bottom: 15px;
            font-size: 16px;
            color: #f0f0f0;
            font-weight: bold;
        }

        img {
            max-width: 100%;
            height: auto;
            border-radius: 15px;
            margin: 0 auto;
            display: block;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }

        .image-caption {
            text-align: center;
            color: #ffffff;
            font-size: 14px;
            margin-top: 10px;
        }

        footer {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            text-align: center;
            padding: 10px 0;
            background-color: #004080;
            color: #ffffff;
        }

        footer a {
            color: #ffffff;
            text-decoration: none;
            margin: 0 10px;
        }

        @media only screen and (max-width: 600px) {
            .container {
                padding: 20px;
            }

            h1 {
                font-size: 24px;
            }

            p {
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    
    <div class="container">
        <h1>🌎 Environmental Alert!</h1>
        <img src="https://source.unsplash.com/600x300/?blue,nature" alt="Blue Nature Image">
        <p class="image-caption">Caption: Illustrative image highlighting the environmental issue.</p>
        <p>This email was sent due to an envioremnatl alert set by you</p>
        <p>${body}</p>
        <p>Thank you for your commitment to a better and sustainable planet.</p>
        <p>Sincerely,<br>Your Environmental Team</p>
    </div>

</body>
</html>
`,
    });
}

module.exports={send}