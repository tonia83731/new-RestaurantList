import express from "express";
const router = express.Router();

import Restaurant from "../../models/restaurant.js";

router.get("/", (req, res) => {
  const keywords = req.query.keyword;
  if (!keywords) return res.redirect("/");
  const sortMethod = req.query.sortMethod
  console.log(sortMethod)
  let sortIndex = {name: 'asc'}
  switch (sortMethod) {
    case "評分":
      sortIndex = { rating: "desc" };
      break;
    case "A → Z":
      sortIndex = { name: "asc" };
      break;
    case "Z → A":
      sortIndex = { name: "desc" };
      break;
    default:
      sortIndex = { name: "asc" };
      break;
  }
  Restaurant.find({})
    .lean()
    .sort(sortIndex)
    .then((restaurants) => {
      const restaurant = restaurants.filter((shop) => {
        return (
          shop.name.trim().toLowerCase().includes(keywords.toLowerCase()) ||
          shop.category.includes(keywords.toLowerCase())
        );
      });
      res.render("index", { restaurants: restaurant, keywords, sortMethod });
    })
    .catch((error) => console.error(error));
});

export default router