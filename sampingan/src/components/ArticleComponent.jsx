import React, { useEffect } from "react";
import { useLayout } from "../LayoutContext/LayoutContext";
import { fetchArticleById } from "../Api/fetchData";
import CarouselComponent from "./CarouselComponent";
import '../css/article.css';
import SkeletonLoader from "./SkeletonLoader";



const ArticleComponent = ({passedId}) => {
    const { selectedArticle, setSelectedArticle } = useLayout();
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataNow = await fetchArticleById(passedId);
                // console.log(dataNow,"===> data selected article")
                setSelectedArticle(dataNow[0]);
                
            } catch (error) {
                console.error(error, "==> error fetching data");
            }
        }

        if(passedId){
            fetchData();
        }
    }, [passedId]);

    function formatDate(isoDateString) {
        const tanggal = new Date(isoDateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        return tanggal.toLocaleDateString('en-us', options);
    }

    return (
        <>
            <div className="container mx-auto mt-8 max-w-screen-lg">
                {
                    selectedArticle ?
                        (
                            <div className="bg-white rounded-lg shadow-md p-8">
                                <CarouselComponent articleId={selectedArticle.id} />
                                <h1 className="text-3xl font-bold mb-6">{selectedArticle.title}</h1>
                                <p className="text-gray-600 mb-6">Posted on : {formatDate(selectedArticle.updated_at)}</p>
                                <div className="prose mb-11">
                                    {selectedArticle.content && selectedArticle.content.split('\n').map((paragraph,index) => (
                                        <div key={index} className="mb-4">
                                            {paragraph}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                           <SkeletonLoader/>
                        )
                }
            </div>
        </>
    )
}

export default ArticleComponent;