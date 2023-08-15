import Search from '../../assets/svg/search-icon.svg';
import { Input } from '@material-tailwind/react';

const SearchBar: React.FC = () => (
  <div className="Search">
    <Input
      placeholder="podcast"
      variant="static"
      icon={<Search />}
      crossOrigin={undefined}
    />
  </div>
);

export default SearchBar;
