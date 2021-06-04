const dbService = require('../services/dbService')

exports.getAllFormations = async (req, res) => {
  dbService.getAllFormations((err, rows) => {
    res.render('all-formations.hbs', { formations : rows } )
  });
  
}

// NRO-example : un petit example avec les deux types de paramêtres :
//   req.params.formationId => pointe vers une composante de l'url (le :formationId)
//   req.query.id => pointe vers le paramêtre plus classique ?id=  (pas dans l'url donc)
exports.getFormation = async (req, res) => {
  dbService.getFormation(Number(req.params.formationId), (err, row) => {
    res.json({formation : row, queryParams : req.query.id })
  });
}

//Exo1
exports.bonjour = (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'}); 
  res.end(`Bonjour ${req.query.nom} !`);
}
//Exo2
exports.ascenseur = (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'}); 
  res.end(`Bienvenue au ${req.params.etageId} etage !`);
}
