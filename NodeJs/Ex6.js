import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const port = 3500;

app.use(bodyParser.urlencoded({ extended: true }));

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const form2Path = path.join(dirname, 'form2.html');

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(form2Path);
});

app.post("/validate", (req, res) => {
    const { name, email, subscribe, format, typesOfSubscription, comments } = req.body;
    res.send(`
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Subscribe: ${subscribe}</p>
        <p>Format: ${format}</p>
        <p>Types of Subscription: ${typesOfSubscription}</p>
        <p>Comments: ${comments || 'no answer'}</p>
    `);
});
