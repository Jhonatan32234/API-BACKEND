const sql = require('./db.js');

const Materia = function(materia){
    this.nombreMateria = materia.NombreMateria;

}

Materia.create = (newMateria,result)=>{
    sql.query('INSERT INTO materia set ?',newMateria,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Materia: ", { id: res.insertId, ...newMateria });
        result(null, { id: res.insertId, ...newMateria });
    })
}

Materia.getAll = (nombre, result) => {
    let query = "SELECT * FROM materia";
  
    if (nombre) {
      query += ` WHERE NombreMateria LIKE '%${nombre}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Materia: ", res);
      result(null, res);
    });
  };

  Materia.remove = (id, result) => {
    sql.query("DELETE FROM materia WHERE idMateria = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Materia with idMateria: ", id);
      result(null, res);
    });
  };
  

  
  Materia.updateById = (id, materia, result) => {
    sql.query(
      "UPDATE materia SET NombreMateria = ? WHERE IdMateria = ?",
      [materia.nombreMateria,  id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated Materia: ", { id: id, ...materia });
        result(null, { id: id, ...materia });
      }
    );
  };

  module.exports = Materia;