import express from "express";
const router = express.Router();

import Restaurant from "../../models/restaurant.js";

const sorts = [
  { sortName: "A → Z", sortBy: "AtoZ" },
  { sortName: "Z → A", sortBy: "ZtoA" },
  { sortName: "類別", sortBy: "category" },
  { sortName: "地區", sortBy: "location" },
];

router.get("/:sortBy", (req, res) => {
  const sortBy = req.params.sortBy;
  // console.log(sortBy)
  let sort = {};
  if (sortBy === "AtoZ") {
    sort = { name: "asc" };
  } else if (sortBy === "ZtoA") {
    sort = { name: "desc" };
  } else if (sortBy === "category") {
    sort = { category: "asc" };
  } else {
    sort = { location: "asc" };
  }
  Restaurant.find()
    .lean()
    .sort(sort)
    .then((restaurants) => res.render("index", { restaurants, sorts }))
    .catch((error) => console.error(error));
});

export default router;
