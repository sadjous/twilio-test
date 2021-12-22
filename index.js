require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(accountSid, authToken);
const client = require("twilio")(accountSid, authToken);
var bodyParser = require("body-parser");
// +14155238886

const express = require("express");
const app = express();
const port = 8743;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function sendMessage(to, message) {
  return new Promise((resolve, reject) => {
    client.messages
      .create({
        body: message,
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:'+to,
      })
      .then((message) => resolve(message))
      .catch((err) => reject(err));
  });
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/whatsapp", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body) {
      return res.sendStatus(400);
    }
    const { to, message } = req.body;
    const response = await sendMessage(to, message);

    res.json(response);
  } catch (error) {
    console.log(error);
    res.send("Erreur!");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
