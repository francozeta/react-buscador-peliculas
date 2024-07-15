import './App.css'

import { useState, useEffect } from 'react'

import { Movies, useMovies } from './components/Movies'
function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if (search.match(/^\+$/)) {
      setError('No se puede buscar una pelicular con un numero')
    }
    if (search.length < 3) {
      setError('La busqueda debe tener al menos  3 caracteres')
    }
    setError(null)
  }, [search])

  return { search, updateSearch, error }
}
function App () {
  console.log('render')
  const { movies } = useMovies()
  const { search, updateSearch, error } = useSearch()

  const handleSubmit = (event) => {
    // the method prevents the form from submitting and clears the input field
    event.preventDefault()
    console.log({ search })
    /** Using "useRef" to get the input element
     *  const inputEl = inputRef.current
     *  const value = inputEl.value
     * console.log(value)
    */

    /** Vanilla JS
     * const { query } = Object.fromEntries(
     *  new window.FormData(event.target)
     * )
     * console.log(query)
    */
  }
  const handleChange = (event) => {
    /* if (newQuery.startsWith(' ')) return */
    updateSearch(event.target.value)
  }

  return (
    <>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input required onChange={handleChange} value={search} name='query' type='text' placeholder='Avengers, Star Wars, Matrix...' />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </>
  )
}

export default App
