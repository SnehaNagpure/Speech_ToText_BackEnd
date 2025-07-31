 const express=require("express");
 const router=express.Router();
 const multer = require('multer');
 const {uploadAudio,getAudios}=require("../controllers/audioController");
 const {protect}=require("../middleware/authMiddleware");
 const path = require('path');
 

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post('/upload', protect, upload.single('audio'), uploadAudio);
router.get('/', protect, getAudios);
//router.get('/user/:userId', protect,getAudiosByUser);

module.exports = router;