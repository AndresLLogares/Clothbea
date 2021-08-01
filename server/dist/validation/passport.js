"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passportconfig = void 0;

var _passportJwt = _interopRequireDefault(require("passport-jwt"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let JwtStrategyS = _passportJwt.default.Strategy;
let ExtractJwtaux = _passportJwt.default.ExtractJwt;

const User = _mongoose.default.model("users");

_dotenv.default.config();

const secret = process.env.SECRET;
console.log(secret);
const opts = {};
opts.jwtFromRequest = ExtractJwtaux.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

const passportconfig = passport => {
  passport.use(new JwtStrategyS(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id).then(user => {
      if (user) {
        return done(null, user);
      }

      return done(null, false);
    }).catch(err => console.log(err));
  }));
};

exports.passportconfig = passportconfig;