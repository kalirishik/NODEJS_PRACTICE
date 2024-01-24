import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

const app = express();
const port = 3500;
app.use(bodyParser.urlencoded({extended:true}));
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const form5 = path.join(dirname, "form5.ejs");

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
app.get('/display-table', (req, res) => {
    const data = [
        { name: 'Jane', rollno: '1', dateOfExam: '2020-06-23', m1: 80,m2:91,m3: 97},
        { name: 'Alice', rollno: '2', dateOfExam: '2020-06-23', m1: 92,m2:90,m3: 90},
        { name: 'Jane', rollno: '1', dateOfExam: '2020-06-16', m1: 89,m2:90,m3: 78},
    ];
    res.render(form5, { data });
});