"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _products = _interopRequireDefault(require("../../mongo/models/products.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productsRoute = _express.default.Router();

productsRoute.use(_bodyParser.default.json({
  limit: "30mb",
  extended: true
}));
productsRoute.use(_bodyParser.default.urlencoded({
  limit: "30mb",
  extended: true
}));
productsRoute.get('/all', async (req, res) => {
  try {
    const allProducts = await _products.default.find({});
    res.status(200).json(allProducts);
  } catch (err) {
    console.log("Error AllProducts");
    res.status(500).json({
      message: "Server Error"
    });
  }
});
productsRoute.post('/byId', async (req, res) => {
  const Id = req.body.Id;

  try {
    const productById = await _products.default.findOne({
      Id
    });
    res.json(productById);
  } catch (err) {
    console.log("Error productById");
    res.status(500).json({
      message: "Server Error"
    });
  }
});
productsRoute.post('/addcomment', async (req, res) => {
  const Id = req.body.Id;
  const email = req.body.email;
  const comment = req.body.comment;
  const title = req.body.title;
  await _products.default.findOne({
    Id: Id
  }).then(product => {
    if (!product) {
      return res.send("Product Id doesn't match");
    } else {
      product.comments.push({
        Id: Id,
        email: email,
        title: title,
        comment: comment
      });
      product.save();
      return res.send("Product match");
    }
  });
});
productsRoute.post('/removecomment', async (req, res) => {
  const Id = req.body.Id;
  console.log(Id);
  await _products.default.findOne({
    Id: Id
  }).then(product => {
    if (!product) {
      return res.send("Product Id doesn't match");
    } else {
      product.comments = [];
      product.save();
      return res.send("Product match");
    }
  });
});
productsRoute.post('/createproduct', async (req, res) => {
  const id = req.body.Id;
  const name = req.body.name;
  const price = req.body.price;
  const stock = req.body.stock;
  const category = req.body.category;
  const subcategory = req.body.subcategory;
  const image = req.body.image;
  const brand = req.body.brand;
  await _products.default.findOne({
    Id: id
  }).then(product => {
    if (product) {
      return res.send("Product already exists");
    } else {
      const newProduct = new _products.default({
        Id: id,
        name: name,
        price: price,
        image: image,
        stock: stock,
        category: category,
        subcategory: subcategory,
        brand: brand
      });
      newProduct.save().then(response => res.send('Product created')).catch(err => res.send(err));
    }
  });
});
productsRoute.post('/editproduct', async (req, res) => {
  const id = req.body.Id;
  const name = req.body.name;
  const price = req.body.price;
  const stock = req.body.stock;
  const image = req.body.image;
  const category = req.body.category;
  const subcategory = req.body.subcategory;
  const brand = req.body.brand;
  await _products.default.findOne({
    Id: id
  }).then(product => {
    if (!product) {
      return res.send("Product not found");
    }

    product.name = name;
    product.price = price;
    product.stock = stock;
    product.image = image;
    product.category = category;
    product.subcategory = subcategory;
    product.brand = brand;
    product.save().then(product => res.send('Edit Success')).catch(err => res.send("Error Edit"));
  });
});
var _default = productsRoute;
exports.default = _default;