// Sam Davis - sdavis43
// EE 655
// Assignment 2

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const products = require('./routes/products');
const home = require('./routes/home');

app.use(express.json());
app.use('/products', products);
app.use('/', home)

app.listen(port, () => {
	console.log('Server listening on port ' + port);
})