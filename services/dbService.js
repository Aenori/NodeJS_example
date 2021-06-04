const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/formation.sqlite3'); 

exports.getAllFormations = async (callback) => { 
	db.all("SELECT id, formateurId, date, sujet FROM formations", callback);
};

exports.getFormation = async (formationId, callback) => {
	db.get(
		"SELECT id, formateurId, date, sujet FROM formations WHERE id = ?", 
		[formationId], 
		callback
	)
};

exports.getAllFormateurs = async (callback) => { 
	db.all("SELECT id, nom FROM formateurs", callback);
};

exports.getFormateur = async (formateurId, callback) => {
	db.get(
		"SELECT id, nom FROM formateurs WHERE id = ?", 
		[formateurId], 
		callback
	)
};

exports.getFormationByFormateur = async (formateurId, callback) => {
	db.get(
		"SELECT id, formateurId, date, sujet FROM formations WHERE formateurId = ?", 
		[formateurId], 
		callback
	)
};