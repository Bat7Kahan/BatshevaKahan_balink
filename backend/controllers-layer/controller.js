//controller
const express = require("express");
const router = express.Router();

const logic = require("../business-logic-layer/logic");


//api/users - get all users
router.get("/users", (request, response) => {
    try{
        const users = logic.getListOfUsers();
        response.status(200).json(users);
    }
    catch(error){
        console.log(error);
        response.status(500).json({message: "Server error"});
    }
});

//api/users/:id - get user by id
router.get("/users/:id", async (request, response) => {
    try {
        const userId = request.params.id;
        const user = await logic.getUserByIdAsync(userId);
        response.status(200).json(user);
    } catch (error) {
        console.log(error);
        response.status(500).json({message: "Server error"});
    }
});
//api/newUser - posts new user
router.post("/newUser", (request, response) => {
    try {
        logic.addNewUser(request.body);
        response.status(200).json({ message: "User added successfully!" });
    } catch (errors) {
        console.log(errors);
        response.status(400).json(errors);
    }
});


//api/editUser - edit user by id
router.put("/editUser", async (request, response) => {
    try {
        await logic.editUserAsync(request.body);
        response.status(200).json({message: "User updated successfully!"});
    } catch (errors) {
        console.log(errors);
        response.status(400).json(errors);
    }
});

//api/deleteUser/:id - deletes user by id
router.delete("/deleteUser/:id", async (request, response) => {
    try {
        await logic.deleteUserAsync(request.params.id);
        response.status(200).json({message: "User deleted successfully!"});
    } catch (error) {
        console.log(error);
        response.status(500).json({message: "Server error"});
    }
});

module.exports = router;