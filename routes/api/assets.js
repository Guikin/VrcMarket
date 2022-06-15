const express = require('express');
const router = express.Router();
const assetCtrl = require('../../controllers/asset/asset');

// POST /api/users
router.post('/create', assetCtrl.create);
// POST /api/users/login
router.post('/edit', assetCtrl.edit);

router.get('/:id',assetCtrl.list)

module.exports = router;