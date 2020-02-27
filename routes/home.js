const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(
       `<html>
            <head>
                <h1>Welcome to Sammy's!!!</h1>
            </head>
            <body>
                <h2>Find Product By Name</h2>
                <form action = "http://localhost:3000/products/:name" method = "GET">
                    Product: <input type = "text" name = "name">
                    <input type = "submit" value = "Find">
                </form>  
                <form action = "http://localhost:3000/products" method = "GET">
                    <input type = "submit" value = "Full Inventory">
                </form>
            </body>
        </html>`);
});

module.exports = router