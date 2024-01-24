import http from 'http';
import { parse } from 'querystring';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const server = http.createServer((req, res) => {
    const { method, url } = req;

    if (method === 'GET' && url === '/') {
        const filename = fileURLToPath(import.meta.url);
        const dirname = path.dirname(filename);
        const formPath = path.join(dirname, 'form1.html');

        const htmlContent = readFileSync(formPath, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlContent);
    } else if (method === 'POST' && url === '/validate') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = parse(body);
            const { name, pwd, dob, gender, remarks } = formData;

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <h2>Welcome ${name}</h2>
                <p>Password: ${pwd}</p>
                <p>Date of Birth: ${dob}</p>
                <p>Gender: ${gender}</p>
                <p>Remarks: ${remarks || 'No remarks provided'}</p>
            `);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

const port = 3500;
server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
