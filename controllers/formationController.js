const dbService = require('../services/dbService')

exports.getAllFormations = async (req, res) => {
  dbService.getAllFormations((err, rows) => {
    res.render('all-formations.hbs', { formations : rows } )
  });
}

exports.getAllFormateurs = async (req, res) => {
  dbService.getAllFormateurs((err, rows) => {
    res.render('all-formateurs.hbs', { formateurs : rows } )
  });
}

// NRO-example : un petit example avec les deux types de paramêtres :
//   req.params.formationId => pointe vers une composante de l'url (le :formationId)
//   req.query.id => pointe vers le paramêtre plus classique ?id=
exports.getFormation = async (req, res) => {
  dbService.getFormation(Number(req.params.formationId), (err, row) => {
    res.json({formation : row, queryParams : req.query.id })
  });
}
