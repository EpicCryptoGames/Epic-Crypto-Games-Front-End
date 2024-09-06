import { getAPI } from "@/utils/api";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function useMountGet<T>({
  apiUrl,
  title,
}: {
  apiUrl: string;
  title: string;
}) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        const res = await getAPI<T>({ route: apiUrl, signal });
        if (res) {
          setIsLoading(false);
          setData(() => res);
        }
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setIsError(true);
          console.error("Fetch error:", err);
        }
      }
    }

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return { data, setData, isLoading, isError };
}

export function useMountReactQuery<T>({
  cacheKey,
  staleTime,
  apiUrl,
}: {
  cacheKey: string;
  staleTime: number;
  apiUrl: string;
}) {
  async function getData() {
    try {
      return await getAPI<T>({ route: apiUrl });
    } catch (error) {
      throw error;
    }
  }
  const { data, isLoading, isError, error } = useQuery(cacheKey, getData, {
    staleTime,
  });
  if (isError) {
    console.error("error is: ", error);
  }
  return { data, isLoading, isError };
}
