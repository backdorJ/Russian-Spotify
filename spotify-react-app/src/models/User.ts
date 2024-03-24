import {throws} from "assert";

export default class User {
    id: number;
    email: string;
    username: string;

    constructor() {
        this.id = 0
        this.email = ""
        this.username = ""
    }

    static init(id: number, email: string, username: string) {
        if (parseInt(String(id)) !== id)
            throw new Error("Wrong id")

        let newUser = new User()

        newUser.id = id;
        newUser.email = email;
        newUser.username = username;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email
    }

    getUsername() {
        return this.username
    }
}