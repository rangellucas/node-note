var express = require('express');
var router = express.Router();
var User = require('../lib/User');

router.get('/', function(req, res, next){
	
	User.find(function(err, person){
		console.log(person);
	});
	
	res.render('users');
});

router.post('/register', function(req, res, next){
	
	var username = req.body.username;
	var password = req.body.password;

	var newUser = new User();
	newUser.username = username;
	newUser.password = password;
	newUser.save(function(error, savedUser){

		if(error){

			res.render("users", {title: 'NodeNote', regError: 'User already exists.'});

		}else{
			
			req.session.user = savedUser;
			res.redirect("/notes");	

		}

	});

});

router.post('/login', function(req, res, next){
	
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({'username': username}, function(err, person){
		
		if(!person){

			console.log(err);
			res.render("welcome", {title: 'NodeNote', logError: 'Invalid login.'});

		}else{

			person.comparePassword(password, function(err, isMatch){

				if(isMatch && isMatch == true){
					req.session.user = person;
					res.redirect('../notes');
				}else{
					res.redirect('users');
				}

			});

		}

	});

});

router.get('/logoff', function(req, res, next) {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;