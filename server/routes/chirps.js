const express = require("express");
const chirps = require("../chirpstore");
const router = express.Router();

router.get("/:id?", (req, res) => {
	const id = req.params.id;
	if (id) {
		res.send(chirps.GetChirp(id));
	} else {
		res.send(chirps.GetChirps());
	}
});

router.post("/", (req, res) => {
	chirps.CreateChirp(req.body);
	res.sendStatus(200);
});

router.put("/:id", (req, res) => {
	const id = req.params.id;
	chirps.UpdateChirp(id, req.body);
	res.sendStatus(200);
});

router.delete("/:id", (req, res) => {
	const id = req.params.id;
	chirps.DeleteChirp(id);
	res.sendStatus(200);
});

module.exports = router;
