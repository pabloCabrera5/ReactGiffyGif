

import React, { useCallback } from 'react';
import './App.css';
import Home from './pages/Home';
import Detail from './pages/Detail';

import { Link, Route, useLocation } from 'wouter';
import SearchResults from './pages/SearchResults';
import StaticContext from "./context/StaticContext";
import { GifsContextProvider } from './context/GifsContext';
import SearchForm from 'components/SearchForm';
function App() {

  const [path, pushLocation] = useLocation();
  const handleSubmit = useCallback(({ keyword }) => {
    if(!keyword.trim()) keyword = 'puppys';
    pushLocation(`/search/${keyword}`)
  }, [pushLocation])

  return (
    <StaticContext.Provider value={
      {
        value: 'Text',
        used: true
      }
    }>
      <div className="App">
        <section className="App-content">
          <Link to={'/'}>
            <h1 className='rainbow-text'> Giffy Giff App</h1>
          </Link>
          
          <Link to={'/'}>
            <img id='logo' src='/gif-logo.png' alt='logo'></img>
          </Link>
          <GifsContextProvider>
            <div className='searchBar'>
              <SearchForm onSubmit={handleSubmit} />
            </div>
            <Route
              path='/'
              component={Home} />
            <Route
              path='/search/:keyword'
              component={SearchResults} />
            <Route
              path='/gif/:id'
              component={Detail} />
            <Route
              path='/404'
              component={() =>
                <h1> 404 Error, no gif :( </h1>} />
          </GifsContextProvider>
        </section>
      </div>
    </StaticContext.Provider>
  );
}

export default App;
