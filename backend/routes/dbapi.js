
var express = require('express'),
	router = express.Router(),
	DonorModel = require('../models/donorinfo');
	CharityModel = require('../models/charityinfo');
	
router.get('/',function(req, res){
	var userId = req.user.aud;

	DonorModel.find({userId: req.user.aud},'',function(err,donor){
		if (err) console.error(err);
	res.send(donor);
	})

//----Complicated doner model to access all ajax logic
	// DonorModel.find({userId: req.user.aud},'',function(err,donor){
	// 	if (err) console.error('Error getting', err);
	// 	if (donor){
	// 		res.send('donor_homepage.html');
	// 	} else {
	// 		CharityModel.find({userId: req.user.aud },'',function(err,char){
	// 			if(err) console.error(err);

	// 			if(char){
	// 				res.send('charity_home_logged_in.html');
	// 			} else {
	// 				res.send('newaccount.html');
	// 			}
	// 		});
	// 	}

	// });
});

router.post('/',function(req, res){
	var donorInfo = {
		userId: req.user.aud,
		fullName: req.body.fullName,
		email: req.body.email,
		address: req.body.address,
		state: req.body.state,
		zip: req.body.zip,
		importance: req.body.importance,
		cause: req.body.cause
	};

	var newDonor = new DonorModel(donorInfo);

	newDonor.save(function(err,success){
		if (err) console.log(err);
		res.json(success);
	});
});

router.put('/',function(req, res){
	var id = req.body.id;
	var updateInfo = {
		userId: req.body.userId,
		fullName: req.body.fullName,
		email: req.body.email,
		address: req.body.address,
		state: req.body.state,
		zip: req.body.zip,
		importance: req.body.importance,
		cause: req.body.cause
	};
	DonorModel.findByIdAndUpdate(id, updateInfo, function(err,post){
		if (err) console.error(err);
		res.send('SUCCESS!');
	});


});

router.delete('/',function(req, res){
	var id = req.body.id;

	DonorModel.findByIdAndRemove(id,function(err,post){
		if (err) console.error(err);
		res.send('SUCCESS!');
	});


});

module.exports = router;
