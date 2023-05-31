const articleRoutes = require("express").Router();
//const articleData = require('../articles.json');
const validator = require("../helpers/validator");
const users = require("../models/user");
const articles = require("../models/user");
const bodyParser = require("body-parser");
const verifyToken = require("../middleware/authJWT");
//const path = require('path');
//const fs = require("fs");

articleRoutes.use(bodyParser.urlencoded({ extended: false }));
articleRoutes.use(bodyParser.json());

articleRoutes.post("/users/:userId/articles", verifyToken, async (req, res) => {
  if (!req.user && req.message == null) {
    res.status(403).send({
      message: "Invalid JWT token",
    });
  } else if (!req.user && req.message) {
    res.status(403).send({
      message: req.message,
    });
  }
  const userId = req.params.userId;
  const articleDetails = req.body;
  const userData = await articles.insertOne({ articleDetails });

  if (validator.validatearticleInfo(articleDetails, articleData).status) {
    articleData.push(articleDetails);
    res.status(200);
    res.json(validator.validatearticleInfo(articleDetails, articleData));
  } else {
    res.status(400);
    res.json(validator.validatearticleInfo(articleDetails, articleData));
  }
});

articleRoutes.get("/articles", verifyToken, async (req, res) => {
  if (!req.user && req.message == null) {
    res.status(403).send({
      message: "Invalid JWT token",
    });
  } else if (!req.user && req.message) {
    res.status(403).send({
      message: req.message,
    });
  }
  const articleData = await articles.find({});
  res.status(200);
  res.send(articleData);
});

articleRoutes.patch("/users/:userId", async (req, res) => {
  let userId = req.params.userId;
  let data = req.body;

  if(data.age){
    let age = data.age;
    const updateAge = await users.updateOne({"userId": userId},{age : age})
  }
  if(data.name){
    let name = data.fullName;
    const updateAge = await users.updateOne({"userId": userId},{fullName : name})
  }

  res.status(200);
  res.send({message: "user data has been updated."});
});

module.exports = articleRoutes;
