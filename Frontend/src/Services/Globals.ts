export class Globals {

    public static vacationsUrl: string;

    public static init() {
        if (process.env.NODE_ENV === "production") {
            Globals.vacationsUrl = "";
        }
        else {
            Globals.vacationsUrl = "http://localhost:3001/api/vacations/";
        }
    }
}

Globals.init();