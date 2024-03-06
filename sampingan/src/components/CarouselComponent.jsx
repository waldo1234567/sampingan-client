import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { fetchArticleImages } from "../Api/fetchData";
import { useLayout } from "../LayoutContext/LayoutContext";

const CarouselComponent = ({ articleId }) => {
    const { imageArticle, setImageArticle } = useLayout();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const image = await fetchArticleImages(articleId);
                const parsedImage = image.map(item => {
                    const parsedUrl = JSON.parse(item.image_url).image_url;
                    return {...item ,image_url: parsedUrl};
                })
                setImageArticle(parsedImage);  
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        if (articleId) {
            fetchImage();
        }
    }, [articleId])

    return (
        <>
            {console.log(imageArticle)}
            <div className="max-w-screen-lg mx-auto mt-4">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 5000 }}
                >
                    {
                        imageArticle.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="relative">
                                    <img src={item.image_url}
                                        className="w-full h-auto object-cover"
                                        alt="let there be mage"
                                        loading="lazy"
                                        />
                                    <p className="legend absolute bottom-0 left-0 p-2 bg-gray-800 text-white opacity-75">Tess</p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </>
    )
}

export default CarouselComponent;
