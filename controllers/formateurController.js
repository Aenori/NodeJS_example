const dbService = require('../services/dbService')

exports.getAllFormateurs = async (req, res) => {
  dbService.getAllFormateurs((err, rows) => {
    res.render('all-formateurs.hbs', { formateurs : rows } )
  });
  
}

exports.getFormateur = async (req, res) => {
  dbService.getFormation(Number(req.params.formateurId), (err, row) => {
    res.json({formateur : row, queryParams : req.query.id })
  });
}

