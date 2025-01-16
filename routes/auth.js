const express = require ("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../model/usres");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const router = express.Router();

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    return;
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(400).send("Invalid email");
    return;
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
    res.status(400).send("Invalid password");
    return;
    }

    const token = jwt.sign({ _id: user._id, isBusiness: user.isBusiness,  isAdmin: user.isAdmin }, config.jwtKey, { expiresIn: '1h' });


    res.json({
    token,
    });
});

function validate(obj) {
    const schema = Joi.object({
    email: Joi.string().min(6).max(255).email().required(),
    password: Joi.string().min(6).max(1024).required(),
    });

    return schema.validate(obj);
}

module.exports = router;