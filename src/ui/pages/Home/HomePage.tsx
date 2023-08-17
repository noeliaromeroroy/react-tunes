import { useEffect, useState } from 'react';

import '../../../assets/styles/index.css';
import { usePlayerContext } from '../../contexts/PlayerContext';
import { SubSearchBar } from '../../components/SubSearchBar';
import { HomeTable } from '../../components/HomeTable';

function Search(): JSX.Element {
  const { results, setIsHome, filteredResults, setFilteredResults } =
    usePlayerContext();

  const [orderBy, setOrderBy] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isActiveSearch, setIsActiveSearch] = useState(false);

  useEffect(() => {
    setIsHome(true);
  }, []);

  useEffect(() => {
    if (!isActiveSearch) setFilterValue('');
    let filteredResults = results.filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(filterValue.toLowerCase()) ||
        podcast.description.toLowerCase().includes(filterValue.toLowerCase()) ||
        podcast.author.toLowerCase().includes(filterValue.toLowerCase()),
    );
    let sortedData = [...filteredResults];
    switch (orderBy) {
      case 'title':
        sortedData.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'author':
        sortedData.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case 'date':
        sortedData.sort(
          (a, b) =>
            new Date(b.releaseDate).getTime() -
            new Date(a.releaseDate).getTime(),
        );
        break;
      default:
        break;
    }
    setFilteredResults(sortedData);
  }, [orderBy, filterValue, isActiveSearch]);

  return (
    <div id="Home">
      <SubSearchBar
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        setFilterValue={setFilterValue}
        isActiveSearch={isActiveSearch}
        setIsActiveSearch={setIsActiveSearch}
        options={[
          { value: 'title', label: 'Title' },
          { value: 'author', label: 'Author' },
          { value: 'date', label: 'Date' },
        ]}
      />
      {filteredResults.length > 0 ? (
        <HomeTable podcasts={filteredResults} />
      ) : (
        <h1 className="text-white/40">
          ¡Comienza a buscar tu podcast favorito con ReactTunes!
        </h1>
      )}
    </div>
  );
}

export default Search;
