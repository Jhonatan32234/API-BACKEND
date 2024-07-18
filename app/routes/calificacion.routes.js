module.exports = app =>{

    const calificacion = require('../controllers/calificacion.controller.js');
    
     var router = require('express').Router();

     router.post('/create',calificacion.create);

     router.get('/all',calificacion.findAll);

     router.put('/:idCalificacion',calificacion.update);

     router.delete('/:idCalificacion',calificacion.delete);

     app.use('/api/calificacion',router);
}

