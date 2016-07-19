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
	
	//console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;

	var newUser = new User();
	newUser.username = username;
	newUser.password = password;
	newUser.save(function(error, saveUser){
		if(error){
			console.log(error);
			return res.status(500).send();
		}else{
			console.log('User registred');
			return res.status(200).send();
		}

		//res.end();
	});

	res.redirect("/notes");

});

router.post('/register', function(req, res, next){
	
	//console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;

	var newUser = new User();
	newUser.username = username;
	newUser.password = password;
	newUser.save(function(error, saveUser){
		if(error){
			console.log(error);
			return res.status(500).send();
		}else{
			console.log('User registred');
			return res.status(200).send();
		}

		//res.end();
	});

	res.redirect("/notes");

});

module.exports = router;