let express = require('express');
let router = express.Router();
const tetrisBlockController = require('../controllers/tetrisBlock');

const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
}


/* GET home page. */
router.get('/', tetrisBlockController.tetrisBlock_view_all_Page);
router.get('/detail', tetrisBlockController.tetrisBlock_view_one_Page);
router.get('/create', secured, tetrisBlockController.tetrisBlock_create_Page);
router.get('/update', secured, tetrisBlockController.tetrisBlock_update_Page);
router.get('/delete', secured, tetrisBlockController.tetrisBlock_delete_Page);

module.exports = router;
