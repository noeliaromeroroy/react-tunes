import { useState, useEffect, useContext } from 'react';
import { searchPodcasts } from '../../infrastructure/services/ITunesPodcastService';
import { usePlayerContext } from '../contexts/PlayerContext';

export const useSearchLogic = () => {
    const {
        setResults,
        setFilteredResults,
        searchTerm,
    } = usePlayerContext();

    const [page, setPage] = useState(1);

    const loadMore = async () => {
        try {
            const podcasts = await searchPodcasts(searchTerm, 10, page);
            setFilteredResults((prevItems) => [...prevItems, ...podcasts]);
            setResults((prevItems) => [...prevItems, ...podcasts]);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Error loading more podcasts:", error);
        }
    };

    useEffect(() => {
        const callSearch = async () => {
            if (searchTerm) {
                const podcasts = await searchPodcasts(searchTerm, 10, 0);
                setFilteredResults(podcasts);
                setResults(podcasts);
            }
        };
        callSearch();
    }, [searchTerm]);

    return { loadMore };
};
