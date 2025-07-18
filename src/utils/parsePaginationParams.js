const parsedNumber = (value, defaulValue) => {
  if (value === undefined) {
    return defaulValue;
  }
  const parsedValue = parseInt(value);
  if (Number.isNaN(parsedValue)) {
    return defaulValue;
  }
  return parsedValue;
};

export const parsePaginationParams = (query, defPage, defPerPage) => {
  const { page, perPage } = query;

  const parsedPage = parsedNumber(page, defPage);
  const parsedPerPage = parsedNumber(perPage, defPerPage);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
