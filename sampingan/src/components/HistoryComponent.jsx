import React, { useEffect, useState } from "react";
import { useLayout } from "../LayoutContext/LayoutContext";
import { fetchDraftByWriterId } from "../Api/fetchData";

const HistoryComponent = () => {
    const { setIsHistoryOpen, categories, draftsStatus } = useLayout();
    const [historyData, setHistoryData] = useState([]);

    const handleClose = () => {
        setIsHistoryOpen(false);
    }

    const truncateContent = (content, maxLength) => {
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + '...';
        } else {
            return content;
        }
    }

    const showCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id == categoryId);
        return category ? category.categories_name : 'unknown category';
    }

    const showStatus = (statusId) => {
        const status = draftsStatus.find(sts => sts.id == statusId);
        return status ? status.name : 'unknown status';
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDraftByWriterId(1);
                setHistoryData(data);
            } catch (error) {
                console.log(error);
            }
        }
        console.log(categories);
        fetchData();
    }, [])

    return (
        <>
            <div className="fixed top-0 left-0 w-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 h-full">
                <div className="max-w-full mx-auto bg-white rounded-xl shadow-md md:max-w-4xl mt-4 h-full overflow-hidden">
                    <div className="p-8 relative h-full overflow-y-scroll">
                        <button className="absolute top-4 right-4" onClick={handleClose}>
                            <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-lg font-semibold text-gray-900 mb-5">History</h2>
                        {
                            historyData.length === 0 ? (
                                <p className="text-gray-600">Empty</p>
                            ) : (

                                <div className="shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="px-6 py-3">
                                                    Title
                                                </th>
                                                <th scope="col" class="px-8 py-3">
                                                    Content
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Category
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                historyData.map((item, index) => (

                                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                            {item.title}
                                                        </td>
                                                        <td className="px-8 py-4">
                                                            {truncateContent(item.content, 70)}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {showCategoryName(item.id_category)}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {showStatus(item.id_status)}
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </>
    )
};

export default HistoryComponent;