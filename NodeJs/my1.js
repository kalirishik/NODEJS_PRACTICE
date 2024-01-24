import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3500;

app.use(bodyParser.urlencoded({ extended: true }));

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const form6 = path.join(dirname,"form6.html");

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kali@742003',
  database: 'sample'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

app.listen(port, () => {
  console.log(`server running on the port : ${port}`);
});

app.get("/", (req, res) => {
  res.sendFile(form6);
});

app.get("/success", (req, res) => {
  res.send("<h3>Succesfully inserted</h3>");
});

app.post('/register', (req, res) => {
  const userData = {
    username: req.body.username,
    pwd: req.body.password1,
    re_pwd: req.body.password2,
    gender: req.body.gender,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  };
  
  db.query('INSERT INTO register SET ?', userData, (error, results) => {
    if (error) {
      console.error('Error inserting data into MySQL: ' + error.stack);
      res.redirect('/');
    } else {
      console.log('Data inserted into MySQL with ID ' + results.insertId);
      res.redirect('/success');
    }
  });
});
