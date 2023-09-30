export interface Credentials{
    email: string;
    password: string;
}

export interface Book{
    id: number;
    name: string;
    author: string;
    publishDate: string;
    state:  BookState
} 

export type BookState = 'Prestado' | 'Dañado' | 'Perdido' | 'Disponible'