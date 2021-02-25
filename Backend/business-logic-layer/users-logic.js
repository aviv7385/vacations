const dal = require("../data-access-layer/dal");

// get all users
async function getAllUsersAsync(){
    const sql = `SELECT userId, uuid, username, firstName, lastName FROM users`;
    const users = await dal.executeAsync(sql);
    return users;
}

module.exports = {
    getAllUsersAsync
}