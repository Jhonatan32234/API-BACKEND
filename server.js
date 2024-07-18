const express = require("express");
const https = require("https")


const cors = require("cors");
const rateLimit = require('express-rate-limit')
const app = express();




const apiLimiter = rateLimit({

  windowMs: 10 * 60 * 1000, // 15 minutes
  
  max: 50, // limit each IP to 100 requests per windowMs
  
  message: 'Too many requests from this IP, please try again later.',
  
  });



app.use('/api/', apiLimiter);




app.get('/api/data', (req, res) => {

  res.json({ message: 'API data response' });
  
  });
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


app.use(express.json()); 

app.use(express.urlencoded({ extended: true })); 


const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();



app.get("/", (req, res) => {
  res.json({ message: "Welcome to Integrador application." });
});

require("./app/routes/tutorial.routes.js")(app);
require("./app/routes/actividad.routes.js")(app);
require("./app/routes/alumno.routes.js")(app);
require("./app/routes/asistencia.routes.js")(app);
require("./app/routes/conducta.routes.js")(app);
require("./app/routes/examen.routes.js")(app);
require("./app/routes/grupo.routes.js")(app);
require("./app/routes/logro.routes.js")(app);
require("./app/routes/materia.routes.js")(app);
require("./app/routes/calificacion.routes.js")(app);

require("./app/routes/calActividad.routes.js")(app);


require('./app/routes/auth.routes.js')(app);
require('./app/routes/user.routes.js')(app);
/*
https.createServer(options, app).listen(8080, () => {
  console.log('Servidor HTTPS corriendo en el puerto 8080');
  });
*/

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "docente"
  });
  Role.create({
    id: 2,
    name: "admin"
  });
}