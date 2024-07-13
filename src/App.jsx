import './App.css'

import responseMovies from '../mocks/with-results.json'

import { Movies } from './components/Movies'

export function useMovies () {
  const movies = responseMovies.Search
  const mappedMovies = movies.map(movie => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster
  }))

  return { movies: mappedMovies }
}

function App () {
  const { movies } = useMovies()
  return (
    <>
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className='form'>
          <input type='text' placeholder='Avengers, Star Wars, Matrix...' />
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
