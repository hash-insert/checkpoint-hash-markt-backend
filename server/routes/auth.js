const express = require("express");
const router = express.Router();

const { signup, login, logout } = require("../controllers/auth");

router.post("/signup", signup);
router.post("/signin", login);
router.get("/logout", logout);

module.exports = router;
