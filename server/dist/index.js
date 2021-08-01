"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _products = _interopRequireDefault(require("./routes/products.js"));

var _categories = _interopRequireDefault(require("./routes/categories.js"));

var _user = _interopRequireDefault(require("./routes/user.js"));

var _passport = _interopRequireDefault(require("passport"));

var _order = _interopRequireDefault(require("./routes/order.js"));

var _passport2 = require("./validation/passport.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const app = (0, _express.default)();
app.use(_bodyParser.default.json({
  limit: "30mb",
  extende: true
}));
app.use(_bodyParser.default.urlencoded({
  limit: "30mb",
  extende: true
}));
app.use((0, _cors.default)());
app.use(_passport.default.initialize());
app.use(_passport.default.session());
(0, _passport2.passportconfig)(_passport.default);
app.use('/Products', _products.default);
app.use('/Products', _categories.default);
app.use('/Users', _user.default);
app.use('/Orders', _order.default);
const PORT = process.env.PORT || 5000;
const MongoURL = process.env.MongoURL;
const CONNECTION_URL = MongoURL;
app.get('/', (req, res) => {
  res.send("Welcome to Clothbea");
});

_mongoose.default.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => app.listen(PORT, () => console.log("Server running on server ".concat(PORT)))).catch(error => console.log(error.message));

_mongoose.default.set('useFindAndModify', false);