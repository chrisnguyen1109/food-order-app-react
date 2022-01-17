import { useContext, useState, useCallback, useRef, useEffect } from 'react';
import Context from './Context';

export const useCart = () => {
    return useContext(Context);
};

export const useFetch = () => {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchMeals = useCallback(async ({ url, method = 'GET', ...options }, cb) => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method,
                ...options,
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            cb(data);
        } catch (e) {
            setErrorMsg(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, errorMsg, fetchMeals };
};

export const useFirstMount = (cb, ...deps) => {
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        cb();
    }, [...deps]);
};
