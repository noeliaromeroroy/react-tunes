import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from 'react-router-dom';
import Search from './Home/HomePage';
import Detail from './Detail/DetailPage';
import PlayerBar from '../components/PlayerBar';
import { MainSearchBar } from '../components/MainSearchBar';
import { PlayerProvider } from '../contexts/PlayerContext';

function App(): JSX.Element {
  return (
    <PlayerProvider>
      <Router>
        <PlayerBar />
        <div className="containerApp">
          <section className="md:max-w-custom px-2 md:px-0 mx-w-full flex-grow">
            <MainSearchBar />
            <Routes>
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/" element={<Search />} />
            </Routes>
          </section>
        </div>
      </Router>
    </PlayerProvider>
  );
}

export default App;
