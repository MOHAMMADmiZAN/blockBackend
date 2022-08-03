const errorHandler = require("../utils/error");
const UploadSite = require("../models/UploadSite");
const BrowserState = require("../models/BrowserState");


const createNewSite = async ({user, siteName, siteStaticFolder}) => {

    try {
        return await UploadSite.create({
            user,
            siteName,
            siteStaticFolder
        });
    } catch (e) {
        throw errorHandler(e.message, e.status);
    }
}

// get sites by userId
const findSitesById = async (key, value) => {
    if (key === '_id') {
        return UploadSite.findById(value)
    }
    return UploadSite.findOne({[key]: value})
}
// find all sites by userId
const findSitesByUser = async (userId) => {
    return UploadSite.find({user: userId})
}
// find one site by userEmail
const findSiteByUserEmail = async (userEmail) => {
    return UploadSite.findOne({user: userEmail})
}
// find all site by userEmail
const findSitesByUserEmail = async (userEmail) => {
    return UploadSite.find({user: userEmail})
}
// delete site by id
const deleteSite = async (id) => {
    return UploadSite.findByIdAndDelete(id)
}
// delete all sites by userId
const deleteSitesByUser = async (userId) => {
    return UploadSite.deleteMany({user: userId})
}
// update site by id
const updateSite = async (id, data) => {
    return UploadSite.findByIdAndUpdate(id, {...data}, {new: true})
}
// update site by userId
const updateSiteByUser = async (userId, data) => {
    return UploadSite.findOneAndUpdate({user: userId}, {...data}, {new: true})
}
// update site by userEmail
const updateSiteByUserEmail = async (userEmail, data) => {
    return UploadSite.findOneAndUpdate({user: userEmail}, {...data}, {new: true})
}
// update site by userId and siteName
const updateSiteByUserAndSiteName = async (userId, siteName, data) => {
    return UploadSite.findOneAndUpdate({user: userId, siteName}, {...data}, {new: true})
}

//find duplicate site
const findDuplicateSite = async (siteName) => {
    return UploadSite.findOne({siteName})
}

module.exports = {
    createNewSite,
    findSitesById,
    findSitesByUser,
    findSiteByUserEmail,
    findSitesByUserEmail,
    deleteSite,
    deleteSitesByUser,
    updateSite,
    updateSiteByUser,
    updateSiteByUserEmail,
    updateSiteByUserAndSiteName,
    findDuplicateSite
}


