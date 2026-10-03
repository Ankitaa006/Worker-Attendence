import { useCallback, useEffect, useState } from "react";
import api from "./api";

const useApiData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState(0);

  const refresh = useCallback(() => {
    setLoading(true);
    setError("");
    setRequestId((value) => value + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    api
      .get(url, { signal: controller.signal })
      .then((response) => {
        setData(response.data?.data ?? null);
      })
      .catch((requestError) => {
        if (requestError.code !== "ERR_CANCELED") {
          setError(
            requestError.response?.data?.message ||
              requestError.message ||
              "Unable to load data.",
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [url, requestId]);

  return { data, loading, error, refresh };
};

export default useApiData;
