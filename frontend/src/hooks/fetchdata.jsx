import { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/profile`,{},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        console.log("Fetched data:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
 
  //console.log("Data state:", data);
  // The hook should return values here!
  return [data, loading];
};

export default useFetchData;
