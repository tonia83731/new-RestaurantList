import express from 'express'
const app = express()
const port = 3000
import exphbs from 'express-handlebars'
// const restaurantData = require('./restaurant.json')
import restaurantData from "./restaurant.json" assert { type: "json" };

app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.static("public"));


app.get('/', (req, res) => {
  // res.send('This is my restaurant list build with Express')
  res.render('index', {restaurants: restaurantData.results})
})
app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantData.results.filter(shop => {
    return shop.name.toLowerCase().includes(keyword.toLowerCase());
  })
  res.render("index", { restaurants: restaurants, keyword: keyword });
})
app.get('/restaurants/:res_id', (req, res) => {
  const restaurant = restaurantData.results.find(
    (shop) => shop.id.toString() === req.params.res_id
  );
  // console.log(restaurant)
  res.render('show', { restaurant: restaurant });
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})