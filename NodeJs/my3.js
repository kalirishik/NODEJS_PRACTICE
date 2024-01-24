
import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const form8 = path.join(dirname,"form8.html");

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kali@742003',
  database: 'sample'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    process.exit(1);
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

app.use(express.static('public'));
app.get("/", (req, res) => {
  res.sendFile(form8);
});
app.get("/success", (req, res) => {
    res.send("<h3>Succesfully inserted</h3>");
});
app.post('/submitContact', (req, res) => {
    const contactData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address1 + ' ' + req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
        gender: req.body.gender
    };
    
    db.query('INSERT INTO Contact_Information SET ?', contactData, (error, results) => {
    if (error) {
        console.error('Error inserting data into MySQL: ' + error.stack);
      res.redirect('/');
    } else {
        console.log('Data inserted into MySQL with ID ' + results.insertId);
        res.redirect('/success');
    }
  });
});
app.use((req, res) => {
  res.status(404).send("Not found");
});
