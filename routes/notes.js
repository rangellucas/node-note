var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = "mongodb://localhost:27017/test";

/* GET users listing. */
router.get('/', function(req, res, next) {

 	var resultArray = [];
  	mongo.connect(url, function(error, db){
	
		assert.equal(null, error);	
		var cursor = db.collection("notes").find();		
		cursor.forEach(function(doc, error){		

			assert.equal(null, error);
			resultArray.push(doc);		

		}, function(){		

			db.close();
			res.render("notes", {
				title: 'Notes',
				items: resultArray, 
				titleForm: "Novo" , 
				action: "notes/insert"
			});		

		});
	});

});

router.post('/insert', function(req, res, next) {
  	
  	var item = {
		titulo: req.body.titulo,
		texto: req.body.texto,	
	};

	if(item.titulo){
		mongo.connect(url, function(error, db){

			assert.equal(null, error);		
			db.collection('notes').insertOne(item, function(error, result){

				assert.equal(null, error);
				db.close();
				res.redirect("/notes");

			});

		});
	}
	
});

router.post('/update', function(req, res, next) {
  	
  	var item = {
		titulo: req.body.titulo,
		texto: req.body.texto,	
	};

	var id = req.body.idUpdate;

	mongo.connect(url, function(error, db){

		assert.equal(null, error);		
		db.collection('notes').updateOne({"_id": objectId(id)},{$set: item}, function(error, result){
			
			assert.equal(null, error);
			db.close();
			res.redirect("/notes");

		});

	});
	
});

router.get("/delete/:id",function(req, res, next){

	var id = req.params.id;

	mongo.connect(url, function(error, db){

		assert.equal(null, error);		
		db.collection('notes').deleteOne({"_id": objectId(id)}, function(error, result){
			
			assert.equal(null, error);
			db.close();
			res.redirect("/notes");

		});

	});

});

router.get('/edit/:id',function(req, res, next){

	var id = req.params.id;
	var resultArray = [];

  	mongo.connect(url, function(error, db){
	
		assert.equal(null, error);	
		var notesList = db.collection("notes").find();		
		notesList.forEach(function(docList, error){		
			assert.equal(null, error);
			resultArray.push(docList);		
		});
			
		var noteSelected = db.collection("notes").find({"_id": objectId(id)});		
		noteSelected.forEach(function(docSelected, error2){

			db.close();
			res.render("notes",{
				title: 'Notes - ' + docSelected.titulo,
				item: docSelected, 
				items: resultArray, 
				titleForm: "Editar" , 
				action: "notes/update", 
				btnCancelar: true, 
				btnExcluir: true});		

		});
		
	});
	
});

module.exports = router;