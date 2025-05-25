const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// Obtener doctores
router.get("/", async (req, res) => {
  try {
    const doctores = await Doctor.findAll();
    res.json(doctores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener doctores" });
  }
});

// Registrar doctor
router.post("/", async (req, res) => {
  try {
    const nuevoDoctor = await Doctor.create(req.body);
    res.status(201).json(nuevoDoctor);
  } catch (error) {
    res.status(400).json({ error: "Error al registrar doctor" });
  }
});

module.exports = router;
