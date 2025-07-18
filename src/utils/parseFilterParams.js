import { FILTER_TYPE } from '../constants/index.js';

const parseType = (value) => {
  if (typeof value === 'undefined') {
    return;
  }
  return FILTER_TYPE.includes(value) ? value : undefined;
};

const parseBoolean = (value) => {
  if (typeof value === 'undefined') {
    return;
  }

  const lower = value.toLowerCase();
  if (lower === 'true') return true;
  if (lower === 'false') return false;
  return;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
