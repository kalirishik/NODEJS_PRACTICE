import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
const port = 3500;

app.use(bodyParser.urlencoded({ extended: true }));

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const home = path.join(dirname, 'home.html');
const login = path.join(dirname, 'login.html');
const signup = path.join(dirname, 'signup.html');
const forgotpwd = path.join(dirname, 'forgot.html');

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

app.get('/', (req, res) => {
    res.send(`<ul>
        <li><a href='http://localhost:3500/home'>/home</a></li>
        <li><a href='http://localhost:3500/login'>/login</a></li>
        <li><a href='http://localhost:3500/signup'>/signup</a></li>
        <li><a href='http://localhost:3500/fgpwd'>/forgot password</a></li>
    </ul>`);
});

app.get("/home", (req, res) => {
    res.sendFile(home);
});

app.get("/login", (req, res) => {
    res.sendFile(login);
});

app.get("/signup", (req, res) => {
    res.sendFile(signup);
});

app.get("/fgpwd", (req, res) => {
    res.sendFile(forgotpwd);
});
app.use((req, res) => {
    res.status(404).send('404 Page Not Found');
});
