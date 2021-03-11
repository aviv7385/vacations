class Vacation {
    constructor(existingVacation){
        this.vacationId = existingVacation.vacationId;
        this.destination = existingVacation.destination;
        this.description = existingVacation.description;
        this.fromDate = existingVacation.fromDate;
        this.toDate = existingVacation.toDate;
        this.price = existingVacation.price;
        this.imageFileName = existingVacation.imageFileName;
    }
}

module.exports = Vacation;