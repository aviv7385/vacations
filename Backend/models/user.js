const { use } = require("../controllers/auth-controller");

class User {
    constructor(user){
        this.userId = user.userId;
        this.uuid = user.uuid;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.password = user.password;
        this.isAdmin = user.isAdmin;
    }
}

module.exports = User;