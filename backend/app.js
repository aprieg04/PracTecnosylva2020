const express = require("express");
const jwt = require('jsonwebtoken')
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const Sequelize = require("sequelize");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

const sequelize = new Sequelize("Tecnosylva", "root", "pass", {
  host: "188.76.8.6",
  port: 28277,
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

function authenticateToken(req, res, nex)
{
  const authHeader = req.headers['authoritation']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if(err) return res.sendStatus(403) //Token inválido
    req.user=user
    next()
  })
}
app.listen(port, function() {
  console.log("Example app listening on port " + 3000);
});

app.post("/login", function(req, res) {

  //Authenticate user
  var username = req.body.nombre
  var password = req.body.password
  const user = {name: username,
              password: password}

  const accessToken = jwt.sign(user, ""+process.env.ACCESS_TOKEN, {expiresIn: '36000'})
  sequelize
    .query(
      "SELECT idUsuario, nombre, tipoUsuario, fk_IdEstado FROM usuarios WHERE (nombre = '" + username + "' AND password = '" + password + "' )",
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(users => {
      if (users.length != 0) {
        res.json({users, accessToken});
      } else {
        res.send({ login: false });
      }
    });
});

app.post("/register", function(req, res) {

  var username = req.body.nombre
  var pass = req.body.password
  var mail = req.body.email
  var phone = req.body.phone

  const user = {name: username,
    email: mail,
    password: pass,
    phone: phone}

  sequelize
      .query(
      "SELECT idUsuario, nombre FROM usuarios WHERE (nombre = '" + username + "' OR email = '" + mail + "')",{ 
        type: sequelize.QueryTypes.SELECT 
      }
    )
    .then(users => {
      console.log(users);
      if (users.length != 0) {
        //Si ya existe
        res.send({ signUp: false });
      } else {
        sequelize.sync().then(() =>
        //Si no existe
          Usuarios.create({
            nombre: username,
            password: pass,
            email: mail,
            phoneNumber: phone,
            fk_IdEstado: 1,
            tipoUsuario: 1
         })
          .then(()=>{
            res.send({ signUp: true });
          })
          .catch(err => {
            console.log(err)
            res.send({ signUp: false });
          })
        );
      }
    });
});
