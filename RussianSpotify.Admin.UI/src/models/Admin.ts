import {makeAutoObservable} from "mobx";

export default class Admin {
    _email: string | null;

    constructor() {
        this._email = ""
        makeAutoObservable(this)
    }

    static init(email: string | null): Admin {

        let newUser = new Admin()

        newUser._email = email;

        return newUser
    }

    get email() {
        return this._email
    }
}