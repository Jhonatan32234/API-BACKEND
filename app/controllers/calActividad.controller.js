const calActividad = require('../models/calActividad.model.js');


exports.calificate = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    let idActividad = req.params.idActividad;
    //console.log("Recibir"+req.body.NombreActividad);
    const calAct = new calActividad({
      idAlumno:req.body.idAlumno,
      Calificacion:req.body.Calificacion,
      Corte:req.body.Corte
    });
    //console.log("Preparar "+req.body.idAlumno)
    calActividad.calificate(idActividad,calAct, (err, data) => {
      //console.log('enviar'+actividad.NombreActividad)
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Actividad."
        });
      
      else res.send(data);
    });
  };



  exports.findAll = (req, res) => {
    const nombre = req.query.NombreActividad;
  
    Actividad.getAll(nombre, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Actividad."
        });
      else res.send(data);
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log("AQui");
    console.log(req.body);
    let grupo = req.params.idGrupo;
    let materia = req.params.idMateria;
    console.log(grupo+materia)
  
    Actividad.updateById(
      req.params.idActividad,grupo,materia,
      new Actividad(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Actividad with id ${req.params.idActividad}.`+req.body.NombreActividad
            });
          } else {
            res.status(500).send({
              message: "Error updating Actividad with id " + req.params.idActividad
            });
          }
        } else res.send(data);
      }
    );
  };
  
  exports.delete = (req, res) => {
    Actividad.remove(req.params.idActividad, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Actividad with id ${req.params.idActividad}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Actividad with id " + req.params.idActividad
          });
        }
      } else res.send({ message: `Actividad was deleted successfully!` });
    });
  };
  

