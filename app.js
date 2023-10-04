import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import Restaurant from './models/restaurant.js';
import routes from './routes/index.js'

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

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
app.use(routes)

// app.get('/', (req, res) => {
//   // res.send('This is my restaurant list build with Express')
//   // res.render('index', {restaurants: restaurantData.results})
//   Restaurant.find()
//     .lean()
//     .then(restaurants => res.render('index', {restaurants}))
//     .catch(error => console.error(error))
// })
// app.get('/search', (req, res) => {
//   // if (!req.query.keyword) res.redirect("/");
//   const keywords = req.query.keyword;
//   // console.log(keywords)
//   if(!keywords) return res.redirect("/");
//   // const keyword = req.query.keywords.trim().toLowerCase();
//   Restaurant.find()
//     .lean()
//     .then(restaurants => {
//       const restaurant = restaurants.filter(shop => {
//         return shop.name.trim().toLowerCase().includes(keywords.toLowerCase()) ||
//           shop.category.includes(keywords.toLowerCase());
//       });
//       // console.log(restaurant)
//       res.render("index", { restaurants: restaurant, keywords });
//     })
//     .catch((error) => console.error(error));
//   // const restaurants = restaurantData.results.filter(shop => {
//   //   return shop.name.toLowerCase().includes(keyword.toLowerCase());
//   // })
//   // res.render("index", { restaurants: restaurants, keyword: keyword });
// })
// app.get('/restaurants/new', (req, res) => {
//   return res.render('new')
// })
// app.post("/restaurants", (req, res) => {
//   const {name, name_en, category, image, location, phone, google_map, rating, description} = req.body
//   return Restaurant.create({
//     name,
//     name_en,
//     category,
//     image,
//     location,
//     phone,
//     google_map,
//     rating,
//     description,
//   })
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// });
// app.get('/restaurants/:id', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .lean()
//     .then((restaurant) => res.render("show", { restaurant }))
//     .catch((error) => console.log(error));
//   // const restaurant = restaurantData.results.find(
//   //   (shop) => shop.id.toString() === req.params.res_id
//   // );
//   // // console.log(restaurant)
//   // res.render('show', { restaurant: restaurant });
// })
// app.get("/restaurants/:id/edit", (req, res) => {
//   const id = req.params.id;
//   return Restaurant.findById(id)
//     .lean()
//     .then((restaurant) => res.render("edit", { restaurant }))
//     .catch(error => console.log(error))
// });
// app.put("/restaurants/:id", (req, res) => {
//   const id = req.params.id;
//   const {
//     name,
//     name_en,
//     category,
//     image,
//     location,
//     phone,
//     google_map,
//     rating,
//     description,
//   } = req.body;
//   return Restaurant.findById(id)
//     .then((restaurant) => {
//       restaurant.name = name;
//       restaurant.name_en = name_en;
//       restaurant.category = category;
//       restaurant.image = image;
//       restaurant.location = location;
//       restaurant.phone = phone;
//       restaurant.google_map = google_map;
//       restaurant.rating = rating;
//       restaurant.description = description;
//       return restaurant.save();
//     })
//     .then(() => res.redirect(`/restaurants/${id}`))
//     .catch((error) => console.log(error));
// });
// app.delete('/restaurants/:id', (req, res) => {
//   const id = req.params.id
//   return Restaurant.findById(id)
//     .then((restaurant) => restaurant.deleteOne())
//     .then(() => res.redirect("/"))
//     .catch((error) => console.log(error));
// })

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})