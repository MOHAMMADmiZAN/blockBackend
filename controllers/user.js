const {findUsers, findUser, createNewUser, userDeleted, updateUser} = require("../services/user");
const error = require("../utils/error");

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 *
 * TODO: Sort,Filter,Pagination,Select
 */


const getUsers = async (req, res, next) => {
    try {
        const users = await findUsers();

        return res.status(200).json({
            status: "success", data: users, message: "Retrieved all users"
        });
    } catch (e) {
        next(e)
    }
}
/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await findUser('_id', id);
        if (!user) {
            return res.status(404).json({
                status: "fail", message: "User not found"
            });
        }
        return res.status(200).json({
            status: "success", data: user, message: "Retrieved user"
        });

    } catch (e) {
        next(e)
    }
}
/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const postUser = async (req, res, next) => {
    try {
        const {firstName,lastName, email, password, confirmPassword, roles} = req.body;


        const find = await findUser('email', email);
        if (find) {
            return res.status(400).json({
                status: "fail", message: "User already exists"
            });
        }
        const user = await createNewUser({firstName,lastName, email, password, confirmPassword, roles});
        if (!user) {
            return res.status(400).json({
                status: "fail", message: "User not Created"
            });
        }
        return res.status(201).json({
            status: "success", data: user, message: "Created user"
        });


    } catch (e) {
        next(e)
    }
}
/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const putUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        let user = await findUser('_id', id);
        if (!user) throw  error("User not found", 404);
        const {name, email, roles, accountStatus} = req.body;
        const duplicate = await findUser('email', email);
        if (duplicate && duplicate._id !== id) throw error("Email already in use", 409);

        user = await updateUser(id, {name, email, roles, accountStatus});
        if (!user) throw error("User not updated", 400);
        return res.status(200).json({
            "status": "success", "message": "User updated", user
        })

    } catch (e) {
        next(e)
    }
}
/**
 *@param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const patchUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await findUser('_id', id);
        if (!user) throw error("User not found", 404);
        const {name, roles, accountStatus} = req.body;
        const updatedUser = await user.update({name, roles, accountStatus});
        if (!updatedUser) throw error("User not updated", 400);
        return res.status(200).json({
            "status": "success", "message": "User updated"
        })


    } catch (e) {
        next(e)
    }
}
/**
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await findUser('_id', id);
        if (!user) throw error("User not found", 404);
        const deleted = await userDeleted(id);
        if (!deleted) throw error("User not deleted", 400);
        return res.status(200).json({
            status: "success",message: "Deleted user"
        });
    } catch (e) {
        next(e)
    }

}
const getUserByEmail = async (req, res, next) => {
    const email = req.params.email;
    try {
        const user = await findUser('email', email);
        if (!user) throw error("User not found", 404);
        return res.status(200).json({
            status: "success", data: user, message: "Retrieved user"
        });

    } catch (e) {
        next(e)
    }
}

module.exports = {
    getUsers, getUser, postUser, putUser, patchUser, deleteUser,getUserByEmail
}