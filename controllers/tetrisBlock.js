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
exports.tetrisBlock_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: TetrisBlock delete DELETE ' + req.params.id);
};
// Handle tetrisBlock update form on PUT.
exports.tetrisBlock_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: TetrisBlock update PUT' + req.params.id);
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
