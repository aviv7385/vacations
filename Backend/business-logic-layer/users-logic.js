const dal = require("../data-access-layer/dal");

// get all users
async function getAllUsersAsync(){
    const sql = `SELECT userId, uuid, username, firstName, lastName, isAdmin FROM users`;
    console.log(sql);
    const users = await dal.executeAsync(sql);
    return users;
}

// get one user
async function getOneUserAsync (uuid){
    const sql = `SELECT userId, uuid, username, firstName, lastName, isAdmin FROM users
                WHERE uuid = ${uuid}`;
    const users = await dal.executeAsync(sql);
    return users[0];
}

// check if username exists
async function checkUsernameAsync(username){
    const sql = `SELECT username FROM users WHERE username = '${username}'`;
    const isUsername = await dal.executeAsync(sql);
    return isUsername;
} 

module.exports = {
    getAllUsersAsync,
    getOneUserAsync,
    checkUsernameAsync
}