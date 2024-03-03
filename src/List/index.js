import { useEffect } from "react";
import styles from "./styles.module.css";

function List({ dataList = [], loading = false, setPage = () => {}, apiTrigger = () => {} }) {
    const val =
    window.innerHeight + document.documentElement.scrollTop ===
    document.documentElement.offsetHeight;

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    setPage((prev) => prev + 1);
    apiTrigger();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, val]);

  return (
    <div className={styles.container}>
      {(dataList || []).map((item) => (
        <div key={item?.key} className={styles.content}>{item?.title}</div>
      ))}
      {loading ? <h1>LOADING</h1> : null}
    </div>
  );
}

export default List;
