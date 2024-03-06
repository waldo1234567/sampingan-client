import React, { useEffect, useState } from "react";
import { fetchDraftById, updateDraft, postSelectedArticle, deleteDraft } from "../Api/fetchData";
import { useLayout } from "../LayoutContext/LayoutContext";
import DropZoneComponent from "./DropzoneComponent";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DraftFormComponent = ({ passedData }) => {
    const { categories, setFetchTrigger } = useLayout();
    const [draftData, setDraftData] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        id_category: null,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDraftById(passedData);
                setDraftData(data[0]);
                setFormData({
                    title: data[0].title || '',
                    content: data[0].content || '',
                    id_category: data[0].id_category || null,
                });
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [passedData]);

    const handleSave = async () => {
        try {
            await updateDraft(draftData.id, formData);
            toast.success('Your Draft has Been Updated');
            console.log("update successfull");
        } catch (error) {
            toast.error('Error Updating your draft');
            console.log(error, "===> something wong");
        }
    }

    const handlePost = async () => {
        try {
            await postSelectedArticle(draftData.id);
            setFetchTrigger(prev => !prev);
            toast.success('Your Draft has been Posted');
            console.log("post success!");
        } catch (error) {
            toast.error('Error posting your draft');
            console.log(error, "===> somthing wong on handle post")
        }
    }

    const handleDelete = async () => {
        try {
            await deleteDraft(draftData.id);
            setFetchTrigger(prev => !prev);
            toast.warn('Your Draft has been deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                theme: "colored",
            });
            console.log('draft deleted!');
        } catch (error) {
            toast.error('Error deleting your draft');
            console.log(error, "===> somthing wong on handle delete")
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        console.log(formData);
    };

    return (
        <>
            <h2 className="font-sans font-bold break-normal text-gray-700 px-2 pb-8 text-xl">Draft 1</h2>
            <div id='section1' className="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
                <form className="relative">
                    <div className="md:flex mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                Title
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="form-input border border-gray-400 rounded block w-full focus:bg-white"
                                type="text"
                                name="title"
                                value={formData.title}
                                style={{ width: '90%', padding: 5 }}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="md:flex mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                Categories
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <select
                                name="id_category"
                                className="form-select border border-gray-400 rounded block w-full focus:bg-white"
                                style={{ width: '90%', padding: 5 }}
                                onChange={handleInputChange}
                                value={formData.id_category}
                            >
                                {
                                    categories.map((item) => (
                                        <option key={item.id} value={item.id}>{item.categories_name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="md:flex mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                Text Area
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <textarea
                                className="form-textarea border border-gray-400 rounded block w-full focus:bg-white"
                                name="content"
                                value={formData.content}
                                rows="8"
                                style={{ width: '90%', padding: 5 }}
                                onChange={handleInputChange}
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className="md:flex mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4">
                                Upload Photos
                            </label>
                        </div>
                        <div className="md:w-2/3 flex items-center">
                            {draftData.id && <DropZoneComponent draftId={draftData.id} />}
                        </div>
                    </div>

                    <div className="md:flex justify-end mt-6">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">
                            <button
                                className="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="button"
                                onClick={() => handleSave()}
                            >
                                Save
                            </button>
                            <button
                                className="shadow bg-green-700 hover:bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ml-2"
                                type="button"
                                onClick={() => handlePost()}
                            >
                                Post
                            </button>
                            <button
                                className="shadow bg-red-700 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ml-2"
                                type="button"
                                onClick={() => handleDelete()}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                closeOnClick
            />
        </>
    )
}

export default DraftFormComponent;