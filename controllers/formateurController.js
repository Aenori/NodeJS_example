const dbService = require('../services/dbService')

exports.getAllFormateurs = async (req, res) => {
  dbService.getAllFormateurs((err, rows) => {
    res.render('all-formateurs.hbs', { formateurs : rows } )
  });
  
}

exports.getFormateur = async (req, res) => {
  dbService.getFormateur(Number(req.params.formateurId), (err, row) => {
    res.json({formateur : row, queryParams : req.query.id })
  });
}

exports.getFormationByFormateur = async (req, res) => {
  dbService.getFormationByFormateur(Number(req.params.formateurId), (err, row) => {
    res.json({formation : row}) //row est la réponse associée à la requête dsService
  });
}
