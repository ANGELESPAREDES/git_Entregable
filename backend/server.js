const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const Item = require("./models/Item");
const Producto = require('./models/Producto');
const Doctor = require('./models/Doctor');


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/items", require("./routes/items"));
app.use("/api/productos", require("./routes/productos"));
app.use("/api/doctores", require("./routes/doctores"));
app.use("/api/ventas", require("./routes/ventas"));


const PORT = process.env.PORT || 5000;

// Sincronizar la base de datos
sequelize.sync().then(() => {
  console.log("Base de datos conectada");
  app.listen(PORT, () => { 
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}).catch(err => {
  console.error("Error al conectar con la base de datos:", err);
});
