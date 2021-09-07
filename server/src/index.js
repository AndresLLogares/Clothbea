import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Products from "./routes/products.js";
import Categories from "./routes/categories.js";
import Users from "./routes/user.js";
import passport from "passport";
import Orders from "./routes/order.js";

dotenv.config();

const app = express();

app.use(bodyparser.json({ limit: "30mb", extende: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extende: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
import { passportconfig } from "./validation/passport.js";
passportconfig(passport);

app.use("/Products", Products);
app.use("/Products", Categories);
app.use("/Users", Users);
app.use("/Orders", Orders);

const PORT = process.env.PORT || 5000;
const MongoURL = process.env.MongoURL;
const CONNECTION_URL = MongoURL;

app.get("/", (req, res) => {
  res.send("Welcome to Clothbea");
});

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on server ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
