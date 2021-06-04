const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/formation.sqlite3'); 

exports.getAllFormations = (callback) => { 
	db.all("SELECT id, formateurId, date, sujet FROM formations", callback);
};

exports.getFormation = (formationId, callback) => {
	db.get(
		"SELECT id, formateurId, date, sujet FROM formations WHERE id = ?", 
		[formationId], 
		callback
	)
};
