import { SORT_ORDER } from '../constants/index.js';
import { SORT_BY } from '../constants/contacts.js';

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  return isKnownOrder ? sortOrder : SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const isKnownKey = SORT_BY.includes(sortBy);
  return isKnownKey ? sortBy : SORT_BY[0];
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return { sortBy: parsedSortBy, sortOrder: parsedSortOrder };
};
