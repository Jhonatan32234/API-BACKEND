module.exports = app =>{

    const actividad = require('../controllers/actividad.controller.js');
    
     var router = require('express').Router();

     router.post('/create',actividad.create);

     router.get('/all',actividad.findAll);

     router.put('/:idActividad/:idGrupo/:idMateria',actividad.update);

     router.delete('/:idActividad',actividad.delete);

     app.use('/api/actividad',router);
}

