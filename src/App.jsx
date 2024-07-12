import './App.css'

function App () {
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
        {/* Peliculas */}
      </main>
    </>
  )
}

export default App
