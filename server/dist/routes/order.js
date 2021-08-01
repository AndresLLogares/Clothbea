"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _express = _interopRequireDefault(require("express"));

var _orders = _interopRequireDefault(require("../../mongo/models/orders.js"));

var _stripe = _interopRequireDefault(require("stripe"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _users = _interopRequireDefault(require("../../mongo/models/users.js"));

var _products = _interopRequireDefault(require("../../mongo/models/products.js"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const OrderRoute = _express.default.Router();

_dotenv.default.config();

const PassEmail = process.env.PASSEMAIL;
const STRIPEKEY = process.env.STRIPE;
const stripeClass = new _stripe.default(STRIPEKEY);

let transporter = _nodemailer.default.createTransport({
  service: 'hotmail',
  auth: {
    user: 'Clothbea@hotmail.com',
    pass: PassEmail
  }
});

OrderRoute.post('/createorder', async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const total = req.body.total;
  const lastname = req.body.lastname;
  const city = req.body.city;
  const country = req.body.country;
  const state = req.body.state;
  const ZIP = req.body.ZIP;
  const address = req.body.address;
  const products = req.body.products;
  const Id = req.body.Id;
  await _orders.default.findOne({
    Id: Id
  }).then(order => {
    if (order) {
      return res.send('Order already exists');
    } else {
      const newOrder = new _orders.default({
        email: email,
        name: name,
        lastname: lastname,
        city: city,
        country: country,
        state: state,
        ZIP: ZIP,
        address: address,
        products: products,
        Id: Id,
        total: total,
        status: 'processed'
      });
      newOrder.save().then(response => res.send('Order created')).catch(err => res.send(err));
    }
  });
});
OrderRoute.get('/allorders', async (req, res) => {
  try {
    const allOrders = await _orders.default.find({});
    res.status(200).json(allOrders);
  } catch (err) {
    console.log("Error AllProducts");
    res.status(500).json({
      message: "Server Error"
    });
  }
});
OrderRoute.post('/orderbyId', async (req, res) => {
  const Id = req.body.Id;
  await _orders.default.findOne({
    Id: Id
  }).then(order => {
    if (!order) {
      return res.send("Order doesn't exist");
    } else {
      res.json(order);
    }
  });
});
OrderRoute.post('/orderbyuser', async (req, res) => {
  const email = req.body.email;
  await _orders.default.findOne({
    email: email
  }).then(order => {
    if (!order) {
      return res.send("order doesn't exist");
    } else {
      res.json(order);
    }
  });
});
OrderRoute.post('/changestatus', async (req, res) => {
  const {
    Id,
    status,
    email
  } = req.body;
  let options = '';

  if (status === 'Canceled') {
    options = {
      from: 'Clothbea@hotmail.com',
      to: email,
      subject: 'Your order was canceled',
      text: 'We hope see you again.'
    };
  } else {
    options = {
      from: 'Clothbea@hotmail.com',
      to: email,
      subject: 'Your order was Sended',
      text: 'In a few days your order is arriving'
    };
  }

  await _orders.default.findOne({
    Id: Id
  }).then(order => {
    if (!order) {
      return res.send('Order doen´t exists');
    } else {
      transporter.sendMail(options, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      order.status = status;
      order.save().then(response => res.send('Order modified')).catch(err => res.send(err));
    }
  });
});
OrderRoute.post('/paymentcheckout', async (req, res) => {
  const Id = req.body.Id;
  const StripeId = req.body.stripeId;
  const amount = req.body.amount;
  const email = req.body.email;
  const products = req.body.products;
  let count = 0;
  console.log(products[count].Id);
  await _orders.default.findOne({
    Id: Id
  }).then(async order => {
    if (!order) {
      return res.send("Error in Order");
    } else {
      const response = await stripeClass.paymentIntents.create({
        amount: amount,
        currency: "USD",
        description: "Clothes",
        payment_method: StripeId,
        confirm: true
      });

      if (response.status === 'succeeded') {
        await _users.default.findOne({
          email: email
        }).then(user => {
          user.cart = [];
          user.save();
        });
        order.status = "Paided";
        order.save();

        while (count < products.length) {
          await _products.default.findOne({
            Id: products[count].Id
          }).then(product => {
            product.stock = product.stock - products[count].quantity;
            product.save();
          });
          count++;
        }

        const options = {
          from: 'Clothbea@hotmail.com',
          to: email,
          subject: 'Thanks for your purchase!!',
          text: 'Now our admins are going to send you your clothes in a few days.'
        };
        transporter.sendMail(options, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        return res.send("Payment succesful");
      } else {
        return res.send('Payment error');
      }
    }
  });
});
var _default = OrderRoute;
exports.default = _default;