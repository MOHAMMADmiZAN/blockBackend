const {findBrowserState, updateBrowserState, newBrowserState, findBrowserStatesByUser, findBrowserStates} = require("../services/browserState");
const CryptoJS = require("crypto-js");


const POST_NEW_BROWSER_STATE = async (req, res, next) => {

    try {
        const {
            uniqueWebId, registeredWeb, currentUrl, previousUrl, nextUrl, searchHistory
        } = req.body;
        let date = new Date().toString();
        const hashFromWeb = CryptoJS.AES.encrypt(uniqueWebId, date).toString()
        const duplicateUniqueWebId = await findBrowserState('uniqueWebId', uniqueWebId);
        const duplicateHashFromWeb = await findBrowserState('hashFromWeb', hashFromWeb);
        const duplicateRegisteredWeb = await findBrowserState('registeredWeb', registeredWeb);

        if (duplicateUniqueWebId) {
            return res.status(409).json({
                message: "uniqueWebId already exists",

            });
        } else if (duplicateHashFromWeb) {
            return res.status(409).json({
                message: "hashFromWeb already exists",

            });
        } else if (duplicateRegisteredWeb) {
            return res.status(409).json({
                message: "registeredWeb already exists",
            });
        } else {
            await newBrowserState(req.user._id, uniqueWebId, hashFromWeb, registeredWeb, currentUrl, previousUrl, nextUrl, searchHistory);
            return res.status(200).json({
                message: "Browser state created successfully",

            });
        }


    } catch (e) {
        next(e);
    }
}
const PUT_UPDATE_BROWSER_STATE = async (req, res, next) => {
    const id = req.params.id;
    try {
        const {
            uniqueWebId, registeredWeb, currentUrl, previousUrl, nextUrl, searchHistory
        } = req.body;
        let date = new Date().toString();
        const hashFromWeb = CryptoJS.AES.encrypt(uniqueWebId, date).toString()
        const duplicateUniqueWebId = await findBrowserState('uniqueWebId', uniqueWebId);
        const duplicateHashFromWeb = await findBrowserState('hashFromWeb', hashFromWeb);
        const duplicateRegisteredWeb = await findBrowserState('registeredWeb', registeredWeb);

        if (duplicateUniqueWebId) {
            return res.status(409).json({
                message: "uniqueWebId already exists",

            });
        } else if (duplicateHashFromWeb) {
            return res.status(409).json({
                message: "hashFromWeb already exists",

            });
        } else if (duplicateRegisteredWeb) {
            return res.status(409).json({
                message: "registeredWeb already exists",
            });
        } else {
            const browserState = await updateBrowserState(id, {
                uniqueWebId,
                registeredWeb,
                currentUrl,
                previousUrl,
                nextUrl,
                searchHistory
            });
            return res.status(200).json({
                message: "Browser state updated successfully", browserState
            });
        }

    } catch (e) {
        next(e);
    }
}
const GET_BROWSER_STATE = async (req, res, next) => {
    try {
        const {key, value} = req.query;
        const browserState = await findBrowserState(key, value);
        return res.status(200).json({
            message: "Browser state found successfully",
            browserState
        });
    } catch (e) {
        next(e);
    }
}
const GET_BROWSER_STATES = async (req, res, next) => {
    try {
        const browserStates = await findBrowserStates();
        return res.status(200).json({
            message: "Browser states found successfully", browserStates
        });
    } catch (e) {
        next(e);
    }
}
const DELETE_BROWSER_STATE = async (req, res, next) => {
    try {
        const id = req.params.id;
        const browserState = await findBrowserState(id);
        await browserState.remove();
        return res.status(200).json({
            message: "Browser state deleted successfully", browserState
        });
    } catch (e) {
        next(e);
    }
}
const GET_BROWSER_STATES_BY_USER = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const browserStates = await findBrowserStatesByUser(userId);
        return res.status(200).json({
            message: "Browser states found successfully BY USERID", browserStates
        });
    } catch (e) {
        next(e);
    }
}


module.exports = {
    POST_NEW_BROWSER_STATE,
    PUT_UPDATE_BROWSER_STATE,
    GET_BROWSER_STATE,
    GET_BROWSER_STATES,
    DELETE_BROWSER_STATE,
    GET_BROWSER_STATES_BY_USER
}
