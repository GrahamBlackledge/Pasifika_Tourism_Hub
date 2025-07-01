const Country = require("../models/Country");

const express = require("express");
const router = express.Router();


// get all countries
const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get single country by id
const getCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) return res.status(404).json({ error: "Country not found" });
    res.json(country);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get single country by name
const getCountryBySlug = async (req, res) => {
  try {
    const country = await Country.findOne({ slug: req.params.slug });
    if (!country) return res.status(404).json({ error: "Country not found" });
    res.json(country);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// create a country
const addCountry = async (req, res) => {
  const { countryName, slug, intro, history, language, exploration } = req.body;

  try {
    const newCountry = new Country({
      countryName,
      slug,
      intro,
      history,
      language,
      exploration,
    });

    const saved = await newCountry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// update country by id
const updateCountryById = async (req, res) => {
  try {
    const updated = await Country.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Country not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete country by id
const deleteCountryById = async (req, res) => {
  try {
    const deleted = await Country.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Country not found" });
    }
    res.json({ message: "Country deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addCountry,
  getAllCountries,
  getCountryById,
  getCountryBySlug,
  updateCountryById,
  deleteCountryById,
};
