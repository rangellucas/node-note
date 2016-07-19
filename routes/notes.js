var express = require('express');
var router = express.Router();
var Note = require('../lib/Note');

/* GET users listing. */
router.get('/', function(req, res, next) {

	//var resultArray = [];

	Note.find(function(err, data){
		console.log(data);
	}); 

 	/*var resultArray = [];
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
				titleForm: "New", 
				items: resultArray, 				
				action: "notes/insert"
			});		

		});
	});*/

});

router.post('/insert', function(req, res, next) {

	var item = {
		titulo: req.body.titulo,
		texto: req.body.texto,	
	};

	var newNote = new Note();
	newNote.titulo = item.titulo;
	newNote.texto = item.texto;
	newNote.user = req.session.user;
	newNote.save(function(error, saveNote){
		if(error){
			console.log(error);
			return res.status(500).send();
		}else{
			console.log('Note registred');
			return res.status(200).send();
		}

		//res.end();
	});
	
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
				titleForm: "Edit" ,
				action: "notes/update", 
				item: docSelected, 
				items: resultArray, 
				btnCancel: true, 
				btnDelete: true
			});		

		});
		
	});
	
});

module.exports = router;