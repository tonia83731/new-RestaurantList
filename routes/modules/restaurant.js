import express from "express";
const router = express.Router();

import Restaurant from "../../models/restaurant.js";

router.get("/new", (req, res) => {
  return res.render("new");
});
router.post("/", (req, res) => {
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  return Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  })
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("show", { restaurant }))
    .catch((error) => console.log(error));
  // const restaurant = restaurantData.results.find(
  //   (shop) => shop.id.toString() === req.params.res_id
  // );
  // // console.log(restaurant)
  // res.render('show', { restaurant: restaurant });
});
router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.log(error));
});
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = name;
      restaurant.name_en = name_en;
      restaurant.category = category;
      restaurant.image = image;
      restaurant.location = location;
      restaurant.phone = phone;
      restaurant.google_map = google_map;
      restaurant.rating = rating;
      restaurant.description = description;
      return restaurant.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error));
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.deleteOne())
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
});

export default router