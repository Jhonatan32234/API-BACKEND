const sql = require('./db.js');

const calActividad = function(calActividad){
    this.idAlumno = JSON.stringify(calActividad.idAlumno);
    this.calificacion = JSON.stringify(calActividad.Calificacion);
    this.corte = calActividad.Corte;
}




  module.exports = calActividad;

