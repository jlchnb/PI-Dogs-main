const { Router } = require("express");
const router = Router();
const {middleDogGet, middleDogPost, middleDogIdGet} = require('../routes/middlewares/dogs')
const {middleTemp} = require('../routes/middlewares/temperaments')


// Configurar los routers

// Get /Dogs
router.get("/dogs", middleDogGet)

// Get /Temperament
router.get("/temperament", middleTemp)

// Post /Dogs
router.post("/dogs",middleDogPost)

// Get /Dogs:id
router.get("/dogs/:id",middleDogIdGet)

module.exports = router;