import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './Home/HomePage';
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
      </CacheProvider>
    </ErrorProvider>
  );
}
export default App;
