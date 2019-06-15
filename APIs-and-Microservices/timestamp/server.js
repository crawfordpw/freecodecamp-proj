const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:date', (req, res) => {
	let date = req.params.date;
	let utc = '';
	let unix = null;

	if (isNaN(date)) {
		utc = new Date(date);
		if (utc != 'Invalid Date') {
			unix = utc.getTime();
			utc = utc.toUTCString();
		} else {
			utc = utc.toString();
		}
	} else {
		utc = new Date(Number(date)).toUTCString();
		if (utc != 'Invalid Date') {
			unix = date;
		}
	}

	res.json({ unix, utc });
});

app.get('/api/timestamp/', (req, res) => {
	let utc = new Date().toUTCString();
	let unix = Date.parse(utc) / 1000;

	res.json({ unix, utc });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}...`));
