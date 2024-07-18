module.exports = app =>{

    const materia = require('../controllers/materia.controller.js');
    
     var router = require('express').Router();

     router.post('/create',materia.create);

     router.get('/all',materia.findAll);

     router.put('/:idMateria',materia.update);

     router.delete('/:idMateria',materia.delete);

     app.use('/api/materia',router);
}

