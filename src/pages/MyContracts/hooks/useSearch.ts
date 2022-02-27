import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

export const useSearch = <T extends Array<unknown>>(
  initList: T,
  debounceDelay = 500,
) => {
  const [filteredList, setFilteredList] = useState<T>(initList);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, debounceDelay);

  const searchHandler = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  useEffect(() => {
    if (!debouncedSearchValue) {
      setFilteredList(initList);
    } else {
      const newFilteredList = initList.filter(({ contractName }) => {
        const isContractNameInSearch = contractName
          .toLowerCase()
          .includes(debouncedSearchValue.toLowerCase());
        return isContractNameInSearch;
      });
      setFilteredList(newFilteredList as T);
    }
  }, [debouncedSearchValue, initList]);

  return {
    searchValue,
    searchHandler,
    setSearchValue,
    debouncedSearchValue,
    filteredList,
  };
};
