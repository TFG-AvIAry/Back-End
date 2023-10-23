const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();
const port = process.env.PORT || 8080;


app.use(express.json());
app.use(cors());

// connection url

const connection_url =
  "mongodb+srv://example:12345@birds.3qoysym.mongodb.net/Birds-Info?retryWrites=true&w=majority";

// Conecta a la base de datos y a la colección
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  mongoose.connection.on("error", err => {
    console.error("Error de conexión a la base de datos:", err);
  });
  
  // Define un modelo de datos para tu colección (por ejemplo, 'Bird')
  const Bird = mongoose.model("Bird", {
    id: Number,
    name: String,
    imagen: String,
    habitat: String,
    esperanza_de_vida: String,
    colores: String,
    tamaño: String,
    peso: String,
    alimentación: String,
  }, "Birds Species");

// Ruta de ejemplo
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

// API para obtener todos los productos
app.get("/birds/get", async (req, res) => {
    try {
      const data = await Bird.find().exec();
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  });

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
