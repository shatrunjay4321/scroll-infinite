import { useCallback, useState, useEffect } from "react";

const useApiCall = ({ query = "", page }) => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiTrigger = useCallback(async () => {
    try {
      setLoading(() => true);
      const response = await fetch(
        "https://openlibrary.org/search.json?" +
          new URLSearchParams({ q: query, page: page })
      );
      const jsonForm = await response.json();
      setLoading(() => false);
      setDataList((prevDataList) => [...prevDataList, ...jsonForm.docs]);
    } catch (error) {
      console.error(error);
    }
  }, [page, query]);

  useEffect(() => {
    if (query) {
      apiTrigger();
    } else {
      setDataList([]);
    }
  }, [apiTrigger, query]);

  return { dataList, apiTrigger, loading };
};

export default useApiCall;
