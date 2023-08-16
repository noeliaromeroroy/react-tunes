import React from 'react';
import { Input, Select, Option } from '@material-tailwind/react';
import SearchIcon from '../../assets/svg/search-icon.svg';
import styles from './SubSearchBar.module.css';

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
    <div id="SubSearchBar" className={styles.SubSearchBar}>
      <div className={styles.containerSearch}>
        {isActiveSearch && (
          <Input
            type="static"
            placeholder="search in results"
            onChange={(e) => setFilterValue(e.target.value)}
            labelProps={{
              className: 'labelInput',
            }}
            name="filterTable"
            crossOrigin=""
            className="input placeholderGray"
          />
        )}

        <div
          onClick={() => {
            setIsActiveSearch(true);
          }}
        >
          <SearchIcon />
        </div>
      </div>
      <div>
        <Select
          value={orderBy}
          onChange={(value) => setOrderBy(value || '')}
          className={`${styles.selectOrder} placeholderGray`}
          label="Order by"
          labelProps={{
            className: 'labelInput',
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
