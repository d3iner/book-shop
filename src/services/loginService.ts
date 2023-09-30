import { USER_STORAGE_KEY, IS_LOGGED_STORAGE_KEY } from "@/constants/constants";
import { Credentials } from "@/interface/interfaces";
import { isFirstTime as BooksisFirstTime } from "./booksService";

function firstTime(){
    console.log('saving')
    const user: Credentials = {
        email: "user@example.com",
        password: '12345678'
    }
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    localStorage.setItem(IS_LOGGED_STORAGE_KEY, JSON.stringify(false))
    BooksisFirstTime()
}

function getUser(){
    const user: Credentials = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) ?? '')
    return user
}

export function verifyStorage(){
    if (localStorage.getItem(USER_STORAGE_KEY) == null) {
        firstTime()
    }
}

export function isLogged():boolean{
    const isUserLogged:boolean = JSON.parse(localStorage.getItem(IS_LOGGED_STORAGE_KEY) ?? 'false')
    return isUserLogged;
}

export function logIn(loginUser: Credentials):boolean{
    const user: Credentials = getUser();
    const isEqual = user.email == loginUser.email && user.password == loginUser.password
    if (isEqual) {
        localStorage.setItem(IS_LOGGED_STORAGE_KEY, 'true')
    }
    return isEqual
}

export function logOut(){
    localStorage.setItem(IS_LOGGED_STORAGE_KEY, 'false')
}