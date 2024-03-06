import React, { useEffect, useState } from "react";
import { useLayout } from "../LayoutContext/LayoutContext";
import Card from "./Card";
import Masonry from "@mui/lab/Masonry";
import AccordionComponent from "./AccordionComponent";
import { fetchArticleByCategory } from "../Api/fetchData";
import FilteredCard from "./FilteredCard";
import SkeletonLoader from "./SkeletonLoader";
import SearchBarComponent from "./SearchBarComponent";

const ViewAllArticle = () => {
    const { articleInCategories, setArticleInCategories, isChecked, setIsChecked, allArticle } = useLayout();
    const [selectedCategories, setSelectedCategories] = useState([]);


    const handleCategoriesChange = (categories) => {
        setSelectedCategories(categories);
        setIsChecked(categories.length > 0);
        console.log(articleInCategories, "===> article in categories")
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const datas = await fetchArticleByCategory(selectedCategories);
                console.log(datas[0].data, "====> datas in view all article");
                setArticleInCategories(datas);
            } catch (error) {
                console.log(error);
                throw new error;
            }
        }

        fetchData();
    }, [selectedCategories, setArticleInCategories])

    return (
        <>
            <section id="all-article" className="py-20">
                <SearchBarComponent />
                <div className="max-w-6xl mx-auto flex flex:col md:flex-row gap-6">
                    <div className="flex-grow">
                        {
                            isChecked && articleInCategories ? (
                                <Masonry columns={3} spacing={3}>
                                    <FilteredCard passedData={articleInCategories} />
                                </Masonry>
                            ) : (
                                allArticle ? (
                                    <Masonry columns={3} spacing={3}>
                                        <Card passedData={allArticle} />
                                    </Masonry>
                                )
                                    : (
                                        <Masonry columns={3} spacing={3}>
                                            <SkeletonLoader />
                                        </Masonry>
                                    )
                            )
                        }
                    </div>
                    <div className="w-full md:w-1/3">
                        <div className="sticky top-10">
                            <AccordionComponent onCategoriesChange={handleCategoriesChange} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ViewAllArticle;