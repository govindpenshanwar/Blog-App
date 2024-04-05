// const multer = require('multer');


// const storage = multer.diskStorage({
//     destination: function (req, res, cb) {
//         cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({ storage: storage });

// module.exports = upload;
const multer = require('multer');
const storage = multer.memoryStorage(); // Using memory storage for multer
const upload = multer({ storage: storage }).single('picture'); // Using single file upload
module.exports = upload;
