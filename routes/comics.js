const express = require("express");
const router = express.Router();
const axios = require("axios");

// une route pour récup les comics
router.get("/comics", async (req, res) => {
  try {
    // - paramètre de recherche (titre)
    console.log(req.query);
    let query = `apiKey=${process.env.API_KEY}`;

    if (req.query.title) {
      query = query + `&title=${req.query.title}`;
    }
    if (req.query.skip) {
      query =
        query + `&skip=${(req.query.skip - 1) * (req.query.limit || 100)}`;
    }
    if (req.query.limit) {
      query += `&limit=${req.query.limit}`;
    }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?${query}`
    );
    console.log(response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// une route pour récup les comics liés à un  personnage (ID => params)
router.get("/comics/:characterID", async (req, res) => {
  try {
    // - paramètre de recherche (titre)
    console.log("query =>", req.query);
    console.log("params =>", req.params.characterID);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterID}?apiKey=${process.env.API_KEY}`
    );
    console.log(response.data.comics.length);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
// une route pour récup les détails d'un comic
router.get("/comicsdetail/:comicId", async (req, res) => {
  try {
    // - paramètre de recherche (titre)
    console.log("query =>", req.query);
    console.log("paramseeee =>", req.params.comicId);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.comicId}?apiKey=${process.env.API_KEY}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
