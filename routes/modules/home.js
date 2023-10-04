import express from "express";
const router = express.Router();

import Restaurant from "../../models/restaurant.js";

router.get("/", (req, res) => {
  // res.send('This is my restaurant list build with Express')
  // res.render('index', {restaurants: restaurantData.results})
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render("index", { restaurants }))
    .catch((error) => console.error(error));
});

export default router