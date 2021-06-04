const dbService = require('../services/dbService')

exports.getAllFormations = async (req, res) => {
  dbService.getAllFormations((err, rows) => {
    // Fait une reponse en html en "render"le template
    res.render('all-formations.hbs', { formations : rows } )
  });
}

// NRO-example : un petit example avec les deux types de paramêtres :
//   req.params.formationId => pointe vers une composante de l'url (le :formationId)
//   req.query.id => pointe vers le parametre plus classique ?id=
exports.getFormation = async (req, res) => {
  dbService.getFormation(Number(req.params.formationId), (err, row) => {
    // Fait une reponse en JSON
    res.json({formation : row, queryParams : req.query.id })
  });
}
