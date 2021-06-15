import express from 'express';
import bodyParser from 'body-parser';
import Products from '../models/products.js';
const products = express.Router();

products.use(bodyParser.json({ limit: "30mb", extended: true }));
products.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

products.get('/all', async (req, res) => {
    try {
        const allProducts = await Products.find({})
        res.status(200).json(allProducts)
    }
    catch (err) {
        console.log("Error AllProducts")
        res.status(500).json({ message: "Server Error" });
    }
});

products.post('/byId', async (req, res) => {
    const Id = req.body.Id
    console.log(Id)
    console.log("AQUI 2")
    try {
        const productById = await Products.findOne({ Id })
        res.json(productById)
    }
    catch (err) {
        console.log("Error productById")
        res.status(500).json({ message: "Server Error" });
    }
})

products.post('/editproduct', async (req, res) => {
    const id = req.body.Id
    const name = req.body.name
    const price = req.body.price
    const stock = req.body.stock
    const category = req.body.category
    const subcategory = req.body.subcategory
    const brand = req.body.brand

    await Products.findOne({ Id: id })
        .then(product => {
            if (!product) {
                return res.send("Product not found");
            }
            else if (name !== '') { product.name = name }
            else if (price !== '') { product.price = price }
            else if (stock !== '' || stock !== '-1' || stock !== '+1' ) { product.stock = stock }
            else if (stock === '-1') { product.stock = product.stock - 1 }
            else if (stock === '+1') { product.stock = product.stock + 1 }
            else if (category !== '') { product.category = category }
            else if (subcategory !== '') { product.subcategory = subcategory }
            else if (brand !== '') { product.brand = brand }
            product
                .save()
                .then(product => res.json(product))
                .catch(err => console.log("FAIL EDIT PRODUCT"));
        })
})

export default products;