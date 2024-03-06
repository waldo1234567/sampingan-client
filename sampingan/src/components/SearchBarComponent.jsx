import React, { useState} from 'react';
import { useLayout } from '../LayoutContext/LayoutContext';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { Link } from 'react-router-dom';

const SearchBarComponent = () => {
    const { allArticle } = useLayout();
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const fetchData = async (value) => {
        try {
            const filteredResult = await allArticle.filter((item) => {
                const lowerCaseTitle = item.title.toLowerCase();
                const toLowerCaseContent = item.content.toLowerCase();
                const toLowerCaseSearch = value.toLowerCase();

                return lowerCaseTitle.includes(toLowerCaseSearch) || toLowerCaseContent.includes(toLowerCaseSearch);
            })

            setSearchResult(value === '' ? [] : filteredResult);
        } catch (error) {
            console.log(error, "===> error in search");
        }
    }

    const handleChange = (value) => {
        setSearch(value)
        fetchData(value)
    }

    return (
        <>
            {console.log(typeof search)}
            <div className='max-w-xl mx-auto flex justify-center mt-4 mb-6 relative'>
                <div className="relative flex items-center text-gray-600">
                    <input
                        type='search'
                        placeholder='Search article ...'
                        className='h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full'
                        value={search}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                    <button
                        type='submit'
                        className='absolute right-0 top-0 mt-2 mr-4 '
                    >
                        <SearchSharpIcon className='h-4 w-4 fill-current' />
                    </button>
                </div>
                {search !== "" && (
                    <div className='absolute left-0 right-0 bg-white rounded-md mt-12 overflow-hidden z-50 p-4 shadow-md '>
                        {
                            searchResult.map((item, index) => (
                                <div className='flex items-center block hover:bg-gray-400'>
                                    <Link key={index} to={`/article/${item.id}`} className='flex items-center space-x-2'>
                                        <SearchSharpIcon/>
                                        <p className='text-sm p-2'>{item.title}</p>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
        </>
    )
}

export default SearchBarComponent;
