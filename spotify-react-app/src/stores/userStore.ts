import User from "../models/User";
import {makeAutoObservable, makeObservable} from "mobx";

export default class UserStore {
    _user: User = new User()
    _isAuth: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    login(user: User) {
        this._isAuth = true
        this._user = user
    }

    logout() {
        this._isAuth = false
        this._user = new User()
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user;
    }
}