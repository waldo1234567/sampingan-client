import React, { useState, useEffect } from "react";
import { useLayout } from "../LayoutContext/LayoutContext";
import { latestArticles } from "../Api/fetchData";
import Card from "./Card";
import SkeletonLoader from "./SkeletonLoader";
import Masonry from "@mui/lab/Masonry";

const ViewLatestComponent = () => {
    const { latestArticle, setLatestArticle } = useLayout();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await latestArticles();
                if (!data) {
                    return (<h2>Something went wrong!</h2>)
                } else {
                    setLatestArticle(data);
                }
            } catch (error) {
                console.log(error, "===> error in latest article");
            }
        }

        fetchData();

    }, [])

    return (
        <>
            {console.log(latestArticle)}
            <section id="latest-article" className="py-20">
                <div className="max-w-5xl mx-auto flex flex:col md:flex-row gap-4">
                    <div className="flex-grow">
                        {
                            latestArticle ? (
                                <Masonry columns={3} spacing={2}>
                                    <Card passedData={latestArticle} />
                                </Masonry>
                            ) : (
                                <Masonry columns={3} spacing={2}>
                                    <SkeletonLoader />
                                </Masonry>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default ViewLatestComponent;