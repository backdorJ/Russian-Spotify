import User from "../models/User";
import {makeAutoObservable, makeObservable} from "mobx";

export default class UserStore {
    user: User = new User()
    isAuth: boolean = false;

    constructor() {
        makeObservable(this)
    }

    login(user: User) {
        this.isAuth = true
        this.user = user
    }

    logout() {
        this.isAuth = false
        this.user = new User()
    }

    setIsAuth(state: boolean) {
        this.isAuth = state
    }

    getIsAuth() {
        return this.isAuth
    }

    setUser(user: User) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }
}