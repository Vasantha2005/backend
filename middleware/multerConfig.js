const multer = require("multer");
const path = require("path");

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Save to uploads folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);  // Get file extension
    cb(null, Date.now() + ext);  // Create a unique filename
  },
});

// Create multer instance with configuration
const upload = multer({ storage: storage });

module.exports = upload;
