const express = require ("express")
const {createUser,loginUser,getUser,updateUser,deleteUser} = require("../controller/userController")
const authentication = require("../middleware/auth.middleware")

const route = express.Router()

route.get("/", authentication, getUser);
route.post("/", createUser);
route.post("/login", authentication, loginUser);
route.put("/", updateUser);
route.delete("/", deleteUser);

module.exports = route
