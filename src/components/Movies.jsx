import withResults from '../../mocks/no-results.json'

import responseMovies from '../../mocks/with-results.json'

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

const ListOfMovies = ({ movies }) => {
  return (
    <ul>
      {
        movies.map(movie => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title} />
          </li>
        ))
      }
    </ul>
  )
}

const NoMoviesResult = () => {
  return (
    <p>No se encontraron peliculas para esta busqueda</p>
  )
}
export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMoviesResult />
  )
}
