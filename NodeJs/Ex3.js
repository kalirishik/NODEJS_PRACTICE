import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const port = 3500;

app.use(bodyParser.urlencoded({ extended: true }));

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const formPath = path.join(dirname, 'form1.html');

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(formPath);
});

app.post('/validate', (req, res) => {
    const { name, pwd, dob, gender, remarks } = req.body;

    res.send(`
      <h2>Welcome ${name}</h2>
      <p>Password: ${pwd}</p>
      <p>Date of Birth: ${dob}</p>
      <p>Gender: ${gender}</p>
      <p>Remarks: ${remarks || 'No remarks provided'}</p>
    `);
});
