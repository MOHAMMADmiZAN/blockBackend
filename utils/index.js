const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");

// create zip file unzip function
function unzip(file, pathname) {
    const zip = new AdmZip(file);
    const zipEntries = zip.getEntries();
    zipEntries.forEach(function (zipEntry) {
        try {
            if (zipEntry.isDirectory) {
            } else {
                zip.extractEntryTo(zipEntry, pathname, true, true);

            }
        } catch (e) {
            console.log(e);
        }


    });

    return zipEntries[0].entryName;
}

function ensureExists(path, mask, cb) {
    if (typeof mask == 'function') { // Allow the `mask` parameter to be optional
        cb = mask;
        mask = 0o744;
    }
    fs.mkdir(path, mask, function (err) {
        if (err) {
            if (err.code === 'EEXIST') cb(null); // Ignore the error if the folder already exists
            else cb(err); // Something else went wrong
        } else cb(null); // Successfully created folder
    });
}

function createDirectories(pathname) {
    const __dirname = path.resolve();
    pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
    fs.mkdir(path.resolve(__dirname, pathname), {recursive: true}, e => {
        if (e) {
            console.error(e);
        } else {
            console.log('Success');
        }
    });
    return pathname;
}

// delete file function
function deleteFile(file) {
    fs.unlink(file, (err) => {
        if (err) throw err;
        console.log('successfully deleted ' + file);
    });
    return true;
}

// move file function
function moveFile(oldPath, newPath) {
    fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        console.log('successfully moved ' + oldPath + ' to ' + newPath);
    });
}

// copy file function
function copyFile(oldPath, newPath) {
    fs.copyFile(oldPath, newPath, (err) => {
        if (err) throw err;
        console.log('successfully copied ' + oldPath + ' to ' + newPath);
    });
}


module.exports = {
    unzip,
    ensureExists,
    createDirectories
    , deleteFile
    , moveFile
    , copyFile
}