const express = require('express');
const { testRoute, fetchAllUsers, deleteUserById } = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.get("/test", testRoute)
userRouter.get("/users", fetchAllUsers);
userRouter.delete("/delete/:id", deleteUserById)

module.exports = userRouter