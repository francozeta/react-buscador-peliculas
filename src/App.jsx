import './App.css'

import { useRef } from 'react'

import { Movies, useMovies } from './components/Movies'

function App () {
  const { movies } = useMovies()
  const inputRef = useRef()

  const handleSubmit = (event) => {
    // the method prevents the form from submitting and clears the input field
    event.preventDefault()
    const inputEl = inputRef.current
    const value = inputEl.value
    console.log(value)
    /** Vanilla JS
    * const { query } = Object.fromEntries(
    *  new window.FormData(event.target)
    * )
    * console.log(query)
    */
  }
  return (
    <>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input name='query' type='text' placeholder='Avengers, Star Wars, Matrix...' />
          <button type='submit'>
            Buscar
          </button>
        </form>
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </>
  )
}

export default App
