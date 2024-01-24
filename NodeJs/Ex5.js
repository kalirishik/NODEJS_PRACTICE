import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import ejs from 'ejs';

const port = 3500;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');  

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const form3 = path.join(dirname, "form3.html");
const form4 = path.join(dirname, "form4.ejs");

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(form3);
});

app.post("/MarkSheet", (req, res) => {
    const { name, fname, iname, batch, wd, it, cp } = req.body;
    const data = { name, fname, iname, batch, wd, it, cp };
    res.render(form4, { data });
});

app.get("/form4", (req, res) => {
    const { name, fname, iname, batch, wd, it, cp } = req.query;
    res.render(form4, { data: { name, fname, iname, batch, wd, it, cp } });
});
