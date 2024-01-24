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
const form7 = path.join(dirname,"form7.html");

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
  res.sendFile(form7);
});
app.get("/success", (req, res) => {
    res.send("<h3>Succesfully inserted</h3>");
});
app.get("/failure", (req, res) => {
    res.send("<h3>Invalid</h3>");
});

app.post('/validate', (req, res) => {
    const userData = {
    uname: req.body.lname,
    pwd1: req.body.pwd1,
    pwd2: req.body.pwd2,
    email1: req.body.email1,
    email2: req.body.email2
};
if(userData.pwd1 == userData.pwd2 && userData.email1== userData.email2){
    db.query('INSERT INTO account_information SET ?', userData, (error, results) => {
        if (error) {
            console.error('Error inserting data into MySQL: ' + error.stack);
            res.redirect('/');
        } else {
            console.log('Data inserted into MySQL with ID ' + results.insertId);
            res.redirect('/success');
        }
    });
}
else {
    res.redirect("/failure");
}
});
// app.use((req,res)=>{
//     res.status(404).send(" not found");
// })
