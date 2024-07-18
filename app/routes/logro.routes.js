module.exports = app =>{

    const logro = require('../controllers/logro.controller.js');
    
     var router = require('express').Router();

     router.post('/create',logro.create);

     router.get('/all',logro.findAll);

     router.put('/:idLogro',logro.update);

     router.delete('/:idLogro',logro.delete);

     app.use('/api/logro',router);
}

