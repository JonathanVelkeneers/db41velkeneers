let express = require('express');
let router = express.Router();
const tetrisBlockController = require('../controllers/tetrisBlock');

/* GET home page. */
router.get('/', tetrisBlockController.tetrisBlock_view_all_Page);
router.get('/detail', tetrisBlockController.tetrisBlock_view_one_Page);
router.get('/create', tetrisBlockController.tetrisBlock_create_Page);

module.exports = router;
