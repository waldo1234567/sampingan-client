import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import UploadIcon from '@mui/icons-material/Upload';
import { updateDraftImages, deleteDraftImages, fetchDraftImagesById } from "../Api/fetchData";

const DropZoneComponent = ({ draftId }) => {
    const [files, setFiles] = useState([]);

    const extractNameFromUrl = (imageUrl) => {
        const regex = /\/([^\/]+)$/;
        const match = imageUrl.match(regex);

        const result = match ? match[1] : null;

        return result;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDraftImagesById(draftId);
                console.log(draftId, "props on dropzone");
                console.log(data, "data on dropzone component");
                setFiles(data);
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [draftId]);

    const onDrop = useCallback((acceptedFiles) => {
        uploadFiles(acceptedFiles, draftId);
    }, [draftId]);

    const removeFile = async (imageId) => {
        try {
            await deleteDraftImages(imageId);
            const updatedFiles = files.filter((file) => file.id !== imageId);
            setFiles(updatedFiles);
        } catch (error) {
            console.log(error);
        }

    };


    const uploadFiles = async (acceptedFiles,draftId) => {
        try {
            const formData = new FormData();
            acceptedFiles.forEach((file) => {
                formData.append('photos', file)
            });

            const upload = await updateDraftImages(draftId, formData);
            console.log(draftId, "===> draftId in dropzone component");
            console.log(upload, "==> upload function in dropzone");

            const fetchRecent = await fetchDraftImagesById(draftId);
            setFiles(fetchRecent);
        } catch (error) {
            console.log(error);
        }
    }


    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
        accept: 'image/png, image/jpg, image/jpeg'
    })

    return (
        <>
            <div className="dropzone mt-6 mb-6 border-dashed border-2 border-gray-400 rounded">
                <div {...getRootProps()} className="flex items-center p-8" >
                    <input {...getInputProps()} />
                    <UploadIcon className="w-15 h-15 text-black mr-2" />
                    <p className="text-gray-600">Drag 'n' drop some files here, or click to select files</p>
                </div>
                {files && files.length > 0 && (
                    <ul>
                        {files.map((file) => (
                            <li key={file.id} className="flex justify-between items-center">
                                <span>{file.image_url ? extractNameFromUrl(file.image_url) : ''}</span>
                                <a onClick={() => removeFile(file.id)}>X</a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </>
    )
}

export default DropZoneComponent;