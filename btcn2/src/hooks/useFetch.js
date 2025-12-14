import { useState, useEffect, useCallback } from "react";

/**
 * useFetch - Custom hook for fetching data from API
 * Theo cấu trúc src/hooks trong README
 * 
 * @param {Function} fetchFunction - Async function để gọi API
 * @param {Array} dependencies - Dependencies cho useEffect
 * @returns {{ data: any, isLoading: boolean, error: string|null, refetch: Function }}
 */
export function useFetch(fetchFunction, dependencies = []) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await fetchFunction();
            setData(result);
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [fetchFunction]);

    useEffect(() => {
        fetchData();
    }, dependencies);

    return { data, isLoading, error, refetch: fetchData };
}

export default useFetch;
