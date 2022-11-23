const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
//multer après auth
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

//Create Read Upudate Delete (CRUD)
  
router.post('/', auth, multer, stuffCtrl.createThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.get('/', auth, stuffCtrl.getAllThing);


module.exports = router;