const {model, Schema} = require('mongoose')
const UploadSiteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    siteName: {
        type: String,

    },
    siteStaticFolder: {
        type: String,
    }
}, {timestamps: true})
const UploadSite = model('UploadSite', UploadSiteSchema)
module.exports = UploadSite;