import {  useState } from "react";

export default function deteksi() {
  const [data, setData] = useState<string>("Loading...");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000");
        const json = await res.json();
        setData(json.message);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData("Failed to connect to backend");
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
}
