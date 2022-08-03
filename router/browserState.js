const {
    POST_NEW_BROWSER_STATE,
    PUT_UPDATE_BROWSER_STATE,
    GET_BROWSER_STATE,
    GET_BROWSER_STATES,
    DELETE_BROWSER_STATE, GET_BROWSER_STATES_BY_USER
} = require("../controllers/browserState");
const router = require('express').Router();


/**
 * @api {post} /api/v1/browser/new New Browser State
 */
router.post('/', POST_NEW_BROWSER_STATE)
/**
 * @api {get} /api/v1/browser/:id Get Browser State
 */
router.get('/:id', GET_BROWSER_STATE)
/**
 * @api {get} /api/v1/browser Get Browser States
 */
router.get('/', GET_BROWSER_STATES)
/**
 * @api {delete} /api/v1/browser/:id Delete Browser State
 */
router.delete('/:id', DELETE_BROWSER_STATE)
/**
 * @api {put} /api/v1/browser/:id Update Browser State
 */
router.put('/:id', PUT_UPDATE_BROWSER_STATE)

/**
 * @api {get} /api/v1/browser/user/:id Get Browser States by User
 */
router.get('/user/:id', GET_BROWSER_STATES_BY_USER)

module.exports = router;