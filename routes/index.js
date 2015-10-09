var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var https = require('https');
var http = require('http');
var request = require('request');
//require('request-debug')(request);
    

//Require mongoose model
var Entry = require('../models/entry').Entry;

/* GET home page. */
router.get('/', function(req, res) {
    
    var consumer_key = encodeURIComponent('EnG7TzmuRGZi2UKH3RSH2zV1X');
    var consumer_secret = encodeURIComponent('lMHdJ4tWQntGZHQNtUTe94vOLeLq81GayymmTt6ZMOqzzQefUy');
    var key = consumer_key + ":" + consumer_secret;
    var encoded_key = new Buffer(key).toString('base64');

    var key_options = {
        url: "https://api.twitter.com/oauth2/token",
        method: "POST",
        body: "grant_type=client_credentials",
        headers: {
            'Authorization': "Basic " + encoded_key,
            'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"
        },
        json: true
    };

    request.post(key_options, function(key_error, key_response, key_body) {

        if (!key_error && key_response.statusCode == 200) {

            var bearer = new Buffer(key_body.access_token).toString('base64');

            twit_req = querystring.stringify({
                screen_name: 'e_cookie10',
                count: '3',
                trim_user: 'true',
            });

            twit_options = {
                url: "https://api.twitter.com/1.1/statuses/user_timeline.json?"
                    + twit_req,
                method: "GET",
                headers: {
                    'Authorization': "Bearer " + key_body.access_token 
                },
                json: true
            };

            request(twit_options, function(twit_err, twit_res, twit_data) {

                for (i = 0; i < twit_data.length; i++) {
                    console.log(twit_data[i].text);
                }

                //get latest blog entry
                Entry.findOne(function(err, blog_data) {
                    console.log('BLOG_DATA:');
                    console.log(blog_data);

                    res.render('index', {
                        title: 'home',
                        activeid: 'home',
                        latest: blog_data,
                        tweets: twit_data
                    });
                });

                /*
                res.render('index', {
                    title: 'home',
                    activeid: 'home',
                    latest: {},
                    tweets: twit_data
                });
                */
            });
        }
    });
});

/* GET about page. */
router.get('/about', function(req, res) {
    res.render('about', { title: 'About Me', activeId: 'about' });
});

/* GET projects page. */
router.get('/projects', function(req, res) {
    res.render('projects', { title: 'Projects', activeId: 'projects' });
});

/* GET projects page. */
router.get('/contact', function(req, res) {
    res.render('contact', { title: 'Contact', activeId: 'contact' });
});


module.exports = router;

//curl -u EnG7TzmuRGZi2UKH3RSH2zV1X:lMHdJ4tWQntGZHQNtUTe94vOLeLq81GayymmTt6ZMOqzzQefUy -X POST -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" https://api.twitter.com/oauth2/token?grant_type=client_credentials
