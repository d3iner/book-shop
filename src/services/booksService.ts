import { BOOKS_STORAGE_KEY } from "@/constants/constants";
import { Book } from "@/interface/interfaces";

export function isFirstTime(){
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify([]))
}

export function getBooks(){
    const allBooks = JSON.parse(localStorage.getItem(BOOKS_STORAGE_KEY) ?? '')
    console.log(allBooks)
    return allBooks
}

export function setBooks(books: Book[]){
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(books))
}