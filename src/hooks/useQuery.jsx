import { useLocation } from "react-router";

const useQuery = () => {
  const query = new URLSearchParams(useLocation().search);

  const getQuery = (key) => {
    return query.get(key);
  };

  return { getQuery };
};

export default useQuery;
