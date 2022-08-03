const BrowserState = require('../models/BrowserState')

const newBrowserState = async (userId, uniqueWebId, hashFromWeb, registeredWeb, currentUrl, previousUrl, nextUrl, searchHistory) => {
    let browserState = new BrowserState({
        user: userId,
        uniqueWebId,
        hashFromWeb,
        registeredWeb,
        currentUrl,
        previousUrl,
        nextUrl,
        searchHistory
    })
    await browserState.save()
    return browserState
}

const updateBrowserState = async (id, data) => {
    return BrowserState.findByIdAndUpdate(id, {...data}, {new: true})
}
const findBrowserState = async (key, value) => {
    if (key === '_id') {
        return BrowserState.findById(value)
    }
    return BrowserState.findOne({[key]: value})
}
const findBrowserStates = async () => {
    return BrowserState.find()
}

const findBrowserStatesByUser = async (userId) => {
    return BrowserState.find({user: userId})
}
const findBrowserStatesByUserAndWeb = async (userId, uniqueWebId) => {
    return BrowserState.find({user: userId, uniqueWebId})
}
const deleteBrowserState = async (id) => {
    return BrowserState.findByIdAndDelete(id)
}

module.exports = {
    newBrowserState,
    updateBrowserState,
    findBrowserState,
    findBrowserStates,
    findBrowserStatesByUser,
    findBrowserStatesByUserAndWeb,
    deleteBrowserState
}