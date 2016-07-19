var express = require('express');
var router = express.Router();
var Note = require('../lib/Note');

/* GET users listing. */
router.get('/', function(req, res, next) {

	if(!req.session.user){

		res.redirect("/");

	}else{

		Note.find({'user': req.session.user}, function(err, data){
			
			res.render("notes", {
				title: 'Notes',
				titleForm: "New", 
				items: data, 				
				action: "notes/insert"
			});

		}); 

	}
	
});

router.post('/insert', function(req, res, next) {

	var item = {
		titulo: req.body.titulo,
		texto: req.body.texto,	
		user: req.session.user,
	};

	var newNote = new Note(); 
	newNote.titulo = item.titulo;
	newNote.texto = item.texto;
	newNote.user = item.user;
	newNote.save(function(error, saveNote){

		if(error){
		
			console.log(error);
		
		}

		res.redirect("/notes");
	});
	
});

router.post('/update', function(req, res, next) {
  	
  	var id = req.body.idUpdate;
	Note.findById(id, function(error, doc){

		if(error){

			console.error('Error data...');

		}

		doc.titulo = req.body.titulo;
		doc.texto = req.body.texto;
		doc.save();

	});

	res.redirect("/notes");
	 
});

router.get("/delete/:id",function(req, res, next){

	var id = req.params.id; 

	Note.findByIdAndRemove(id).exec();

	res.redirect("/notes");

});

router.get('/edit/:id',function(req, res, next){

	var id = req.params.id;
	var resultArray = [];

	Note.find({'user': req.session.user}, function(error, data){
		if (error) { 
			throw err; 
		}else{
			resultArray = data;
		}
		
	}); 

	Note.find({'_id': id, 'user': req.session.user}, function(error, data){

		if(error){

			res.redirect("../../notes");		

		} else {

			res.render("notes",{
				title: 'Notes - ' + data[0].titulo,
				titleForm: "Edit" ,
				action: "notes/update", 
				itemId: data[0]._id, 
				itemTitulo: data[0].titulo,
				itemTexto: data[0].texto,
				items: resultArray, 
				btnCancel: true, 
				btnDelete: true
			});	
			
		}
	});
	
});

module.exports = router;