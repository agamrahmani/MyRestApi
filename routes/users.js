const express = require ("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const authMW = require("../middleware/auth");
const router = express.Router();

const { User, validateUser } = require("../model/usres");
const { UpdateUser, validateUpdateUser } = require ("../model/updateUser");

router.post("/", async (req, res) => {
    const { error } = validateUser(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        res.status(400).send("User already registered.");
        return;
    }

    user = await new User(req.body);
    user.password = await bcrypt.hash(user.password, 12);

    await user.save();

    res.json(_.pick(user, ["_id", "name","phone", "email", "address", "image", "isBussines", "isAdmin"]));
});


router.get("/", authMW, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).send("Access denied.");
        }

        const users = await User.find({}, { password: 0 });

        res.json(users);
    } catch (error) {
        res.status(500).send("Error retrieving users.");
    }
});


router.get("/:id", authMW, async (req, res) => {
    try {
        if (!req.user.isAdmin && req.user._id!= req.params.id) {
            return res.status(403).send("Access denied.");
        }

    res.json(await User.findById(req.user._id, { password: 0 }));

    } catch (error) {
        res.status(500).send("Error retrieving users.");
    }

});


router.put('/:id', authMW, async (req, res) => {
    try{
const { error } = validateUpdateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    if (req.params.id !== req.user._id) {
        return res.status(403).send("You are not authorized to update this user's data.");
    }
    const user = await User.findById(req.params.id);
    if (req.body.email) {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send("Email already in use.");
        }
    }

    user.name = req.body.name || user.name;
    user.phone = req.body.phone || user.phone;
    user.image = req.body.image || user.image;
    user.address = req.body.address || user.address;

    await user.save();
    res.send(user);
    } catch (error) {
        res.status(500).send("Error updating user.");
    }
    
});


router.patch("/:id",authMW, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("The user with the given ID was not found.");
        }

        if (req.user._id !== req.params.id) {
            return res.status(403).send("You are not authorized to update this user's data.");
        }

        user.isBusiness = !user.isBusiness;
        await user.save();
        res.send(user);

    } catch (error) {
        res.status(500).send("Error while changing user status.");
    }
});

router.delete("/:id", authMW, async (req, res) => {
    try{
    const user = await User.findById(req.params.id);
    if (!user) {
            return res.status(404).send("The user with the given ID was not found.");
        }
        if (req.user._id !== req.params.id && !req.user.isAdmin) {
            return res.status(403).send("You are not authorized to delete this user.");
        }
    
    await User.deleteOne({ _id: req.params.id })
    res.send(user);
    } catch (error) {
        res.status(500).send("Error deleting user.");
    } 
});

module.exports = router;