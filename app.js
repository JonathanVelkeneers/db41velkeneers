var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const connectionString = process.env.MONGO_CON;
let mongoose = require('mongoose');
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
let db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function () {
    console.log("Connection to DB succeeded")
});
let Costume = require("./models/costume");

// We can seed the collection if needed on server start
async function recreateDB() {
    // Delete everything
    await Costume.deleteMany();
    let instance1 = new Costume({costume_type: "ghost", size: 'large', cost: 25.4});
    let instance2 = new Costume({costume_type: "red astronaut", size: 'small', cost: 69});
    let instance3 = new Costume({costume_type: "spongebob", size: 'medium', cost: 100});
    instance1.save(function (err) {
        if (err) return console.error(err);
        console.log("First object saved")
    });
    instance2.save(function (err) {
        if (err) return console.error(err);
        console.log("Second object saved")
    });
    instance3.save(function (err) {
        if (err) return console.error(err);
        console.log("Third object saved")
    });
}
let reseed = true;
if (reseed) {
    recreateDB();
}


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let tetrisBlocksRouter = require('./routes/tetrisBlocks');
let addModsRouter = require('./routes/addMods');
let selectorRouter = require('./routes/selector');
let resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tetris_blocks', tetrisBlocksRouter);
app.use('/add_mods', addModsRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
