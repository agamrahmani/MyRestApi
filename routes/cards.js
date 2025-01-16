const express = require("express");

const router = express.Router();
const authMW = require("../middleware/auth");

const { validateCard, Card, generateBizNumber } = require("../model/card");

router.get("/", async (req,res) => {
    try {
        const cards = await Card.find({});

        res.json(cards);
    } catch (error) {
        res.status(500).send("Error retrieving users.");
    }
});

router.get("/my-cards", authMW, async (req,res) => {
    try {
      const cards = await Card.find({ user_id: req.user._id });
      // if (cards.length === 0) {
      //       return res.status(404).send("No cards found for this user.");
      //   }

        res.json(cards);
    } catch (error) {
        res.status(500).send("Error retrieving cards.");
    }
});

router.get("/:id", async (req, res) => {
  try{
const card = await Card.findOne({_id: req.params.id});

  if (!card) {
    res.status(404).send("The card with the given ID was not found.");
    return;
  }

  res.send(card);
  } catch (error) {
        res.status(500).send("Error retrieving cards.");
    } 
});

router.post("/", authMW, async (req, res) => {
    const { error } = validateCard(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
    return;
    }

    if (!req.user.isBusiness) {
        res.status(400).send(req.user);
    return;
    }

    if (!req.body.bizNumber) {
        req.body.bizNumber = await generateBizNumber();
    }

    const card = await new Card({
    ...req.body,
    user_id: req.user._id,
    }).save();

    res.json(card);
});

router.put("/:id", authMW, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const card = await Card.findOneAndUpdate(
    {
      _id: req.params.id,
      user_id: req.user._id,
    },
    req.body,
    { returnDocument: "after" }
  );

  if (!card) {
    res.status(404).send("The card with the given ID was not found.");
    return;
  }

  res.send(card);
});

router.patch("/:id",authMW, async (req, res) => {
  try{
const card = await Card.findOne({_id: req.params.id});

  if (!card) {
    res.status(404).send("The card with the given ID was not found.");
    return;
  }
  const userId = req.user._id;
  const alreadyLiked = card.likes.includes(userId);
  if (alreadyLiked) {
      return res.status(400).send("You have already liked this card.");
    }
    card.likes.push(userId);
    await card.save();

  res.send(card);
  } catch (error) {
        res.status(500).send("Error updating card.");
    } 
});

router.delete("/:id", authMW, async (req, res) => {
  try{
  const card = await Card.findById(req.params.id);
    if (!user) {
            return res.status(404).send("The user with the given ID was not found.");
        }
        if (req.user._id !== user._id && !req.user.isAdmin) {
            return res.status(403).send("You are not authorized to delete this user.");
        }
    
    await Card.deleteOne({ _id: req.params.id })

  res.send(card);
  } catch (error) {
        res.status(500).send("Error deleting card.");
    } 
});



module.exports = router;