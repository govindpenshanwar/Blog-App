const User = require('../Models/model')
const ApiError = require('../utils/ApiError')
const ApiResponse = require('../utils/ApiResponse')

const asyncHandler = require("../utils/asyncHandler")
const { STATUS_CODES } = require('../utils/constants')
const testRoute = asyncHandler(async (req, res) => {
    try {
        return res.json(new ApiResponse(200, "successfull"))
    } catch (error) {
        throw new ApiError(500, error.message)
    }
})

const fetchAllUsers = asyncHandler(async (req, res) => {
    try {
        const result = await User.find().select("-password");
        if (!result) {
            return res.json(new ApiResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, "No Users Found"))
        };
        result.password = null
        return res.json(new ApiResponse(STATUS_CODES.OK, "All users fetched Successfully", result))
    } catch (error) {
        throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, error.message)
    }
})
const deleteUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.json(new ApiResponse(STATUS_CODES.BAD_REQUEST, "ID is missing"))
        }
        const result = await User.findByIdAndDelete(id);
        return res.json(new ApiResponse(STATUS_CODES.OK, "User Deleted Successfully"))
    } catch (error) {
        throw new ApiError(STATUS_CODES.INTERNAL_SERVER_ERROR, error.message)
    }
})

module.exports = {
    testRoute, fetchAllUsers, deleteUserById
}