const regex = /\/\w+\//;

export const getSubcategoryName = (path) => {
  if (path.search(regex) >= 0) {
    const subcategory = path.split(regex);
    return subcategory[1];
  } else {
    return '';
  }
};
