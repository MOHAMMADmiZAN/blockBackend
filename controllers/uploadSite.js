const {findDuplicateSite, createNewSite, findSitesByUser} = require("../services/uploadSite");
const {unzip, deleteFile} = require("../utils");


const POST_NEW_SITE = async (req, res, next) => {
    try {
        const {siteName} = req.body;
        const siteDuplicate = await findDuplicateSite(siteName);
        if (siteDuplicate) {
            return res.status(409).json({
                message: "This address is used, kindly choose another site name", siteDuplicate: siteDuplicate
            });
        }
        let siteStaticFolder = unzip(req.file.path, `public/upload/sites/${req.body.siteName}`);
        siteStaticFolder = `/upload/sites/${req.body.siteName}/${siteStaticFolder}`;
        let userId = req.user.id;

        const deleteMsg = deleteFile(req.file.path);
        console.log(deleteMsg);


        const site = await createNewSite({user: userId, siteName, siteStaticFolder});
        return res.status(201).json({
            message: "Site created successfully", siteStaticFolder: site.siteStaticFolder
        });
    } catch (e) {
        next(e);
    }
}


const SITE_DUPLICATE = async (req, res, next) => {
    try {
        const {siteName} = req.body;
        const site = await findDuplicateSite(siteName);
        if (!site) {
            return res.status(200).json({
                message: "This address is available!", site
            });
        }
        return res.status(404).json({
            message: "This address is used, kindly choose another site name", site
        })


    } catch (e) {
        next(e);
    }
}

const GET_SITE = async (req, res, next) => {
    try {
        const Sites = await findSitesByUser(req.user.id);
        console.log(Sites);
        return res.status(200).json({
            message: "Sites found", Sites
        });

    } catch (e) {
        next(e);
    }
}

module.exports = {
    POST_NEW_SITE
    , SITE_DUPLICATE
    , GET_SITE
};