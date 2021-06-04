const dbService = require('../services/dbService')

exports.getAllFormations = async (req, res) => {
  dbService.getAllFormations((err, rows) => {
    res.render('all-formations.hbs', { formations : rows } )
  });
  
}

exports.getFormation = async (req, res) => {
  dbService.getFormation(Number(req.params.formationId), (err, row) => {
    res.json({formation : row})
  });
}
