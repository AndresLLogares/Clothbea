"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _subcategories = _interopRequireDefault(require("../../mongo/models/subcategories.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const subcategories = _express.default.Router();

subcategories.use(_bodyParser.default.json({
  limit: "30mb",
  extended: true
}));
subcategories.use(_bodyParser.default.urlencoded({
  limit: "30mb",
  extended: true
}));
subcategories.get('/subcategories', async (req, res) => {
  try {
    const getSubCategories = await _subcategories.default.find({});
    res.status(200).json(getSubCategories);
  } catch (err) {
    console.log("Error SubCategories");
    res.status(500).json({
      message: "Server Error"
    });
  }
});
subcategories.post('/createcategories', async (req, res) => {
  let name = req.body.name;
  let Id = req.body.Id;
  let category = req.body.category;
  await _subcategories.default.findOne({
    Id: Id
  }).then(subcategory => {
    if (subcategory) {
      res.send('Category already exist');
    } else {
      const newSubCategory = new _subcategories.default({
        Id: Id,
        name: name,
        category: category
      });
      newSubCategory.save().then(response => res.send('Category Created')).catch(err => res.send(err));
    }
  });
});
var _default = subcategories;
exports.default = _default;