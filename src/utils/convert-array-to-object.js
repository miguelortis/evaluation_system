export const convertArrayToObject = (arr) => {
  const result = {};
  arr.forEach((item) => {
    result[item.id] = "";
  });
  return result;
};
