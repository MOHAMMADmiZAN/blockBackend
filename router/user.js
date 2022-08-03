const {getUser, patchUser, putUser, deleteUser, getUsers, postUser} = require("../controllers/user");
const router = require('express').Router();


/**
 *Get All Users,include
 * sort
 * filter
 * pagination
 * search
 * select Properties
 *@visibility private
 */


/**
 * get User by id
 * @method GET
 */
router.get('/:id',getUser);
/**
 * Update user by id
 * @method PATCH
 */
router.patch('/:id',patchUser);
/**
 * Update user by id
 * @method PUT
 */
router.put('/:id',putUser)
/**
 * Delete user by id
 * @method DELETE
 */

router.delete('/:id', deleteUser);
/**
 * Get All Users
 * @method GET
 */
router.get('/',getUsers);
/**
 * Create new user
 * @method POST
 */
router.post('/', postUser);


module.exports = router;