const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const stuffCtrl = require('../controllers/stuff');

//Create Read Upudate Delete (CRUD)
  
router.post('/', auth, stuffCtrl.createThing);
router.put('/:id', auth, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.get('/', auth, stuffCtrl.getAllThing);


module.exports = router;