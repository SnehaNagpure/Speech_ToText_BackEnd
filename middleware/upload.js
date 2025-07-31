const multer = require('multer'); // Handles file uploads (multipart/form-data)
const path = require('path');     // Used to work with file extensions

// 🗂️ Configure storage destination and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // All files will be saved in /uploads directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the original file extension (e.g. .mp3)
    const baseName = path.basename(file.originalname, ext); // Remove extension for cleaner filename
    const uniqueName = `${Date.now()}-${baseName}${ext}`; // Example: 1722062765630-audio.mp3
    cb(null, uniqueName); // Save file with timestamp prefix
  }
});

// Filter to allow only certain audio formats
const fileFilter = (req, file, cb) => {
const allowed = ['.mp3', '.wav', '.m4a', '.webm', '.ogg', '.flac', '.aac'];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowed.includes(ext)) {
    cb(null, true); //  Accept file
  } else {
    cb(new Error(`Unsupported file type: ${ext}`)); //  Reject file
  }
};

// Create multer instance with the defined storage and filter
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // Optional: limit size to 10MB
});

module.exports = upload;
