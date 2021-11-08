var express = require('express');
var router = express.Router();
// Require controller modules.
const apiController = require('../controllers/api');
const tetrisBlockController = require('../controllers/tetrisBlock');

/// API ROUTE ///
// GET resources base.
router.get('/', apiController.api);
/// tetrisBlock ROUTES ///
// POST request for creating a tetrisBlock.
router.post('/tetris_blocks', tetrisBlockController.tetrisBlock_create_post);
// DELETE request to delete tetrisBlock.
router.delete('/tetris_blocks/:id', tetrisBlockController.tetrisBlock_delete);
// PUT request to update tetrisBlock.
router.put('/tetris_blocks/:id', tetrisBlockController.tetrisBlock_update_put);
// GET request for one tetrisBlock.
router.get('/tetris_blocks/:id', tetrisBlockController.tetrisBlock_detail);
// GET request for list of all tetrisBlock items.
router.get('/tetris_blocks', tetrisBlockController.tetrisBlock_list);

module.exports = router;
