import { useMemo, useCallback } from "react";
import { useLocation } from "wouter";
import { useSearch } from "wouter/use-location";

const useQuerySearch = () => {
  const [location, setLocation] = useLocation();
  const search = useSearch();

  const searchParams = useMemo(() => {
    return Object.fromEntries(new URLSearchParams(search).entries());
  }, [search]);

  const setSearchParams = useCallback(
    (newSearchParams: Record<string, string | null>) => {
      const newURLSearchParams = new URLSearchParams(search);
      for (const key in newSearchParams) {
        const value = newSearchParams[key];
        if (value) {
          newURLSearchParams.set(key, value);
        } else {
          newURLSearchParams.delete(key);
        }
      }
      const newSearch = newURLSearchParams.toString();
      if (newSearch) {
        setLocation(`${location}?${newSearch}`);
      } else {
        setLocation(`${location}`);
      }
    },
    [location, search]
  );

  return [searchParams, setSearchParams] as const;
};

export default useQuerySearch;
