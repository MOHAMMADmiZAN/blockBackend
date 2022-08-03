const multer = require('multer')
const path = require('path')
const {createDirectories} = require("./index");
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, createDirectories('public/upload/images'));
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
})

const storageZip = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, createDirectories('public/upload/Zip'))
    }
    ,
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|svg/ // allowed filetypes
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only!') // Error message
    }
}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    },
})

// check file type zip or rar
function checkFileTypeZip(file, cb) {
    const filetypes = /zip|rar/ // allowed filetypes
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Zip or Rar only!') // Error message
    }
}

const uploadZip = multer({
    storage: storageZip,
    fileFilter: function (req, file, cb) {
        checkFileTypeZip(file, cb)
    }
})
const uploadZipSingle = (name) => {
    return uploadZip.single(name)
}

const uploadSingle = (name) => {
    return upload.single(name)
}
const uploadMultiple = (name) => {
    return upload.array(name)
}


module.exports = {
    uploadSingle,
    uploadMultiple,
    uploadZipSingle,
}


