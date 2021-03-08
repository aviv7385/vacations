const dal = require("../data-access-layer/dal");

// get all followed vacations by user's uuid
async function getAllFollowedVacationsAsync(uuid) {
    const sql = `SELECT U.userId, V.vacationId
                FROM follows AS F JOIN users AS U JOIN vacations AS V 
                ON F.userId = U.userId AND F.vacationId = V.vacationId
                WHERE U.uuid = '${uuid}'`;
    const follows = await dal.executeAsync(sql);
    return follows;
}

// follow a new vacation
async function followNewVacationAsync(follow) {
    const sql = `INSERT INTO follows(vacationId, userId) VALUES(${follow.vacationId}, ${follow.userId})`;
    await dal.executeAsync(sql);
    return follow;
}

// remove a follow from a vacation 
async function removeFollowAsync(userId, vacationId) {
    const sql = `DELETE FROM follows WHERE userId = ${userId} AND vacationId = ${vacationId}`;
    await dal.executeAsync(sql);
}

// get number of follow a vacation has 
async function getNumberOfFollowsAsync(vacationId) {
    const sql = `SELECT COUNT(F.vacationId) AS 'Number Of Follows', V.vacationId, V.destination
                FROM follows AS F JOIN vacations AS V
                ON F.vacationId = V.vacationId
                WHERE F.vacationId = ${vacationId}`;
    const numberOfFollows = await dal.executeAsync(sql);
    return numberOfFollows[0];
}

module.exports = {
    getAllFollowedVacationsAsync,
    followNewVacationAsync,
    getNumberOfFollowsAsync,
    removeFollowAsync
}