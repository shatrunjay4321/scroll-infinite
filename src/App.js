import { useState, useEffect } from "react";
import List from "./List";
import styles from "./styles.module.css";
import useApiCall from "./hooks/useApiCall";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  console.log("page: ", page);
  const {
    dataList = [],
    apiTrigger = () => {},
    loading = false,
  } = useApiCall({ query, page, setPage });

  return (
    <div className={styles.App}>
      <input
        type="text"
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
      />
      <List dataList={dataList} loading={loading} setPage={setPage} apiTrigger={apiTrigger} />
    </div>
  );
}

export default App;
