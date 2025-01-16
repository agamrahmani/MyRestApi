require("dotenv/config");

const PORT = 3007;

const mongoose = require("mongoose");
const express = require ("express");
const cors = require("cors");
const morgan = require('morgan');
const bcrypt = require("bcrypt");
const chalk = require('chalk');
const { User } = require("./model/usres");
const { Card, generateBizNumber } = require("./model/card");
const initialusers = require('./initialusers');
const initialcards = require('./initialCards');
const errorLoggerMW = require('./middleware/errorLoggerMW');

const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const cardsRouter = require("./routes/cards");

const app = express();

morgan.token('time', () => new Date().toLocaleString());
const customFormat = (tokens, req, res) => {
    const methodColor = chalk.keyword('cyan')(tokens.method(req, res));
    const urlColor = chalk.keyword('yellow')(tokens.url(req, res));
    const responseTimeColor = chalk.keyword('magenta')(tokens['response-time'](req, res) + ' ms'); 

    const statusColor = res.statusCode >= 400 ? chalk.keyword('red') : chalk.keyword('green');
    const statusText = statusColor(tokens.status(req, res)); 
    return `${tokens.time(req, res)} ${methodColor} ${urlColor} ${statusText} ${responseTimeColor}`;
};

app.use(morgan(customFormat));
app.use(express.json());
app.use(cors());
app.use(errorLoggerMW);

app.use("/users", userRouter);
app.use("/login", authRouter);
app.use("/cards", cardsRouter);


const uri = process.env.ENVIRONMENT === "production" ? process.env.CONNECTION_STRING_ATLAS : process.env.LOCAL_CONNECTION_STRING;
connect();

async function connect() {
    await mongoose.connect(uri)
        .then(() => uri == process.env.LOCAL_CONNECTION_STRING ? console.log("Connected to MongodB") : console.log("You connect to Atlas server"))
        .catch(err => console.log("Error :" + err.message))

    app.listen(PORT,
        () => {
            console.log(`listening on port ${PORT}`);
            if (uri == process.env.LOCAL_CONNECTION_STRING) {
                createUsers();
                createCards();
            }
        })

}

async function createUsers() {
    const usersFromDb = await User.find();
    initialusers.forEach(async user => {
        const userLength = await User.find().countDocuments();
        if (userLength >= 3) {
            return;
        }
        if (usersFromDb.find((dbUser) => dbUser.email === user.email)) {
            console.log(`User ${user.email} already exists in the database`)
            return;
        }
        const newUser = new User(user);
        newUser.password = await bcrypt.hash(user.password, 12);
        newUser.save()
    });
}

async function createCards() {
    const cardsFromDb = await Card.find();
    initialcards.forEach(async card => {
        
        const cardsLength = await Card.find().countDocuments();
        if (cardsLength >= 3) {
            return;
        }
        if (cardsFromDb.find((dbCard) => dbCard.bizNumber === card.bizNumber)) {
            console.log(`card ${card.bizNumber} already exists in the database`)
            return;
        }
        else{
            if (!card.bizNumber) {
            card.bizNumber = await generateBizNumber(); 
            }
            const newCard = new Card(card);
            newCard.save()
        }       
    });
}
