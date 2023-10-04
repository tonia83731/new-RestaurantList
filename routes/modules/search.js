import express from "express";
const router = express.Router();

import Restaurant from "../../models/restaurant.js";

router.get("/", (req, res) => {
  // if (!req.query.keyword) res.redirect("/");
  const keywords = req.query.keyword;
  // console.log(keywords)
  if (!keywords) return res.redirect("/");
  // const keyword = req.query.keywords.trim().toLowerCase();
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      const restaurant = restaurants.filter((shop) => {
        return (
          shop.name.trim().toLowerCase().includes(keywords.toLowerCase()) ||
          shop.category.includes(keywords.toLowerCase())
        );
      });
      // console.log(restaurant)
      res.render("index", { restaurants: restaurant, keywords });
    })
    .catch((error) => console.error(error));
  // const restaurants = restaurantData.results.filter(shop => {
  //   return shop.name.toLowerCase().includes(keyword.toLowerCase());
  // })
  // res.render("index", { restaurants: restaurants, keyword: keyword });
});

export default router