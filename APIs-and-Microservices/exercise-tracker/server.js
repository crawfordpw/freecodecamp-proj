const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}...`));
