import React from 'react';
import { Input, Select, Option } from '@material-tailwind/react';
import SearchIcon from '../../assets/svg/search-icon.svg';

interface SubSearchBarProps {
  orderBy: string;
  setOrderBy: Function;
  setFilterValue: Function;
  isActiveSearch: boolean;
  setIsActiveSearch: Function;
  options: Array<{ value: string; label: string }>;
}

export const SubSearchBar: React.FC<SubSearchBarProps> = ({
  orderBy,
  setOrderBy,
  setFilterValue,
  isActiveSearch,
  setIsActiveSearch,
  options,
}) => {
  return (
    <div className="flex flex-row justify-end gap-3 w-full">
      {isActiveSearch && (
        <Input
          type="static"
          onChange={(e) => setFilterValue(e.target.value)}
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          name="filterTable"
          crossOrigin=""
          className="text-white !border-none focus:!border-white/50 bg-black/80 focus:!border-none focus:!border-t w-[100px]"
        />
      )}

      <div
        onClick={() => {
          setIsActiveSearch(true);
        }}
      >
        <SearchIcon />
      </div>

      <div>
        <Select
          value={orderBy}
          onChange={(value) => setOrderBy(value || '')}
          className="text-white bg-transparent border-none"
          label="Order by"
          labelProps={{
            className: 'before:content-none after:content-none text-white',
          }}
        >
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};
