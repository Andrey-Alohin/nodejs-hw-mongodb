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

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parsedNumber(page, 1);
  const parsedPerPage = parsedNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
