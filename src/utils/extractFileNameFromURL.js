export const extractFileNameFromURL = (url) =>
  url?.split('/uploads/')[1] || null;
