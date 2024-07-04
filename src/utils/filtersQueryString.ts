import queryString from "query-string";

interface Filter {
  id: string;
  value: any | any[];
}

export function filtersToQueryString(filters: Filter[]): string {
  const params = filters.reduce(
    (acc: { [key: string]: string[] }, filter: Filter) => {
      if (Array.isArray(filter.value)) {
        filter.value.forEach((val: string) => {
          if (acc[filter.id]) {
            acc[filter.id].push(val);
          } else {
            acc[filter.id] = [val];
          }
        });
      } else {
        acc[filter.id] = [filter.value];
      }
      return acc;
    },
    {}
  );

  return queryString.stringify(params, { arrayFormat: "bracket" });
}

export function queryStringToFilters(query: string): Filter[] {
  // Parse the query string into an object
  const parsed = queryString.parse(query, { arrayFormat: "bracket" });

  // Transform the parsed object into an array of filters
  const filters: Filter[] = Object.keys(parsed).map((key) => {
    const value = parsed[key];
    return {
      id: key,
      value: Array.isArray(value) ? value : [value],
    };
  });

  return filters;
}
