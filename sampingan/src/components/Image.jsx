import "../css/index.css"
import React, { useState, useEffect } from 'react';
import { fetchArticleImages } from "../Api/fetchData";
import { useLayout } from "../LayoutContext/LayoutContext";

const Image = ({ articleId }) => {
    const { isHomePage, setIsHomePage, isAllArticlePage, setIsAllArticlePage } = useLayout();

    const [articleImages, setArticleImages] = useState([]);
    useEffect(() => {
        const pathName = window.location.pathname;
        const fetchImages = async () => {
            if (articleId) {
                try {
                    const data = await fetchArticleImages(articleId);
                    setArticleImages(data);

                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }

            setIsHomePage(pathName === '/home');
            setIsAllArticlePage(pathName === '/article/all-article');
        };

        fetchImages();
    }, [articleId]);



    return (
        <>
            {console.log(articleImages)}
            <div className="w-full">
                {
                    articleImages.length > 0 && (
                        <>
                            {
                                isHomePage || isAllArticlePage ? (
                                    <img
                                        src={articleImages.length > 0 ? JSON.parse(articleImages[0].image_url).image_url : 'placeHolder.jpg'}
                                        alt="let there be image!"
                                        className={
                                            isHomePage ? (
                                                "h-40 w-full object-cover"
                                            ) : (
                                                "w-full h-full object-cover object-center"
                                            )
                                        }
                                        loading="lazy"
                                    />
                                ) : (
                                    <img
                                        key={articleImages.id}
                                        src={JSON.parse(articleImages[0].image_url).image_url}
                                        alt="let there be image"
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                )
                            }
                        </>
                    )
                }
            </div>
        </>
    )
}

export default Image;