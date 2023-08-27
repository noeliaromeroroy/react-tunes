import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/HomePage';
import Search from './Search/SearchPage';
import Detail from './Detail/DetailPage';
import PlayerBar from '../components/PlayerBar';
import { MainSearchBar } from '../components/MainSearchBar';
import { PlayerProvider } from '../contexts/PlayerContext';
import CacheProvider from '../contexts/CacheContext';
import { ErrorProvider } from '../contexts/ErrorContext';

function App(): JSX.Element {
  return (
    <ErrorProvider>
      <CacheProvider>
        <PlayerProvider>
          <Router>
            <PlayerBar />
            <div className="containerApp">
              <section className="max-w-full grow px-2 md:max-w-custom md:px-0">
                <MainSearchBar />
                <Routes>
                  <Route path="/detail/:id" element={<Detail />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/search/:term" element={<Search />} />
                </Routes>
              </section>
            </div>
          </Router>
        </PlayerProvider>
      </CacheProvider>
    </ErrorProvider>
  );
}
export default App;
