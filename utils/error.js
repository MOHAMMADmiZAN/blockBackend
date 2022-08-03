/**
 *
 * @param message
 * @param status
 * @returns {Error}
 */

const error = (message='something want wrong',status=500)=>{
    const err = new Error(message);
    err.status = status;
    return err;

}
module.exports = error;