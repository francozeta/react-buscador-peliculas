import './App.css'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useMovies } from './hooks/useMovies'

import { Movies } from './components/Movies'
import Loading from './components/Loading'

import debounce from 'just-debounce-it'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if (search.match(/^\d+$/)) {
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
  const [sort, setSort] = useState(false)

  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search: ', search)
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    // the method prevents the form from submitting and clears the input field
    event.preventDefault()
    getMovies({ search })
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

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <>
      <div className='page'>
        <header>
          <h1>Buscador de Peliculas</h1>
          <form className='form' onSubmit={handleSubmit}>
            <input
              style={{
                border: '1px solid transparent',
                borderColor: error ? 'red' : 'transparent'
              }}
              required onChange={handleChange} value={search} name='query' type='text' placeholder='Avengers, Star Wars, Matrix...'
            />
            <input type='checkbox' onChange={handleSort} checked={sort} />
            <button type='submit'>Buscar</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </header>
        <main>
          {
            loading ? <Loading /> : <Movies movies={movies} />
          }
        </main>
      </div>
    </>
  )
}

export default App
