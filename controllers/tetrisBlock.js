const TetrisBlock = require('../models/tetrisBlock');

// List of all tetrisBlocks
exports.tetrisBlock_list = async function (req, res) {
    try {
        let tetrisBlocks = await TetrisBlock.find();
        res.send(tetrisBlocks);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific tetrisBlock.
exports.tetrisBlock_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        let result = await TetrisBlock.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle tetrisBlock create on POST.
exports.tetrisBlock_create_post = async function (req, res) {
    console.log(req.body)
    let tetrisBlock = new TetrisBlock();
    tetrisBlock.color = req.body.color;
    tetrisBlock.shape = req.body.shape;
    tetrisBlock.numberOfSquares = parseInt(req.body.numberOfSquares);

    try {
        let result = await tetrisBlock.save();
        res.send(result);
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// Handle tetrisBlock delete form on DELETE.
exports.tetrisBlock_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        let result = await TetrisBlock.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};
// Handle tetrisBlock update form on PUT.
exports.tetrisBlock_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await TetrisBlock.findById(req.params.id) // Do updates of properties
        if (req.body.color)
            toUpdate.color = req.body.color;
        if (req.body.shape)
            toUpdate.shape = req.body.shape;
        if (req.body.numberOfSquares)
            toUpdate.numberOfSquares = req.body.numberOfSquares;
        let result = await toUpdate.save();
        console.log("Success " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};

// VIEWS
// Handle a show all view
exports.tetrisBlock_view_all_Page = async function (req, res) {
    try {
        let tetrisBlocks = await TetrisBlock.find();
        res.render('tetrisBlocks', {title: 'TetrisBlock Search Results', results: tetrisBlocks});
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.tetrisBlock_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        let result = await TetrisBlock.findById(req.query.id)
        if (result) {
            res.render('tetrisBlockDetail', {title: 'Tetris Block Detail', toShow: result});
        } else {
            res.status(404)
            res.send(`{'error': 'Item not found'}`);
        }
    } catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.tetrisBlock_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('tetrisBlockCreate', {title: 'TetrisBlock Create'});
    } catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.tetrisBlock_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await TetrisBlock.findById(req.query.id)
        res.render('tetrisBlockUpdate', {title: 'TetrisBlock Update', toShow: result});
    } catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.tetrisBlock_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        let result = await TetrisBlock.findById(req.query.id)
        res.render('tetrisBlockDelete', {title: 'TetrisBlock Delete', toShow: result});
    } catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};