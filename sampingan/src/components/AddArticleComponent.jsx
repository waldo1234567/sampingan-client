import React, { useState, useEffect } from "react";
import { fetchDraftByWriterId, addNewDraft, retrieveFromGarbage } from "../Api/fetchData";
import DraftFormComponent from "./DraftFormComponent";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useLayout } from "../LayoutContext/LayoutContext";
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import GarbageBinComponent from "./GarbageBinComponent";
import HistoryComponent from "./HistoryComponent";
import HistorySharpIcon from '@mui/icons-material/HistorySharp';


const AddArticleComponent = () => {
    const {
        fetchTrigger,
        setFetchTrigger,
        isGarbageBinOpen,
        setIsGarbageBinOpen,
        isHistoryOpen,
        setIsHistoryOpen } = useLayout();

    const [draftData, setDraftData] = useState([]);
    const [selectedDraftId, setSelectedDraftId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDraftByWriterId(1);
                const filteredData = data.filter(draft => draft.id_status !== 3 && draft.id_status !== 4);
                console.log(filteredData, "===> filtered data on add article");
                setDraftData(filteredData);
                if (data.length > 0) {
                    setSelectedDraftId(filteredData[0].id);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [fetchTrigger]);

    const handleDraftIdClick = (draftId) => {
        setSelectedDraftId(draftId);
        console.log(selectedDraftId, "===> tes klik");
    };

    const handleNewDraft = async (writerClickId) => {
        try {
            const newDraft = await addNewDraft(writerClickId);
            console.log(newDraft, "===> tes click new draft");
            setFetchTrigger(prev => !prev);
        } catch (error) {
            console.log(error);
        }

    };

    const handleRetrieveDraft = async (retrievedDraftId) => {
        try {
            await retrieveFromGarbage(retrievedDraftId);
            setFetchTrigger(prev => !prev);
        } catch (error) {
            console.log(error, "===> error retrieve draft");
        }
    }

    return (
        <>
            {console.log(isGarbageBinOpen, "===> cek garbage bin")}
            <body class="bg-gray-100 text-gray-900 tracking-wider leading-normal">
                <div className="container w-full flex flex-wrap mx-auto px-2 pt-8 lg:pt-16 mt-16">
                    <div className="w-full lg:w-1/5">
                        <div className="w-full sticky inset-0 hidden max-h-96 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20" id="menu-content">
                            <p className="text-base font-bold py-2 lg:pb-6 text-gray-700">Drafts</p>
                            <div className="block lg:hidden sticky inset-0">
                                <button id="menu-toggle" className="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-yellow-600 appearance-none focus:outline-none">
                                    <svg class="fill-current h-3 float-right" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </button>
                            </div>
                            <ul className="list-reset py-2 md:py-0">
                                {
                                    draftData.map((draft, index) => (
                                        <li key={index} className={`py-1 md:my-2 ${selectedDraftId === draft.id ? 'hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent font-bold border-yellow-600' : ''}`}>
                                            <a href={`#section ${index + 1}`} className="block pl-4 align-middle text-gray-700 no-underline hover:text-yellow-600" onClick={() => handleDraftIdClick(draft.id)}>
                                                <span className="pb-1 md:pb-0 text-sm">Draft {index + 1}</span>
                                            </a>
                                        </li>
                                    ))
                                }
                                <div className="flex flex-col mr-8">
                                    <button fontfamily="Arial"
                                        type="button"
                                        className="hover:bg-gray-200 flex border-dashed border-2 border-gray-700 bg-whitetext-indigo-700 items-center px-4 py-2 rounded-md text-sm font-medium"
                                        style={{ borderWidth: '2px' }}
                                        onClick={() => handleNewDraft(1)}
                                    >
                                        <NoteAddIcon style={{ color: 'black' }} className="w-6 h-6 text-indigo-700 mr-2" viewbox="0 0 24 24" fill="none"
                                            pointer-events="none" />
                                        Create New Draft
                                    </button>
                                    <button
                                        fontfamily="Arial"
                                        type="button"
                                        className="hover:bg-gray-200 flex border-2 border-gray-400 bg-white items-center px-4 py-2 rounded-md text-sm font-medium mt-2"
                                        onClick={() => setIsGarbageBinOpen(!isGarbageBinOpen)}
                                    >
                                        <DeleteOutlineSharpIcon style={{ color: 'gray' }} className="w-6 h-6 mr-2" viewbox="0 0 24 24" fill="none"
                                            pointer-events="none" />
                                        Garbage Bin
                                    </button>
                                    <button
                                        fontfamily="Arial"
                                        type="button"
                                        className="hover:bg-gray-200 flex border-2 border-gray-400 bg-white items-center px-4 py-2 rounded-md text-sm font-medium mt-2"
                                        onClick={()=> setIsHistoryOpen(!isHistoryOpen)}
                                    >
                                        <HistorySharpIcon style={{ color: 'gray' }} className="w-6 h-6 mr-2" viewbox="0 0 24 24" fill="none"
                                            pointer-events="none" />
                                        History
                                    </button>
                                </div>
                            </ul>
                        </div>
                    </div>
                    {
                        isGarbageBinOpen && (
                            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                                <GarbageBinComponent handleRetrieveDraft={handleRetrieveDraft} />
                            </div>
                        )
                    }
                    {
                        isHistoryOpen && (
                                <HistoryComponent/>
                        )
                    }
                    <section className="w-full lg:w-4/5">
                        {selectedDraftId !== null && <DraftFormComponent passedData={selectedDraftId} />}
                    </section>
                </div>
            </body>
        </>
    )
}

export default AddArticleComponent;