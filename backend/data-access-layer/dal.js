const database = require("../database-layer/database");


function getAllUsers(){
    return database.users;
}

function getUserById(id){
    return new Promise((resolve, reject) => {
        const index = database.users.findIndex(u => u.id == id);
        if(index > -1){
            resolve(database.users[index]);
        }
        else{
            reject(`User with Id of: ${userId} not found`);
        }  
    }); 
}

function addNewUser(user){
    database.users.push(user); 
    return;  
}


function editUser(user){
    return new Promise((resolve, reject) => {
        const index = database.users.findIndex(u => user.id == u.id);
        if(index > -1){
            database.users[index] = user;
            resolve();
        }
        else{
            reject(`Can't update user with Id of: ${user.id}, user not found`);
        }  
    });
}

function deleteUser(userId){
    return new Promise((resolve, reject) => {
        const index = database.users.findIndex(u => u.id == userId);
        if(index > -1){
            database.users.splice(index, 1);
            resolve();
        }
        else{
            reject(`Can't delete user with Id of: ${userId}, user not found`);
        }  
    }); 
}

module.exports = {
    getAllUsers,
    getUserById,
    addNewUser,
    editUser,
    deleteUser
}