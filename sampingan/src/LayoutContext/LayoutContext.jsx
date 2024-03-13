import { React, createContext, useContext, useEffect, useState } from 'react';
import { fetchArticle, fetchCategories,getAllStatus } from '../Api/fetchData';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [allArticle, setAllArticle] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState([]);
    const [imageArticle, setImageArticle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isHomePage, setIsHomePage] = useState(false);
    const [isAllArticlePage, setIsAllArticlePage] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [articleInCategories, setArticleInCategories] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const [isGarbageBinOpen,setIsGarbageBinOpen] = useState(false);
    const [isHistoryOpen,setIsHistoryOpen] = useState(false);
    const [draftsStatus,setDraftsStatus] = useState([]);
    const [latestArticle,setLatestArticle] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 3000))
                const data = await fetchArticle();
                const category = await fetchCategories();
                const draft_status = await getAllStatus();

                setAllArticle(data);
                setCategories(category);
                setDraftsStatus(draft_status);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const contextValue = {
        allArticle,
        setAllArticle,
        selectedArticle,
        setSelectedArticle,
        imageArticle,
        setImageArticle,
        isLoading,
        setIsLoading,
        isHomePage,
        setIsHomePage,
        isAllArticlePage,
        setIsAllArticlePage,
        filteredData,
        setFilteredData,
        categories,
        setCategories,
        articleInCategories,
        setArticleInCategories,
        isChecked,
        setIsChecked,
        fetchTrigger,
        setFetchTrigger,
        isGarbageBinOpen,
        setIsGarbageBinOpen,
        isHistoryOpen,
        setIsHistoryOpen,
        draftsStatus,
        setDraftsStatus,
        latestArticle,
        setLatestArticle,
        
    }

    return (
        <LayoutContext.Provider value={contextValue}>
            {children}
        </LayoutContext.Provider>
    )
}

export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
}