const { response } = require("express");
const uuid = require("uuid");
const dal = require("../data-access-layer/dal");

// get all vacations (ALL USERS)
async function getAllVacationsAsync() {
    const sql = `SELECT vacationId, destination, description, 
                DATE_FORMAT(fromDate, "%M %d %Y") AS fromDate, 
                DATE_FORMAT(toDate, "%M %d %Y") AS toDate, 
                price, imageFileName FROM vacations`;
    const vacations = await dal.executeAsync(sql);
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
    return vacations[0];
}

// add one vacation (ONLY ADMIN)
async function addOneVacation(vacation, image) {
    // save image to server
    let newFileName;
    if (image) {
        const extension = image.name.substr(image.name.lastIndexOf("."));
        newFileName = uuid.v4() + extension;
        await image.mv("./images/" + newFileName);
    }

    const sql = `INSERT INTO vacations(vacationId, destination, description, fromDate, toDate, price, imageFileName)
                VALUES (DEFAULT, '${vacation.destination}', '${vacation.description}', 
                '${vacation.fromDate}', '${vacation.toDate}', ${vacation.price}, '${vacation.imageFileName}')`;
    const info = await dal.executeAsync(sql);
    vacation.id = info.insertId;
    vacation.imageFileName = newFileName;
    return vacation;
}

// Update full vacation (ONLY ADMIN)
async function updateFullVacationAsync(vacation) {
    const sql = `UPDATE vacations SET 
                destination = '${vacation.destination}',
                description = '${vacation.description}',
                fromDate = '${vacation.fromDate}',
                toDate = '${vacation.toDate}',
                price = ${vacation.price},
                imageFileName = '${vacation.imageFileName}'
                WHERE vacationId = ${vacation.vacationId}`;
    const info = await dal.executeAsync(sql);
    return info.affectedRows === 0 ? null : vacation;
}

// Update partial vacation (ONLY ADMIN)
async function updatePartialVacation(vacation) {
    const vacationToUpdate = await getOneVacationAsync(vacation.vacationId);
    if (!vacationToUpdate) {
        return null;
    }
    for (const prop in vacation) {
        if (vacation[prop] !== undefined) {
            vacationToUpdate[prop] = vacation[prop];
        }
    }
    return await updateFullVacationAsync(vacationToUpdate);
}

// Delete one vacation (ONLY ADMIN)
async function deleteOneVacation(vacationId) {
    const sql = `DELETE FROM vacations WHERE vacationId = ${vacationId}`;
    await dal.executeAsync(sql);
}


module.exports = {
    getAllVacationsAsync,
    getOneVacationAsync,
    addOneVacation,
    updateFullVacationAsync,
    updatePartialVacation,
    deleteOneVacation
}