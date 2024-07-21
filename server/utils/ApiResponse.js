class ApiResponse {
    constructor(statusCode, message = "Success", payload) {
        this.statusCode = statusCode,
            this.success = statusCode < 400,
            this.message = message,
            this.payload = payload
    }
}

module.exports = ApiResponse