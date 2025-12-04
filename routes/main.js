// Create a new router
const express = require("express")
const router = express.Router()
const request = require('request')

const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('/users/login') // redirect to the login page
    } else { 
        next (); // move to the next middleware function
    } 
}


// Handle our routes
router.get('/',function(req, res, next){
    res.render('index.ejs')
});

router.get('/about',function(req, res, next){
    res.render('about.ejs')
});

router.get('/books/addbook', redirectLogin ,function(req, res, next){
    res.render('addbook.ejs')
});

router.get('/users/login',function(req, res, next){
    res.render('login.ejs')
});

router.get('/logout', redirectLogin, (req,res) => {
        req.session.destroy(err => {
        if (err) {
          return res.redirect('./')
        }
        res.send('you are now logged out. <a href='+'./'+'>Home</a>');
        })
    })

router.get('/weather', function(req, res, next) {
    let apiKey = 'd2eb4cd6810ce7b79f1768c554ec8088';

    // Read city from the query string (?city=London)
    let city = req.query.city;

    if (!city) {
        return res.render('weather.ejs', {
            weather: null,
            error: null
        });
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body) {
        if (err) {
            return next(err);
        }

        let weather = JSON.parse(body);

        // If API returns an error code (e.g. city not found)
        if (weather.cod != 200) {
            return res.render('weather.ejs', {
                weather: null,
                error: "Could not find weather for that city. Please try again."
            });
        }

        // Build a simple message
        let wmsg = `It is ${weather.main.temp} degrees in ${weather.name}. 
        The humidity now is: ${weather.main.humidity}%.`;

        res.render('weather.ejs', {
            weather: wmsg,
            error: null
        });
    });
});

module.exports = router