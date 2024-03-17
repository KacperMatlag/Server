const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = uuidv4();
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    },

});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports = { upload }