'use client'
import React, {useState, useCallback, useEffect} from 'react';
import Image from 'next/image'

interface Book{
  id: number;
  name: string;
  author: string;
  publishDate: string;
  state:  'Prestado' | 'Dañado' | 'Perdido' | 'Disponible'
}

export default function Home() {

  const [name, setName] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [publishDate, setPublishDate] = useState<string>('')
  const [state, setState] = useState<string>('Prestado')
  const [bookList, setBookList] = useState<Book[]>([])

  useEffect(()=>{
    console.log(bookList)
  }, [bookList])

  const clear = useCallback(()=>{
    setName('')
    setAuthor('')
    setPublishDate('')
  }, [])

  const isValid = useCallback( (book:Book): boolean=>{
    if (book.name.trim() === '') {
      alert('Hay un error con el nombre ingresado, revise he intente denuevo')
      return false
    }
    if (book.author.trim() === '') {
      alert('Hay un error con el autor ingresado, revise he intente denuevo')
      return false
    }
    if (book.publishDate.trim() === '') {
      alert('Hay un error con la fecha, revise he intente denuevo')
      return false
    }
    if (book.state.trim() === '') {
      alert('Hay un error con el estado ingresado, revise he intente denuevo')
      return false
    }
    return true
  },[])

  const onSubmit: React.FormEventHandler = useCallback( e =>{
    e.preventDefault()
    const book: Book = {
      id: bookList[bookList.length - 1] ? bookList[bookList.length - 1]?.id + 1 : 1,
      name: name,
      author: author,
      publishDate: publishDate,
      state: state as  'Prestado' | 'Dañado' | 'Perdido' | 'Disponible'
    }
    console.log(book)
    if (isValid(book)) {
      setBookList([...bookList, book])
      clear()
    }
  }, [name, author, publishDate, state, bookList])

  const deleteBook = useCallback((id: number)=>{
    console.log(id)
    const newBookList = bookList.filter(book => book.id !== id)
    console.log(newBookList)
    setBookList(newBookList)
  }, [bookList])

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <form className='' onSubmit={onSubmit}>
        <div className='grid gap-6 mb-6 md:grid-cols-2'>
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del libro</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Autor</label>
              <input type="text" value={author} onChange={e => setAuthor(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Publicacion</label>
              <input type="date" value={publishDate} onChange={e => setPublishDate(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
              <select defaultValue={state} value={state} onChange={e => setState(e.target.value )}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              >
                <option value="Prestado">Prestado</option>
                <option value="Dañado">Dañado</option>
                <option value="Perdido">Perdido</option>
                <option value="Disponible">Disponible</option>
              </select>
          </div>
          <button type='button' onClick={()=> clear()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded">
            Clear
          </button>
          <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            Submit
          </button>
        </div>
      </form>
      <table className="w-full">
          <thead>
            <tr>
              <th>Nombre del libro</th>
              <th>Autor</th>
              <th>Publicacion</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((book, index)=>[
              <tr key={index}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.publishDate}</td>
                <td>{book.state}</td>
                <td><button type="button" 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                onClick={()=> deleteBook(book.id)}
                >Eliminar</button></td>
              </tr>
            ])}
          </tbody>
        </table>
    </main>
  )
}
