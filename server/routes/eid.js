var express = require('express');
var router = express.Router();
const giftController = require('../controllers/eid');

// Get router for Read Operation
router.get('/', giftController.ReadgiftData);

// Get router for Create Operation --> Display the add gift page
router.get('/add', giftController.DisplayAddgift);

// Post router for Create Operation --> Process the add gift page
router.post('/add', giftController.Addgift);

// Get router for Edit/Update Operation --> Display the edit gift page
router.get('/edit/:id', giftController.DisplayEditgift);

// Post router for Edit/Update Operation --> Process the edit gift page
router.post('/edit/:id', giftController.Editgift);

// Get router for Delete Operation
router.get('/delete/:id', giftController.Deletegift);

module.exports = router;
