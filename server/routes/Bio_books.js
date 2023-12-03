var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let Book = require('../models/Bio_books');
let BookController = require('../controllers/Bio_books')
/* Get route for the Bio Books list */
// Read Operation
router.get('/', BookController.DislayBooklist);
/* Get route for Add Book page --> Create */
router.get('/add', BookController.AddBook); 
/* Post route for Add Book page --> Create */
router.post('/add', BookController.ProcessBook);
/* Get route for displaying the Edit Book page --> Update */
router.get('/edit/:id', BookController.EditBook);
/* Post route for processing the Edit Book page --> Update */
router.post('/edit/:id', BookController.ProcessEditBook);
/* Get to perform Delete Operation --> Delete Operation */
router.get('/delete/:id', BookController.DeleteBook);
 module.exports = router;