const {POST_NEW_SITE, SITE_DUPLICATE, GET_SITE} = require("../controllers/uploadSite");
const {uploadZipSingle} = require("../utils/upload");


const router = require('express').Router();


router.post('/',uploadZipSingle('file'), POST_NEW_SITE);
router.post('/site', SITE_DUPLICATE);
router.get('/getSite', GET_SITE);


module.exports = router;