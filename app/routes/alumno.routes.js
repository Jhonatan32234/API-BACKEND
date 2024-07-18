module.exports = app =>{

    const alumnos = require('../controllers/alumno.controller.js');
    
     var router = require('express').Router();

     router.post('/create',alumnos.create);

     router.get("/only/:idGrupo",alumnos.only)

     router.get('/all',alumnos.findAll);

     router.put('/:idAlumno',alumnos.update);

     router.delete('/:idAlumno',alumnos.delete);

     app.use('/api/alumnos',router);
}

