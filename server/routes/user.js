import express from 'express';
const UsersRoute = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
const secret = process.env.Secret
import User from '../models/users.js';

UsersRoute.post("/signup", async (req, res) => {
    await User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.send("Email already exists");
        } else {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                level: 'User',
                city: req.body.city || '',
                address: req.body.address || '',
                country: req.body.country || '',
                ZIP: req.body.ZIP || ''
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.send('Sign Up Ok'))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

UsersRoute.post("/login", async (req, res) => {

    const Email = req.body.email;
    const Password = req.body.password;

    await User.findOne({ email: Email })
        .then(user => {
            if (!user) {
                return res.send("Email not found");
            }
            bcrypt.compare(Password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: user.id,
                        username: user.username
                    };
                    jwt.sign(
                        payload,
                        secret,
                        {
                            expiresIn: 31556926
                        },
                        (err, token) => {
                            res.json({
                                email: user.email,
                                username: user.username,
                                success: true,
                                token: "Bearer " + token,
                                level: user.level
                            });
                        }
                    );
                } else {
                    return res.send("Password incorrect");
                }
            });
        });
});

UsersRoute.post("/reset", async (req, res) => {

    const Email = req.body.email;
    const Password = req.body.password;
    const Newpassword = req.body.newpassword

    await User.findOne({ email: Email })
        .then(user => {
            if (!user) {
                return res.send("Email not found");
            }
            bcrypt.compare(Password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(Newpassword, salt, (err, hash) => {
                                if (err) throw err;
                                user.Password = hash;
                                user
                                    .save()
                                    .then(user => res.json(user))
                                    .catch(err => console.log("FALLO RESET"));
                            });
                        });
                    } else {
                        return res.send("Password incorrect");
                    }
                });
        });
});

UsersRoute.post("/addwish", async (req, res) => {

    const Email = req.body.email;
    const Name = req.body.name;
    const Image = req.body.image
    const Price = req.body.price

    await User.findOne({ email: Email })
        .then(user => {
            if (!user) {
                return res.send("Email not found");
            }
            else if (!user.wishlist.find(item => item.name === Name)) {
                user.wishlist.push({ name: Name, image: Image, price: Price })
                user.save()
                return res.json(user.wishlist)
            }
        });
});

UsersRoute.post("/addcart", async (req, res) => {

    const Email = req.body.email;
    const Name = req.body.name;
    const Image = req.body.image
    const Price = req.body.price
    const Id = req.body.Id
    const quantity = req.body.quantity
    const size = req.body.size
    await User.findOne({ email: Email })
        .then(user => {
            if (!user) {
                return res.send("Email not found");
            }
            else if (!user.cart.find(item => item.Id === Id)) {
                user.cart.push({ name: Name, image: Image, price: Price, Id: Id, quantity: quantity, size: size })
                user
                    .save()
                    .then(user => res.send("Product added"))
                    .catch(err => console.log("ERROR"));
            }
            else {
                return res.send("Product is already in your cart")
            }
        });
});

UsersRoute.post("/removecart", async (req, res) => {

    const Email = req.body.email;
    const Id = req.body.Id;

    await User.findOne({ email: Email })
        .then(user => {
            if (!user) {
                return res.send("Email not found");
            }
            else {
                user.cart = user.cart.filter(item => item.Id !== Id)
                user.save()
                return res.send("Product removed")
            }
        });
});





UsersRoute.post("/removewish", async (req, res) => {

    const Email = req.body.email;
    const Name = req.body.name;
    const Image = req.body.image
    const Price = req.body.price

    await User.findOne({ email: Email })
        .then(user => {
            if (!user) {
                return res.send("Email not found");
            }
            else {
                user.wishlist = user.wishlist.filter(item => item.name !== Name)
                user.save()
                return res.json(user.wishlist)
            }
        });
});

UsersRoute.post("/getcart", async (req, res) => {

    const Email = req.body.email;

    await User.findOne({ email: Email })
        .then(user => {
            if (!user) {
                return res.send("Email not found");
            }
            else {
                return res.json(user.cart)
            }
        });
});


UsersRoute.post("/getwishlist", async (req, res) => {

    const Email = req.body.email;

    await User.findOne({ email: Email })
        .then(user => {
            if (!user) {
                return res.send("Email not found");
            }
            else {
                return res.json(user.wishlist)
            }
        });
});

export default UsersRoute