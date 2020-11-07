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
    idUsuario: {
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

class Capas extends Sequelize.Model{}
Capas.init(
  {
    id: {
      type:Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: Sequelize.STRING,
    url: Sequelize.STRING,
    descripcion: Sequelize.STRING
  },
    { sequelize, modelName: "capas" }
);

class Mapas extends Sequelize.Model{}
Mapas.init(
  {
    id: {
      type:Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: Sequelize.STRING,
    url: Sequelize.STRING,
    descripcion: Sequelize.STRING
  },
    { sequelize, modelName: "mapas" }
);

class CapasMapas extends Sequelize.Model{}
CapasMapas.init(
  {
    idCapa:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'capas',
        key: 'idCapa'
      }
    },
    idMapa:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'mapas',
        key: 'idMapa'
      }
    }
  },
  { sequelize, modelName: "capasmapas" }
)

class Estados extends Sequelize.Model{}
Estados.init(
  {
    idEstados:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: Sequelize.STRING,
    tipoEstados: Sequelize.INTEGER
  },
  { sequelize, modelName: "estados" }
)

class Peticiones extends Sequelize.Model{}
Peticiones.init(
  {
    idPeticiones:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tipoPeticiones: Sequelize.STRING,
    fk_IdUsuario:
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'usuarios',
        key: 'idUsuario'
      }
    }
  },
  { sequelize, modelName: "peticiones"}
)

class TipoUsuarios extends Sequelize.Model{}
TipoUsuarios.init(
  {
    idTipoUsuario:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    usuario: Sequelize.STRING,
  },
  { sequelize, modelName: "tipoUsuarios"}
)

class UsuarioMapas extends Sequelize.Model{}
UsuarioMapas.init(
  {
    idMapa:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'mapas',
        key: 'idMapa'
      }
    },
    idUsuario:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'usuarios',
        key: 'idUsuario'
      }
    }
  },
  { sequelize, modelName: "capasmapas" }
)

app.post("/login", function(req, res) {
  sequelize
    .query(
      "SELECT idUsuario, Nombre FROM usuarios WHERE (nombre = '" + req.body.nombUsuario + "' AND password = '" + req.body.password + "' )",
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