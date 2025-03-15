const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userFolder = `usersDossiers/${req.user.id}`;
        
        fs.exists(userFolder, (exists) => {
            if (!exists) {
                fs.mkdir(userFolder, { recursive: true }, (err) => {
                    if (err) {
                        return cb(err, false);
                    }
                    cb(null, userFolder);
                });
            } else {
                cb(null, userFolder);
            }
        });
    },
    filename: (req, file, cb) => {
        // Nom du fichier : id de l'utilisateur + timestamp + extension du fichier
        cb(null, `${req.user.id}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Format de fichier non supporté"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
