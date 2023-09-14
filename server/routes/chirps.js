const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.send("chirps");
});

module.exports = router;
