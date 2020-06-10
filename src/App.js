

import React, { useCallback, Suspense } from 'react';
import './App.css';

import { Link, Route, useLocation } from 'wouter';
import StaticContext from "./context/StaticContext";
import { GifsContextProvider } from './context/GifsContext';
import SearchForm from 'components/SearchForm';

// React lazy and react router for code splitting
const HomePage = React.lazy(() => import('./pages/Home'));
const ResultsPage = React.lazy(() => import('./pages/SearchResults'));
const DetailPage = React.lazy(() => import('./pages/Detail'));

export default function App() {

  const [path, pushLocation] = useLocation();
  const handleSubmit = useCallback(({ keyword }) => {
    if (!keyword.trim()) keyword = 'puppys';
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

          <Suspense fallback={null}>
            <GifsContextProvider>
              <div className='searchBar'>
                <SearchForm onSubmit={handleSubmit} />
              </div>
              <Route
                path='/'
                component={HomePage} />
              <Route
                path='/search/:keyword'
                component={ResultsPage} />
              <Route
                path='/gif/:id'
                component={DetailPage} />
              <Route
                path='/404'
                component={() =>
                  <h1> 404 Error, no gif :( </h1>} />
            </GifsContextProvider>
          </Suspense>
        </section>
      </div>
    </StaticContext.Provider>
  );
}

