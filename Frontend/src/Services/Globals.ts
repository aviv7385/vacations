export class Globals {

    public static vacationsUrl: string;
    public static socketIoUrl: string;
    public static adminUrl: string;


    public static init() {
        if (process.env.NODE_ENV === "production") {
            Globals.vacationsUrl = "";
            Globals.socketIoUrl = "";
            Globals.adminUrl = "";
        }
        else {
            Globals.vacationsUrl = "http://localhost:3001/api/vacations/"; // the url for any user
            Globals.adminUrl = "http://localhost:3001/api/admin/vacations/"; // the url for admin only
            Globals.socketIoUrl = "http://localhost:3001"; // url for socket.io
        }
    }
}

Globals.init();