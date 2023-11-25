var express = require('express');
var router = express.Router();
const carController = require('../controllers/cars');

// Get router for Read Operation
router.get('/', carController.ReadcarData);

// Get router for Create Operation --> Display the add car page
router.get('/add', carController.DisplayAddcar);

// Post router for Create Operation --> Process the add car page
router.post('/add', carController.Addcar);

// Get router for Edit/Update Operation --> Display the edit car page
router.get('/edit/:id', carController.DisplayEditcar);

// Post router for Edit/Update Operation --> Process the edit car page
router.post('/edit/:id', carController.Editcar);

// Get router for Delete Operation
router.get('/delete/:id', carController.Deletecar);

module.exports = router;
