import './App.css'

import { useRef, useState, useEffect } from 'react'

import { Movies, useMovies } from './components/Movies'

function App () {
  console.log('render =>')
  const { movies } = useMovies()
  const inputRef = useRef()
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (event) => {
    // the method prevents the form from submitting and clears the input field
    event.preventDefault()
    console.log({ query })
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
    const newQuery = event.target.value
    if (newQuery.startsWith(' ')) return
    setQuery(event.target.value)
  }
  useEffect(() => {
    if (query === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if (query.match(/^\+$/)) {
      setError('No se puede buscar una pelicular con un numero')
    }
    if (query.length < 3) {
      setError('La busqueda debe tener al menos  3 caracteres')
    }
    setError(null)
  }, [query])
  return (
    /* 47:47 */
    <>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input required onChange={handleChange} value={query} ref={inputRef} name='query' type='text' placeholder='Avengers, Star Wars, Matrix...' />
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
