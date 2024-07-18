const { INSERT } = require('sequelize/lib/query-types');
const sql = require('./db.js');

const Grupo = function(grupo){
    this.nombreGrupo = grupo.NombreGrupo;
    this.materias = JSON.stringify(grupo.Materias);
}
/*

Grupo.create = (newGrupo,result)=>{
  console.log(newGrupo.nombreGrupo)
  console.log("AQUOIIIIIIIII")
  
    sql.query('INSERT INTO grupo (NombreGrupo) values(?)',[newGrupo.nombreGrupo],(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Grupo: ", { id: res.insertId, ...newGrupo });
        result(null, { id: res.insertId, ...newGrupo });
        const idgrupo = res.insertId;
        console.log(idgrupo)
    console.log(JSON.parse(newGrupo.materias)[0].idMateria)
    const values = JSON.parse(newGrupo.materias).map(grupo =>
    [idgrupo,grupo.idMateria]);
    sql.query('INSERT INTO grupomateria (idGrupo,idMateria) values (?,?) ',[values],(err,res)=>{
      if(err){
          console.log("error: ", err);
          result(err, null);
          return;
      }
      console.log("created conexion: ", { id: res.insertId, ...newGrupo });
      result(null, { id: res.insertId, ...newGrupo });
  });
    });
    
    
    
}*/
/*
Grupo.create = (newGrupo, result) => {
  console.log(newGrupo.nombreGrupo);
  console.log("AQUOIIIIIIIII");

  sql.query('INSERT INTO grupo (NombreGrupo) values(?)', [newGrupo.nombreGrupo], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created Grupo: ", { id: res.insertId, ...newGrupo });
    result(null, { id: res.insertId, ...newGrupo });
    const idgrupo = res.insertId;
    console.log(idgrupo);

    const values = JSON.parse(newGrupo.materias).map(grupo => [idgrupo, grupo.idMateria]);
    let query = 'INSERT INTO grupomateria (idGrupo,idMateria) values ';
    query += values.map(value => '(?, ?)').join(', ');

    sql.query(query, values.flat(), (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created conexion: ", { id: res.insertId, ...newGrupo });
      result(null, { id: res.insertId, ...newGrupo });
    });
  });
};
*/

Grupo.create = (newGrupo, result) => {

  sql.query('INSERT INTO grupo (NombreGrupo) values(?)', [newGrupo.nombreGrupo], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    const idres = res.insertId;
    console.log("created Grupo: ", { id: res.insertId, ...newGrupo });
    const idgrupo = res.insertId;
    console.log(idgrupo);

    const values = JSON.parse(newGrupo.materias).map(grupo => [idgrupo, grupo.idMateria]);
    let query = 'INSERT INTO grupomateria (idGrupo,idMateria) values ';
    query += values.map(value => '(?, ?)').join(', ');

    sql.query(query, values.flat(), (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      //console.log("created conexion: ", { id: res.insertId, ...newGrupo });
      result(null, { id: idres, ...newGrupo });
    });
  });
};

/*
Grupo.getAll = (nombre, result) => {
    let query = "SELECT * FROM grupo";
  
    if (nombre) {
      query += ` WHERE NombreGrupo LIKE '%${nombre}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Grupo: ", res);
      result(null, res);
    });
  };*/
  Grupo.getAll = (nombre, result) => {
    let query = `
        SELECT 
            g.idGrupo,
            g.NombreGrupo,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'idMateria', gm.idMateria,  -- Mostrar el idMateria
                    'materia', CASE WHEN gm.idMateria IS NOT NULL THEN m.NombreMateria ELSE NULL END
                )
            ) AS Materias
        FROM grupo g
        LEFT JOIN grupomateria gm ON g.idGrupo = gm.idGrupo
        LEFT JOIN materia m ON gm.idMateria = m.idMateria
        GROUP BY g.idGrupo, g.NombreGrupo;
    `;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error en consulta principal: ", err);
            result(err, null);
            return;
        }

        // Procesar cada fila para ajustar el resultado
        const formattedResult = res.map(row => {
            // Parsear el campo Materias como objeto JavaScript
            const materias = JSON.parse(row.Materias);

            return {
                idGrupo: row.idGrupo,
                NombreGrupo: row.NombreGrupo,
                Materias: materias.map(materia => ({
                    idMateria: materia.idMateria,  // Incluir el idMateria en cada materia
                    materia: materia.materia
                }))
            };
        });

        console.log("Consulta preparada y ejecutada exitosamente.");
        console.log("Resultado formateado:");
        console.log(formattedResult);

        result(null, formattedResult);
    });
};



  
  
  



  
  

  Grupo.remove = (id, result) => {
    sql.query("DELETE FROM grupo WHERE idGrupo = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Grupo with idGrupo: ", id);
      result(null, res);
    });
  };





  

  Grupo.updateById = (id,grupo, result) => {

    sql.query('UPDATE grupo SET NombreGrupo=? WHERE idGrupo = ?',
       [grupo.nombreGrupo,id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      const idres = id;
      console.log("updated Grupo: ", { id: id, ...grupo });
      const idgrupo = id;
      console.log(idgrupo);
  
      const values = JSON.parse(grupo.materias).map(grupo => [idgrupo, grupo.idMateria]);
      console.log(values)
      let query = 'INSERT INTO grupomateria (idGrupo,idMateria) values ';
      query += values.map(value => '(?, ?)').join(', ');
  
      sql.query(query, values.flat(), (err, res) => {
          if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        //console.log("created conexion: ", { id: res.insertId, ...newGrupo });
        result(null, { id: idres, ...grupo });
      });
    });
  };
  module.exports = Grupo;