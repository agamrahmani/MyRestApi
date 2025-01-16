const Joi = require("joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    subtitle:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024,
    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 10,
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
    },
    web: {
        type: String,
        minlength: 6,
        maxlength: 255,
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
    bizNumber: {
        type: Number,
        required: true,
        min: 100,
        max: 9_999_999_999,
        unique: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',
        default: [] 
    }],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: { type: Date, default: Date.now },
});

const Card = mongoose.model("Card", cardSchema, "cards");

async function generateBizNumber() {
    while (true) {
    const random = _.random(100, 9_999_999_999);
    const card = await Card.findOne({ bizNumber: random });
    if (!card) {
        return random;
    }
    }
}

function validateCard(card) {
    const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
    subtitle: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(2).max(1024).required(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),
    email: Joi.string().min(6).max(255).email().required(),
    web: Joi.string().uri().allow(""),
    image: Joi.object({
        url: Joi.string().optional().allow("").default('https://pixabay.com/photos/imprint-about-us-map-hand-finger-2508603/'),
        alt: Joi.string().optional().allow("").default("business card image")
        }).optional(),
    address: Joi.object({
            state: Joi.string().min(2).max(255).optional().allow("").default("not defined"),
            country: Joi.string().min(2).max(255).required(),
            city: Joi.string().min(2).max(255).required(),
            street: Joi.string().min(2).max(255).required(),
            houseNumber: Joi.number().min(1).max(10).required(),
            zip: Joi.number().default(0),
        }).required(),
    });

    return schema.validate(card);
}

module.exports = {
    Card,
    generateBizNumber,
    validateCard,
};