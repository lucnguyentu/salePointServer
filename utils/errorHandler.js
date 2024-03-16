export default class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        // to capture the stack-trace where you throw the error
        Error.captureStackTrace(this, this.constructor);
    }
}
