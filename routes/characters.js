const express = require("express");
const router = express.Router();
const axios = require("axios");

// Une route pour récupérer les personnages
router.get("/characters", async (req, res) => {
  try {
    let query = `apiKey=${process.env.API_KEY}`;

    if (req.query.name) {
      query += `&name=${req.query.name}`;
    }
    if (req.query.skip) {
      // Assure-toi que la logique de pagination fonctionne comme prévu avec le nouveau `limit`
      query += `&skip=${(req.query.skip - 1) * (req.query.limit || 100)}`;
    }
    if (req.query.limit) {
      query += `&limit=${req.query.limit}`;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?${query}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Une route pour récupérer le détail d'un personnage
router.get("/characterdetail/:characterID", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterID}?apiKey=${process.env.API_KEY}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
