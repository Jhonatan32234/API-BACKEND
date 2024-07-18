module.exports = app =>{

    const actividad = require('../controllers/calActividad.controller.js');
    
     var router = require('express').Router();

     router.post('/calificate/:idActividad',actividad.calificate);

     router.get('/all',actividad.findAll);

     router.put('/:idActividad/:idGrupo/:idMateria',actividad.update);

     router.delete('/:idActividad',actividad.delete);

     app.use('/api/calActividad',router);
}

