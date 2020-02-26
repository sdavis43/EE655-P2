// Express
const express = require('express');
const app = express();
const port = 3000;
const bobyParser = require('body-parser');
const path = require('path');
app.use(express.json());
app.use(bobyParser.json());
app.use(bobyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
// Mongo
const mongoose = require('mongoose');
const Product = require('./Product.model');
mongoose.connect('mongodb://localhost/myDB',{ useNewUrlParser: true })
    .then(()=>console.log('Connected to MondoDB....'))
    .catch(err => console.error('Could not make connection....'))

//--------------------Routes---------------------
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.get('/products',(req, res) => {
    async function allProducts() {
        const products = await Product
        .find()
        .sort({name: 1})
        res.end(`<html><h1>Products</h1>
                <p>${JSON.stringify(products)}</p>
                <p>Click <a href="http://localhost:3000/">here</a> to return home.</p>`)
    }
    allProducts();
});

app.get('/products/:name',(req, res) => {
    async function findProduct() {
        const product = await Product.find({name: req.params.name});
        if(!product) return;
        res.end(`<html><h1>Requested Product</h1>
            <p>${JSON.stringify(product)}</p>
            <p>Click <a href="http://localhost:3000/">here</a> to return home.</p>`) 
    }   
    findProduct();
});

app.post('/add_product',(req, res) => {
    async function addProduct() {
        try{
            const product = new Product({
                name: req.body.name,
                quantity: req.body.quantity,
                price: req.body.price
            });
            let result = await product.save();
            // console.log(result);
            res.end(`<html><h1>Added New Product</h1>
                <p>${JSON.stringify(result)}</p>
                <p>Click <a href="http://localhost:3000/">here</a> to return home.</p>`)
        }
        catch(err){
            // console.log('Error', err.message);
            res.end(`Error: ${err.message}`);
        }    
    }
    addProduct();
});

app.put('/update_product/:name',(req,res) => {
    let name = req.params.name;
    async function updateProduct(name) {
        try{
            const product = await Product.findOneAndUpdate({name: name},{
                $set:{
                    quantity: req.body.quantity,
                    price: req.body.price
                }
            },{new: true});
            res.end(`<html><h1>Updated Product</h1>
                <p>${JSON.stringify(product)}</p>
                <p>Click <a href="http://localhost:3000/">here</a> to return home.</p>`)
        }
        catch(err){
            // console.log('Error', err.message);
            res.end(`Error: ${err.message}`);
        }
    }
    updateProduct(name);
});

app.delete('/delete',(req,res) => {
    async function deleteAll() {
        try{
            const result = await Product.deleteMany();
            res.end(`Deleted ${JSON.stringify(result)}`);
        }
        catch(err){
            // console.log('Error', err.message);
            res.send(`Error: ${err.message}`);
        }
    }
    deleteAll();
});

app.delete('/delete/:name',(req, res) => {
    let name = req.params.name;
    async function deleteProduct(name) {
        try{
            const result = await Product.findOneAndRemove({name: name})
            res.end(`Deleted ${JSON.stringify(result)}`);
        }
        catch(err){
            // console.log('Error', err.message);
            res.send(`Error: ${err.message}`);
        }
    }
    deleteProduct(name);
});

app.listen(port, () => {
	console.log('Server listening on port ' + port)
})