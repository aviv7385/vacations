const uuid = require("uuid");
const dal = require("../data-access-layer/dal");
const followsLogic = require("./follows-logic");

// get all vacations (ALL USERS)
async function getAllVacationsAsync() {
    const sql = `SELECT vacationId, destination, description, 
                DATE_FORMAT(fromDate, "%M %d %Y") AS fromDate, 
                DATE_FORMAT(toDate, "%M %d %Y") AS toDate, 
                price, imageFileName FROM vacations`;
    const vacations = await dal.executeAsync(sql);
    for(const vacation of vacations) {
        vacation.followersCount = (await followsLogic.getNumberOfFollowsAsync(vacation.vacationId)).followersCount;
        console.log(vacation.followersCount);
    }
    
    return vacations;
}

// get one vacation
async function getOneVacationAsync(vacationId) {
    
    const sql = `SELECT vacationId, destination, description, 
                DATE_FORMAT(fromDate, "%M %d %Y") AS fromDate, 
                DATE_FORMAT(toDate, "%M %d %Y") AS toDate, 
                price, imageFileName FROM vacations 
                WHERE vacationId = ${vacationId}`;
    const vacations = await dal.executeAsync(sql);
    vacations[0].followersCount = (await followsLogic.getNumberOfFollowsAsync(vacations[0].vacationId)).followersCount;
    return vacations[0];
}

// add one vacation (ONLY ADMIN)
async function addOneVacationAsync(vacation, image) {
    // save image to server
    let newFileName = null;
    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        newFileName = uuid.v4() + extension;
        await image.mv("./images/" + newFileName);
    }
    const sql = `INSERT INTO vacations(vacationId, destination, description, fromDate, toDate, price, imageFileName)
                VALUES (DEFAULT, '${vacation.destination}', '${vacation.description}', 
                '${vacation.fromDate}', '${vacation.toDate}', ${vacation.price}, '${newFileName}')`;
    const info = await dal.executeAsync(sql);
    vacation.vacationId = info.insertId;
    vacation.imageFileName = newFileName;
    return vacation;
}

// Update full vacation (ONLY ADMIN)
async function updateFullVacationAsync(vacation, image) {
    // save image to server
    let newFileName = null;
    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        newFileName = uuid.v4() + extension;
        await image.mv("./images/" + newFileName);
    }
    const sql = `UPDATE vacations SET 
                destination = '${vacation.destination}',
                description = '${vacation.description}',
                fromDate = '${vacation.fromDate}',
                toDate = '${vacation.toDate}',
                price = ${vacation.price},
                imageFileName = '${vacation.imageFileName}'
                WHERE vacationId = ${vacation.vacationId}`;
    const info = await dal.executeAsync(sql);
    if (image){
        vacation.imageFileName = newFileName;
    }
    return info.affectedRows === 0 ? null : vacation;
}

// Update partial vacation (ONLY ADMIN)
async function updatePartialVacationAsync(vacation, image) {
    
     // save image to server
     let newFileName = null;
     if (image) {
         const extension = image.name.substr(image.name.lastIndexOf("."));
         newFileName = uuid.v4() + extension;
         await image.mv("./images/" + newFileName);
     }
    const vacationToUpdate = await getOneVacationAsync(vacation.vacationId);
   
    if (!vacationToUpdate) {
        return null;
    }
    for (const prop in vacation) {
        if (vacation[prop] !== undefined) {
            vacationToUpdate[prop] = vacation[prop];
        }
    }
    if (image){
        vacationToUpdate.imageFileName = newFileName;
    }
    return await updateFullVacationAsync(vacationToUpdate);
}

// Delete one vacation (ONLY ADMIN)
async function deleteOneVacationAsync(vacationId) {
    const sqlFollows = `DELETE FROM follows WHERE vacationId = ${vacationId}`;
    const sqlVacations = `DELETE FROM vacations WHERE vacationId = ${vacationId}`;
    await dal.executeAsync(sqlFollows);
    await dal.executeAsync(sqlVacations);
}


module.exports = {
    getAllVacationsAsync,
    getOneVacationAsync,
    addOneVacationAsync,
    updateFullVacationAsync,
    updatePartialVacationAsync,
    deleteOneVacationAsync
}