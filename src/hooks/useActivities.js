import { useState, useEffect } from 'react';
// Fallback data in case server isn't running
import fallbackData from '../data/activities.json';

const useActivities = (category) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/activities')
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(json => {
                if (category && json[category]) {
                    setData(json[category]);
                } else {
                    setData(json);
                }
                setLoading(false);
            })
            .catch(err => {
                console.warn("Failed to fetch from backend, using fallback data:", err);
                // Use fallback data if server is not reachable, so app still works for demo
                if (category && fallbackData[category]) {
                    setData(fallbackData[category]);
                } else {
                    setData(fallbackData);
                }
                setLoading(false);
                // We don't set error to avoid blocking UI, just warn
            });
    }, [category]);

    return { data, loading, error };
};

export default useActivities;
