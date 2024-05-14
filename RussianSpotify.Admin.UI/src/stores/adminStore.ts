import Admin from "../models/Admin";
import {makeAutoObservable} from "mobx";

export default class AdminStore {
    _admin: Admin = new Admin()
    _isAuth: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    login(admin: Admin) {
        this._isAuth = true
        this._admin = admin
    }

    logout() {
        this._isAuth = false
        this._admin = new Admin()
    }

    get isAuth() {
        return this._isAuth
    }

    get admin() {
        return this._admin;
    }
}