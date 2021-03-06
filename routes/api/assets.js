const express = require('express');
const router = express.Router();
const assetCtrl = require('../../controllers/asset/asset');

// POST /api/users
router.post('/create', assetCtrl.create);
// POST /api/users/login
router.post('/edit', assetCtrl.edit)
router.post('/edit2',assetCtrl.edit2)
router.post('/list',assetCtrl.listAllAssets)
router.get('/getBydate',assetCtrl.getAssetByDate)
router.post('/getAuthor',assetCtrl.getAuthor)
router.post('/delete/mine',assetCtrl.deleteMyAssets)
router.post('/list/mine',assetCtrl.listMyAssets)
router.get('/listone/:asset',assetCtrl.displayAsset)

router.get('/:id',assetCtrl.list)

module.exports = router;