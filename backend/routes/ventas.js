const express = require('express');
const router = express.Router();
const Venta = require('../models/Venta');
const Producto = require('../models/Producto');

router.post("/", async (req, res) => {
  const { carrito } = req.body;

  if (!carrito || carrito.length === 0) {
    return res.status(400).json({ error: "El carrito está vacío." });
  }

  try {
    // Calcular el total
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    // Crear la venta con el total
    const venta = await Venta.create({ total });

    // Actualizar el stock de los productos
    for (const item of carrito) {
      const producto = await Producto.findByPk(item.id);

      if (!producto) {
        return res.status(404).json({ error: `Producto con ID ${item.id} no encontrado` });
      }

      if (producto.stock < item.cantidad) {
        return res.status(400).json({ error: `Stock insuficiente para ${producto.nombre}` });
      }

      producto.stock -= item.cantidad;
      await producto.save();
    }

    res.json({ mensaje: "Venta registrada exitosamente", ventaId: venta.id });
  } catch (error) {
    console.error("Error al registrar la venta:", error);
    res.status(500).json({ error: "Error al procesar la venta." });
  }
});

module.exports = router;
