const uuid = require("uuid");
const dal = require("../data-access-layer/dal");
const cryptoHelper = require("../helpers/crypto-helper");
const jwtHelper = require("../helpers/jwt-helper");


// register - add new user (access allowed to any user)
async function registerAsync(user) {
    // Hash user password: 
    user.password = cryptoHelper.hash(user.password);

    // Create new UUID for that user: 
    user.uuid = uuid.v4();

    const sql = `INSERT INTO users(userId, uuid, firstName, lastName, username, password, isAdmin)  
                VALUES(DEFAULT, '${user.uuid}', '${user.firstName}', 
                '${user.lastName}', '${user.username}', '${user.password}', DEFAULT)`;
    const info = await dal.executeAsync(sql);
    user.userId = info.insertId;

    // Delete the password: 
    delete user.password;

    // Generate JWT token to return to frontend:
    user.token = jwtHelper.getNewToken({ user });

    return user;
}


// login - get one user (access allowed to any user)
async function loginAsync(credentials) {

    // Hash user password: 
    credentials.password = cryptoHelper.hash(credentials.password);

    const sql = `SELECT userId, uuid, firstName, lastName, username, isAdmin FROM users 
                WHERE username = '${credentials.username}' AND password = '${credentials.password}'`;
    const users = await dal.executeAsync(sql);
    if (users.length === 0) {
        return null;
    }
    const user = users[0];

    // Generate JWT token to return to frontend:
    user.token = jwtHelper.getNewToken({ user });
    return user;
}

module.exports = {
    registerAsync,
    loginAsync
};