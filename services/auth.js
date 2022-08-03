const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../utils/error");

const {newUser, findUser} = require("./user");


/**
 * @description - This function is used to create a new user
 * @param name
 * @param email
 * @param password
 * @returns {Promise<void>}
 */

const registerService = async ({firstName, lastName, email, password, confirmPassword, avatarPath}) => {

    try {
        if (password !== confirmPassword) throw errorHandler('Confirm Password does not match', 400);

        let user = await findUser('email', email)

        if (user) throw errorHandler('User already exists', 409);

        return newUser({firstName, lastName, email, password, avatarPath});

    } catch (e) {
        throw errorHandler(e.message, e.status);
    }


}
/**
 * @param {string} email
 * @param email
 * @param password
 * @returns {Promise<*>}
 */
const loginService = async ({email, password}) => {


    const user = await findUser('email', email);
    if (!user) throw errorHandler('User Not exists', 409);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw errorHandler('Invalid password', 400);
    const payload = {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,

        }
    }
    return {
        token: jwt.sign(payload, 'hash-key', {expiresIn: "2h"}),
        user
    }


}
module.exports = {
    registerService, loginService
}