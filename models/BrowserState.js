const {model, Schema} = require('mongoose')
const BrowserStateSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    uniqueWebId: {
        type: String,
    },
    hashFromWeb: {
        type: String,
    },
    registeredWeb: {
        type: {},
    },
    currentUrl: {
        type: String,
    },
    previousUrl: {
        type: String,
    },
    nextUrl: {
        type: String,
    },
    searchHistory: {
        type: [String],
    }


}, {timestamps: true})
const BrowserState = model('BrowserState', BrowserStateSchema)
module.exports = BrowserState;