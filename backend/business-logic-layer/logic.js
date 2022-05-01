const dal = require('../data-access-layer/dal');
const User = require('../models/user');

function getListOfUsers(){
    return dal.getAllUsers();
}

function getUserByIdAsync(id){
    return dal.getUserById(id);
}

function addNewUser(user){

    const newUser = new User(user);
    const errors = newUser.validatePost();
    if(errors == null){//no errors
        newUser.id = getNewUserId();
        dal.addNewUser(newUser);
    }
    else{
        throw errors;
    }
}

function editUserAsync(user){
    const newUser = new User(user);
    const errors = newUser.validatePut();
    if(errors == null){
        return dal.editUser(newUser);
    }
    else{
        throw errors;
    }
}

function deleteUserAsync(userId){
    return dal.deleteUser(userId);
}

function getNewUserId(){
    const allUsers=dal.getAllUsers()
    let newId = Math.floor(Math.random() * 9900) + 101;
    let user = allUsers.find(user => user.id === newId); // get by id!!
    while (user) {
        newId = Math.floor(Math.random() * 9900) + 101;
        user = allUsers.find(user => user.id === newId); // // get by id!!
    }
    return newId;
}

module.exports ={
    getListOfUsers,
    getUserByIdAsync,
    addNewUser,
    editUserAsync,
    deleteUserAsync
}