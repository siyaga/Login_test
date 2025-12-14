
/**
 * Standard Success Response
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code (e.g. 200, 201)
 * @param {String} message - Success message
 * @param {Object} data - Data to return (optional)
 */
const success = (res, statusCode, message, data = null) => {
    const response = {
        status: 'success',
        message: message,
    };

    if (data) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

/**
 * Standard Error Response
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code (e.g. 400, 401, 500)
 * @param {String} message - Error message
 * @param {Object} errorDetails - Detailed error info (optional, good for debugging)
 */
const error = (res, statusCode, message, errorDetails = null) => {
    const response = {
        status: 'fail', 
        message: message,
    };

    if (errorDetails) {
        response.error = errorDetails;
    }

    if (statusCode >= 500) {
        response.status = 'error';
    }

    return res.status(statusCode).json(response);
};

module.exports = { success, error };