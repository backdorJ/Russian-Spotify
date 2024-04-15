import {makeAutoObservable} from "mobx";

export default class User {
    _id: number;
    _email: string;
    _username: string;
    _subStartDate: Date;
    _subEndDate: Date;
    photoUrl: string;

    constructor() {
        this._id = 0
        this._email = ""
        this._username = ""
        this._subStartDate = new Date()
        this._subEndDate = new Date()
        this.photoUrl = ""
        makeAutoObservable(this)
    }

    static init(id: number, email: string, username: string, photoUrl: string) {
        if (parseInt(String(id)) !== id)
            throw new Error("Wrong id")

        let newUser = new User()

        newUser._id = id;
        newUser._email = email;
        newUser._username = username;
        newUser.photoUrl = photoUrl;

        return newUser
    }

    initSubscription(startDate: Date, endDate: Date) {
        this._subStartDate = new Date(startDate)
        this._subEndDate = new Date(endDate)
    }

    get isSubscribed() {
        if (this._subEndDate === null)
            return false

        let nowDate = new Date(Date.now())
        return (this._subEndDate > nowDate)
    }

    get id() {
        return this._id;
    }

    get email() {
        return this._email
    }

    get username() {
        return this._username
    }
}