// Gender.route.js

const express = require('express');
const genderRoutes = express.Router();

// Require Gender model in our routes module
let Gender = require('./gender.model');

// Defined store route
genderRoutes.route('/add').post(function (req, res) {
  let gender = new Gender(req.body);
  gender.save()
    .then(gender => {
      res.status(200).json({'gender': 'gender in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save gender to database");
    });
});

// Defined get data(index or listing) route
genderRoutes.route('/').get(function (req, res) {
    Gender.find(function(err, genders){
    if(err){
      console.log(err);
    }
    else {
      res.json(genders);
    }
  });
});

// Defined edit route
genderRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Gender.findById(id, function (err, gender){
      res.json(gender);
  });
});

//  Defined update route
genderRoutes.route('/update/:id').post(function (req, res) {
    Gender.findById(req.params.id, function(err, gender) {
    if (!gender)
      res.status(404).send("data is not found");
    else {
        gender.name = req.body.name;

        gender.save().then(gender => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
genderRoutes.route('/delete/:id').get(function (req, res) {
    Gender.findByIdAndRemove({_id: req.params.id}, function(err, gender){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = genderRoutes;