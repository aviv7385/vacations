export class Globals {

    public static vacationsUrl: string;
    public static socketIoUrl: string;

    public static init() {
        if (process.env.NODE_ENV === "production") {
            Globals.vacationsUrl = "";
            Globals.socketIoUrl = "";
        }
        else {
            Globals.vacationsUrl = "http://localhost:3001/api/vacations/";
            Globals.socketIoUrl = "http://localhost:3001";
        }
    }
}

Globals.init();