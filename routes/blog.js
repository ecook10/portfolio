var express = require('express');
var router = express.Router();

//Require mongoose model
var Entry = require('../models/entry').Entry;

/* GET main blog page */
router.get('/', function(req, res) {

    Entry.find(function(err, data) {

        res.render('blog', {
            title: 'Blog',
            activeId: 'blog',
            blogList: data
        });
    });
});


// GET new entry page
router.get('/newentry', function(req, res) {
    res.render('newentry', {title: "New Entry"});
});


// POST new entry to database
router.post('/addentry', function(req, res) {

    var today = new Date();
    var post = req.body.post;
    var headline = req.body.headline;
    var blurb = req.body.blurb;
    var tags = req.body.tags.split(" ");

    var data = {
        'post': post,
        'headline': headline,
        'blurb': blurb,
        'date': {
            'year': String(today.getFullYear()),
            'month': String(today.getMonth() + 1),
            'day': String(today.getDay()) },
        'tags': tags,
        'comments': []
    };
    var toAdd = new Entry(data);

    toAdd.save(function(err) {
        res.location("/blog");
        res.redirect("/blog");
    });
});

// GET complete post
router.get('/viewentry', function(req, res) {

    var id = req.query.id;

    Entry.findOne({_id: id}, function(err, data) {
        res.render('viewblog', {entry: data});
    });
});    

//DELETE post
router.delete('/deleteentry', function(req, res) {

    var id = req.body.id;
    Entry.remove({_id: id}, function(err) {
        res.status(200).send("Deletion successful!");
    });
});

    

module.exports = router;
