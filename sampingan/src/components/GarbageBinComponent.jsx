import React, { useEffect, useState } from "react";
import { useLayout } from "../LayoutContext/LayoutContext";
import { getGarbageBinJoinedData, retrieveFromGarbage, permanentDelete } from "../Api/fetchData";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GarbageBinComponent = ({ handleRetrieveDraft }) => {
    const { isGarbageBinOpen, setIsGarbageBinOpen } = useLayout();
    const [garbageData, setGarbageData] = useState([]);

    const handleClose = () => {
        setIsGarbageBinOpen(false);
    }

    const handleRetrieve = async (draftId) => {
        try {
            await retrieveFromGarbage(draftId);
            const updatedData = await getGarbageBinJoinedData(1);
            setGarbageData(updatedData);
            toast.success('This Draft has been retrieved');
            handleRetrieveDraft(draftId);
        } catch (error) {
            toast.error('Error retrieving your draft');
            console.log(error, "===> error from retrieve draft");
        }
    }

    const handleDelete = async (draftId) => {
        try {
            await permanentDelete(draftId);
            const updatedData = await getGarbageBinJoinedData(1);
            setGarbageData(updatedData);
            toast.info('This Draft has been deleted');
        } catch (error) {
            toast.error('Error deleting your draft');
            console.log(error, "===> error deleting draft");
        }
    }

    const truncateContent = (content, maxLength) => {
        if (content.length > maxLength) {
            return content.substring(0, maxLength) + '...';
        } else {
            return content;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getGarbageBinJoinedData(1);
                console.log(data, "===> cek garbage bin");
                setGarbageData(data);
            } catch (error) {
                console.log(error, "===> error get garbage")
            }
        }

        fetchData();
    }, [])
    return (
        <>
            <div className="max-w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-4">
                <div className="p-8 relative">
                    <button className="absolute top-4 right-4" onClick={handleClose}>
                        <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <h2 className="text-lg font-semibold text-gray-900 mb-5">Deleted Draft</h2>
                    {garbageData.length === 0 ? (
                        <p className="text-gray-600">No deleted drafts found.</p>
                    ) : (
                        <div className="relative">
                            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <colgroup>
                                        <col style={{ width: '25%' }} />
                                        <col style={{ width: '50%' }} />
                                        <col style={{ width: '25%' }} />
                                        <col style={{ width: '12.5%' }} />
                                        <col style={{ width: '12.5%' }} />
                                    </colgroup>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Title
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Content
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Deleted at
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                <span class="sr-only">Retrieve</span>
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                <span class="sr-only">Delete</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    {garbageData.map((item) => (
                                        <tbody>
                                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {item.title}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {truncateContent(item.content, 70)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.deleted_at}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button onClick={() => handleRetrieve(item.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Retrieve</button>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button onClick={() => handleDelete(item.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                closeOnClick
            />
        </>
    )
}

export default GarbageBinComponent;