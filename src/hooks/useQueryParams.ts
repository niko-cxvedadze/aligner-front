import { useSearchParams } from "react-router-dom";

type setQueryParamsArgs = {
  key: string;
  value: any;
  keepOld?: boolean;
};

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  function setQueryParam({ key, value }: setQueryParamsArgs) {
    if (value) {
      searchParams.set(key, value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(key);
      setSearchParams(searchParams);
    }
  }

  return {
    searchParams,
    setQueryParam,
    setSearchParams,
  };
}
