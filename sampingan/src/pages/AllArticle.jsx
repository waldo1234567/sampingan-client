import React from "react";
import Header from "../components/Header";
import ViewAllArticle from "../components/ViewAllArticle";

const AllArticle = () => {
    return (
        <>
            <body className="bg-gradient-to-br from-gray-100 via-gray-300 to-orange-200">
                <Header />
                <div className="min-h-screen">
                    <ViewAllArticle />
                </div>
            </body>
        </>
    )
}

export default AllArticle;