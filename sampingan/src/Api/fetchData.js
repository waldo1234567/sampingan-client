import axios from 'axios';

export const fetchArticle = async () => {
    try {
        const response = await axios.get('http://localhost:3000/article/all-article');
        // console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchArticleImages = async (articleId) => {
    try {
        const response = await axios.get(`http://localhost:3000/article/get-images-by-id/${articleId}`);
        // console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchArticleById = async (articleId) => {
    try {
        const response = await axios.get(`http://localhost:3000/article/get-by-id/${articleId}`);
        // console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchArticleByCategory = async (categoryIds) => {
    let categoryIdsString;
    try {
        if (categoryIds.length === 0) {
            categoryIdsString = ':ids'
        } else {
            categoryIdsString = categoryIds.join(',');
        }
        console.log(categoryIdsString, "===> cek id in fetch article by category");
        const response = await axios.post(`http://localhost:3000/article/sort-by-categories/${categoryIdsString}`);
        console.log(response.data.data, "===> all article punya fetchArticle by category");
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchCategories = async () => {
    try {
        const response = await axios.get('http://localhost:3000/category/get-all');
        // console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchDraftByWriterId = async (writerId) => {
    try {
        const response = await axios.get(`http://localhost:3000/draft/get-by-writer-id/${writerId}`);
        // console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchDraftById = async (draftId) => {
    try {
        const response = await axios.get(`http://localhost:3000/draft/get-by-id/${draftId}`);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const addNewDraft = async (writerId) => {
    try {
        const response = await axios.post(`http://localhost:3000/draft/new-draft`, { writerId });
        console.log(response.data.data);
        return response.data.data;
    } catch (error) {
        console.log(error)
    }
}

export const updateDraft = async (draftId, updatedData) => {
    try {
        await axios.patch(`http://localhost:3000/draft/update-draft/${draftId}`, updatedData);
    } catch (error) {
        console.log(error);
    }
}

export const deleteDraft = async (draftId) => {
    try {
        await axios.patch(`http://localhost:3000/draft/delete-draft/${draftId}`);
    } catch (error) {
        console.log(error);
    }
}

export const updateDraftImages = async (draftId, updatedData) => {
    try {
        const upload = await axios.patch(`http://localhost:3000/draft/update-draft-images/${draftId}`, updatedData);
        console.log(upload);
    } catch (error) {
        console.log(error)
    }
}

export const deleteDraftImages = async (imageId) => {
    try {
        const remove = await axios.delete(`http://localhost:3000/draft/delete-draft-images/${imageId}`);
        console.log(remove);
    } catch (error) {
        console.log(error);
    }
}

export const fetchDraftImagesById = async (draftId) => {
    try {
        const response = await axios.get(`http://localhost:3000/draft/get-images-by-id/${draftId}`);
        console.log(response)
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const postSelectedArticle = async (draftId) => {
    try {
        await axios.post(`http://localhost:3000/draft/post-draft/${draftId}`);
        console.log("success posting article");
    } catch (error) {
        console.log(error, "==> error posting draft");
    }
}

export const getGarbageBinJoinedData = async (writerId) => {
    try {
        const response = await axios.get(`http://localhost:3000/draft/garbage-joined-data/${writerId}`);
        console.log(response, "===> joined data");
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const retrieveFromGarbage = async (draftId) => {
    try {
        await axios.patch(`http://localhost:3000/draft/retrieve-from-garbage/${draftId}`);
        console.log('success retrieve draft');
    } catch (error) {
        console.error(error, "===> error retrieving draft");
    }
}

export const permanentDelete = async (draftId) => {
    try {
        await axios.delete(`http://localhost:3000/draft/permanent-delete/${draftId}`);
        console.log("success permanently delete draft");
    } catch (error) {
        console.log(error, "==> error deleting draft");
    }
}

export const getAllStatus = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/draft/get-all-status`);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error, "===> error fetching status");
    }
}

export const latestArticles = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/article/sort-by-date`);
        console.log(response);
        return response.data.data;
    } catch (error) {
        
    }
}