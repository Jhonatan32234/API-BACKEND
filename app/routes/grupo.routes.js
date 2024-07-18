module.exports = app =>{

    const grupo = require('../controllers/grupo.controller.js');
    
     var router = require('express').Router();

     router.post('/create',grupo.create);

     router.get('/all',grupo.findAll);

     router.put('/:idGrupo',grupo.update);

     router.delete('/:idGrupo',grupo.delete);

     app.use('/api/grupo',router);
}

