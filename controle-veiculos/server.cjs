const ip = require('ip');
const express = require('express');

const app = express();

const baseDir = `${__dirname}/dist/`;

app.use(express.static(`${baseDir}`));

app.get('*', (req, res) => res.sendFile('index.html', { root: baseDir }));

const port = 4000;

app.listen(port, () =>
	console.log(`Servidor iniciado em http://${ip.address()}:${port}`),
);
