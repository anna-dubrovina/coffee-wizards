const regex = /\/\w+\//;

export const getSubcategoryName = (path) => {
  if (path.search(regex) >= 0) {
    const names = path.substring(1).split('/');
    return {
      category: names[0],
      subcategory: names[1],
    };
  } else {
    return {
      category: path.substring(1),
      subcategory: '',
    };
  }
};
