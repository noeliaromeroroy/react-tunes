import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from 'react-router-dom';
import Search from './Search/SearchPage';
import Detail from './Detail/DetailPage';
import PlayerBar from '../components/PlayerBar';
import SearchBar from '../components/SearchBar';
import { PlayerProvider } from '../contexts/PlayerContext';

function App(): JSX.Element {
  return (
    <PlayerProvider>
      <Router>
        <div className="h-full w-full text-white antialiased">
          <PlayerBar />
          <div className="relative mx-auto flex h-full max-w-screen-md flex-col gap-0 bg-transparent">
            <section className="flex max-w-full flex-col gap-12 py-4">
              <SearchBar />
              <Routes>
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/" element={<Search />} />
              </Routes>
            </section>
          </div>
        </div>
      </Router>
    </PlayerProvider>
  );
}

export default App;
