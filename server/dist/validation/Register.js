"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validator = _interopRequireDefault(require("validator"));

var _isEmpty = _interopRequireDefault(require("is-empty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateRegisterInput = data => {
  let errors = {}; // Convert empty fields to an empty string so we can use validator functions

  data.username = !(0, _isEmpty.default)(data.username) ? data.username : "";
  data.email = !(0, _isEmpty.default)(data.email) ? data.email : "";
  data.password = !(0, _isEmpty.default)(data.password) ? data.password : ""; // Name checks

  if (_validator.default.isEmpty(data.username)) {
    errors.username = "Name field is required";
  } // Email checks


  if (_validator.default.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!_validator.default.isEmail(data.email)) {
    errors.email = "Email is invalid";
  } // Password checks


  if (_validator.default.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!_validator.default.isLength(data.password, {
    min: 6,
    max: 30
  })) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: (0, _isEmpty.default)(errors)
  };
};

var _default = validateRegisterInput;
exports.default = _default;