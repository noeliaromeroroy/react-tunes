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

function App(): JSX.Element {
  return (
    <Router>
      <div className="h-full w-full text-white antialiased">
        <PlayerBar />
        <div className="relative mx-auto flex h-full max-w-screen-md flex-col gap-0 bg-transparent">
          <section className="flex max-w-full flex-col gap-12 py-4">
            <SearchBar />
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/detail/2312">Detail</NavLink>
              </li>
            </ul>
            <Routes>
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/" element={<Search />} />
            </Routes>
          </section>
        </div>
      </div>
    </Router>
  );
}

export default App;
