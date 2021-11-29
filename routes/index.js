let express = require('express');
let passport = require('passport');
let router = express.Router();
let Account = require('../models/account');


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Tetris Block App', user: req.user});
});

router.get('/register', function (req, res) {
    res.render('register', {title: 'Tetris Block App Registration'});
});

router.post('/register', function (req, res) {
    Account.findOne({username: req.body.username},
        function (err, user) {
            if (err) {
                return res.render('register', {
                    title: 'Registration',
                    message: 'Registration error', account: req.body.username
                })
            }
            if (user == {}) {
                return res.render('register', {
                    title: 'Registration',
                    message: 'Existing User', account: req.body.username
                })
            }
            let newAccount = new Account({username: req.body.username});
            Account.register(newAccount, req.body.password, function (err, user) {
                if (err) {
                    return res.render('register', {
                        title: 'Registration',
                        message: 'access error', account: req.body.username
                    })
                }
                if (!user) {
                    return res.render('register', {
                        title: 'Registration',
                        message: 'access error', account: req.body.username
                    })
                }
                console.log('Sucess, redirect');
                res.redirect('/');
            })
        })
})

router.get('/login', function (req, res) {
    res.render('login', {title: 'Tetris Block App Login', user: req.user});
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), function (req, res) {
    let prevSession = req.session;
    req.session.regenerate((err) => {
        Object.assign(req.session, prevSession);
        if (req.session.returnTo)
            res.redirect(req.session.returnTo);
        else
            res.redirect('/');
    });
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function (req, res) {
    res.status(200).send("pong!");
});

module.exports = router;