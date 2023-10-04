import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Restaurant from './models/restaurant.js';

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express()
const port = 3000
import exphbs from 'express-handlebars'
// const restaurantData = require('./restaurant.json')
import restaurantData from "./restaurant.json" assert { type: "json" };

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.static("public"));


app.get('/', (req, res) => {
  // res.send('This is my restaurant list build with Express')
  // res.render('index', {restaurants: restaurantData.results})
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.error(error))
})
app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantData.results.filter(shop => {
    return shop.name.toLowerCase().includes(keyword.toLowerCase());
  })
  res.render("index", { restaurants: restaurants, keyword: keyword });
})
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', {restaurant}))
  // const restaurant = restaurantData.results.find(
  //   (shop) => shop.id.toString() === req.params.res_id
  // );
  // // console.log(restaurant)
  // res.render('show', { restaurant: restaurant });
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})