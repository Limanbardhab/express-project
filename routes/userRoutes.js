const express = require('express');
const router = express.Router();
const {registration, loginUser, currentInfUser } = require("../controllers/usercontroller");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register",registration);

router.post("/login",loginUser);

router.get("/current",validateToken,currentInfUser);


module.exports = router;