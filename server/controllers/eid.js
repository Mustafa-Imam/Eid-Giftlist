var express = require('express');
var router = express.Router();
const eid = require('../models/eid');

// Get router for Read Operation
module.exports.ReadgiftData = async (req, res, next) => {
    try {
        const eidgiftlist = await eid.find(); // Corrected variable name to eidgiftlist
        res.render("eid/giftlist", {
            title: "Eid Giftlist",
            eidgiftlist: eidgiftlist
        });
    } catch (err) {
        console.error(err);
        res.render("eid/giftlist", {
            error: "Server Error"
        });
    }
};

// Get router for Create Operation --> Display the Add Gift page
module.exports.DisplayAddgift = (req, res, next) => {
    res.render('eid/add', {
        title: 'Add Gift'
    });
};

// Post router for Create Operation --> Process the Add Gift page
module.exports.Addgift = async (req, res, next) => {
    try {
        let newgift = new eid({ // Corrected to new eid
            "Item": req.body.Item,
            "Amount": req.body.Amount,
            "Price": req.body.Price,
        });
        await eid.create(newgift); // Corrected to eid.create
        res.redirect('/eidgiftlist'); // Corrected redirect to root
    } catch (err) {
        console.error(err);
        res.render("eid/giftlist", {
            error: "Server Error"
        });
    }
};

// Get router for Edit/Update Operation --> Display the edit gift page
module.exports.DisplayEditgift = async (req, res, next) => {
    try {
        const id = req.params.id;
        const gifttoEdit = await eid.findById(id); // Corrected to eid.findById
        res.render('eid/edit', {
            title: 'Edit Gift',
            gift: gifttoEdit // Ensure the EJS file uses 'gift' as the variable
        });
    } catch (err) {
        console.error(err);
        res.render("eid/giftlist", {
            error: "Server Error"
        });
    }
};

// Post router for Edit/Update Operation --> Process the edit gift page
module.exports.Editgift = async (req, res, next) => {
    const id = req.params.id;
    let updatedGift = {
        "Item": req.body.Item,
        "Amount": req.body.Amount,
        "Price": req.body.Price,
    };

    try {
        await eid.findByIdAndUpdate(id, updatedGift); // Corrected to eid.findByIdAndUpdate
        res.redirect('/eidgiftlist'); // Corrected redirect to root
    } catch (err) {
        console.error(err);
        res.status(500).render("eid/edit", {
            title: 'Edit Gift',
            gift: {...req.body, _id: id},
            error: "Error updating the gift: " + err.message
        });
    }
};

// Get router for Delete Operation
module.exports.Deletegift = async (req, res, next) => {
    try {
        const id = req.params.id;
        await eid.findByIdAndDelete(id); // Corrected to eid.findByIdAndDelete
        res.redirect("/eidgiftlist"); // Corrected redirect to root
    } catch (err) {
        console.error(err);
        res.render("eid/giftlist", {
            error: "Server Error"
        });
    }
};

// Assigning the individual routes to the router
router.get('/', module.exports.ReadgiftData);
router.get('/add', module.exports.Displaygift);
router.post('/add', module.exports.Addgift);
router.get('/edit/:id', module.exports.DisplayEditgift);
router.post('/edit/:id', module.exports.Editgift);
router.get('/delete/:id', module.exports.Deletegift);

module.exports.router = router;

