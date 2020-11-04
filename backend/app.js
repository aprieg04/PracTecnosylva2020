const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const Sequelize = require("sequelize");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = new Sequelize("tecnosylva", "root", "", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false
  }
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

class Usuarios extends Sequelize.Model {}
Usuarios.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: Sequelize.STRING,
    password: Sequelize.STRING,
    creationDate: Sequelize.STRING,
    phoneNumber: Sequelize.STRING,
    email: Sequelize.STRING,
    fk_IdEstado: {
      type: Sequelize.INTEGER,
      references: {
        model: 'estados',
        key: 'idEstados'
      }
    },
    tipoUsuario: {
      type: Sequelize.INTEGER,
      references: {
        model: 'tipoUsuarios',
        key: 'idTipoUsuario'
      }
    }
  },
  { sequelize, modelName: "usuarios" }
);

app.post("/login", function(req, res) {
  sequelize
    .query(
      "SELECT idUsuario, nombreUsuario FROM usuarios WHERE (nombre = '" + req.body.nombUsuario + "' AND password = '" + req.body.password + "' )",
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(users => {
      if (users.length != 0) {
        res.json(users);
      } else {
        res.send({ login: false });
      }
    });
});

app.listen(port, function() {
  console.log("Example app listening on port " + 3000);
});