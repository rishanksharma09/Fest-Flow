class ApiError extends Error {
    constructor(
        statusCode, message = "Something went wrong"
    ) {
        super(message)
        this.status = statusCode
        this.success = false;
    }
}

export default ApiError