const dns = require('dns');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const shortid = require('shortid');
const shorturl = require('./models/shorturl');
require('dotenv').config(); // must supply own .env file containing valid MONGO_URL variable

shortid.characters(
	'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$&'
);

const app = express();
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(cors());

mongoose
	.connect(process.env.MONGO_URL, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/shorturl/new/:url(*)', (req, res) => {
	let { url } = req.params;

	dns.lookup(url, err => {
		if (!err) {
			shorturl.findOne({ original_url: url }, (err, data) => {
				if (err) return res.send('Error reading database...');
				if (data != null) {
					res.json({
						original_url: data.original_url,
						short_url: data.short_url
					});
				} else {
					let short = shortid.generate();

					let newDoc = new shorturl({
						original_url: url,
						short_url: short
					});

					newDoc.save(err => {
						if (err) return res.send('Error saving to database...');
					});

					res.json({ original_url: url, short_url: short, count });
				}
			});
		} else {
			console.log(err);
			res.json({ error: 'Invalid URL' });
		}
	});
});

app.get('/api/shorturl/:short_url', (req, res) => {
	let { short_url } = req.params;

	shorturl.findOne({ short_url }, (err, data) => {
		if (data != null) {
			let url = 'http://' + data.original_url;
			res.redirect(301, url);
		} else {
			res.json({ error: 'Invalid Short URL' });
		}
	});
});

app.post('/api/shorturl/new/', (req, res) => {
	let { url } = req.body;
	res.redirect(url);
});

app.post('/api/shorturl/', (req, res) => {
	let { short_url } = req.body;
	res.redirect(short_url);
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}...`));
