import React from "react";
import ArticleComponent from "../components/ArticleComponent";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

const Article = () => {
    const {articleId} = useParams();
    return (
        <>
            <div className="bg-gradient-to-tr from-amber-100 via-gray-200 to-stone-400">
                <Header/>
                <div className="font-body">
                    {console.log(articleId, "===> dari article component")}
                    <ArticleComponent passedId={articleId}/>
                </div>
            </div>
        </>
    )
}

export default Article;