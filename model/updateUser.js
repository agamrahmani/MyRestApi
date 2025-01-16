const Joi = require("joi");
const mongoose = require("mongoose");

const updateUserSchema = new mongoose.Schema({
    name: {
        type: new mongoose.Schema({
            first: { type: String, required: true, minlength: 2, maxlength: 255 },
            middle: { type: String, default: "" },
            last: { type: String, required: true, minlength: 2, maxlength: 255 }
        }),
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
    type: String,
    minlength: 6,
    maxlength: 255,
    unique: true,
    },
    image: {
        type: new mongoose.Schema({
        url:{
            type: String,
            default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
        },
        alt:{
            type: String,
            default: "bussines card image"
        },
        }),
    },
    address: {
        type: new mongoose.Schema({
        state: {
            type: String,
            default: "not defined"
        },
        country: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255,
        },
        city: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255,
        },
        street: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255,
        },
        houseNumber: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 10,
        },
        zip: {
            type: Number,
            default: 0,
        },
        }),
    },
});


const UpdateUser = mongoose.model("UpdateUser", updateUserSchema, "updateUsers");


function validateUpdateUser(user) {
    const schema = Joi.object({
        name: Joi.object({
            first: Joi.string().min(2).max(255).optional(),
            middle: Joi.string().min(2).max(255).optional().allow("").default(""),
            last: Joi.string().min(2).max(255).optional(),
        }).optional(),
        phone: Joi.string().pattern(/^[0-9]{10,15}$/).optional(),
        email: Joi.string().min(6).max(255).email().optional(),
        image: Joi.object({
            url: Joi.string().optional().allow("").default('https://pixabay.com/photos/imprint-about-us-map-hand-finger-2508603/'),
            alt: Joi.string().optional().allow("").default("business card image")
        }).optional(),
        address: Joi.object({
            state: Joi.string().min(2).max(255).optional().allow("").default("not defined"),
            country: Joi.string().min(2).max(255).optional(),
            city: Joi.string().min(2).max(255).optional(),
            street: Joi.string().min(2).max(255).optional(),
            houseNumber: Joi.number().min(1).max(10).optional(),
            zip: Joi.number().optional().default(0),
        }).optional(),
    });

    return schema.validate(user);
}

module.exports = { UpdateUser, validateUpdateUser };