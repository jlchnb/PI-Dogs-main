const { Router } = require("express");
const router = Router();
const {middleDogGet, middleDogPost, middleDogIdGet} = require('../routes/middlewares/dogs')
const {middleTemp} = require('../routes/middlewares/temperaments')


// Configurar los routers

// Get /Characters
router.get("/dogs", middleDogGet)

// Get /episodes
router.get("/temperament", middleTemp)

// Post /Character
router.post("/dogs",middleDogPost)

// Get /Dog:id
router.get("/dogs/:id",middleDogIdGet)

module.exports = router;