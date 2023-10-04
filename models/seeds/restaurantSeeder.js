import mongoose from "mongoose";
import Restaurant from "../restaurant.js";
import dotenv from "dotenv";
import restaurantData from "../../restaurant.json" assert { type: "json" };
import db from "../../config/mongoose.js";
const restaurantList = restaurantData.results
// const restaurantList = require("../restaurant-list.json").results;

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });



// const db = mongoose.connection;

// db.on("error", () => {
//   console.log("mongodb error");
// });
db.once("open", async() => {
  // console.log("mongodb connected!");
  // let restaurantList = restaurantData.results
  try {
    for (let i = 0; i < restaurantList.length; i++) {
      await Restaurant.create({
        name: `${restaurantList[i].name}`,
        name_en: `${restaurantList[i].name_en}`,
        category: `${restaurantList[i].category}`,
        image: `${restaurantList[i].image}`,
        location: `${restaurantList[i].location}`,
        phone: `${restaurantList[i].phone}`,
        google_map: `${restaurantList[i].google_map}`,
        rating: `${restaurantList[i].rating}`,
        description: `${restaurantList[i].description}`,
      });
      console.log("RestaurantSeeder done!");
    }
  } catch (error) {
    console.error(error);
  } finally {
    db.close();
  }
  // Restaurant.create(restaurantList)
  //   .then(() => {
  //     console.log("RestaurantSeeder done!");
  //     db.close();
  //   })
  //   .catch((error) => console.error(error));
});