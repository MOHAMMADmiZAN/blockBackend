const {registerService, loginService} = require("../services/auth");


/**
 * @description - This function is used to register a new user
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */

const registerController = async (req, res, next) => {
    try {
        const {firstName, lastName, email, password, confirmPassword} = req.body
        let avatarPath = req.file.path;
        avatarPath = avatarPath.split('public')[1];
        const user = await registerService({firstName, lastName, email, password, confirmPassword, avatarPath});

        return res.status(201).json({
            message: "Account created successfully", user
        });


    } catch (e) {
        next(e)
    }


}

/**
 * @description - This function is used to log in a user
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */

const loginController = async (req, res, next) => {


    try {
        const {email, password} = req.body;
        const {token, user} = await loginService({email, password});
        if (token) {
            res.status(200).json({
                message: "Login successful",
                token,
                id: user.id,
                avtar: user.avatar,
                authName: user.firstName + " " + user.lastName
            });
        } else {
            res.status(401).json({
                message: "Invalid credentials",

            });
        }

    } catch (e) {
        next(e);
    }
}
module.exports = {
    registerController, loginController
}