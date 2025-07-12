export const sortBy = (array, property) => {
  return array.sort((a, b) =>
    a[property].toLowerCase() < b[property].toLowerCase()
      ? -1
      : b[property].toLowerCase() > a[property].toLowerCase()
      ? 1
      : 0
  );
};
