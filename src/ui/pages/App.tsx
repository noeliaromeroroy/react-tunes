import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from 'react-router-dom';
import Search from './Search/SearchPage';
import Detail from './Detail/DetailPage';

function App(): JSX.Element {
  return (
    <Router>
      <div>
        <h1>Simple SPA Page for podcast</h1>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/detail/2312">Detail</NavLink>
          </li>
        </ul>
        <div>
          <Routes>
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/" element={<Search />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
