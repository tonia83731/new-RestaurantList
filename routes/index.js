import express from "express";
const router = express.Router()

import home from './modules/home.js'
import search from './modules/search.js'
import restaurant from './modules/restaurant.js'


router.use('/', home)
router.use('/search', search)
router.use('/restaurants', restaurant)

export default router