import Image from "./Image";
import { useLayout } from "../LayoutContext/LayoutContext";
import SkeletonLoader from "./SkeletonLoader";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const FilteredCard = ({ passedData }) => {
    const { isLoading, setIsHomePage, setIsAllArticlePage, isHomePage, isAllArticlePage } = useLayout();
    function truncatedContent(content, maxLength) {
        if (content.length > maxLength) {
            return content.slice(0, maxLength) + '...';
        } else {
            return content;
        }
    }

    if (!passedData[0].data || passedData[0].data.length === 0) {
        return (
            <>
                {console.log(passedData[0].data, "===> props fi filtered card!")}
                <h2>Oops, no data available.</h2>
            </>
        );
    }
    return (
        <>
            {
                passedData.map((item, index) => (
                        item.data.map((dataItem) => (
                            <>
                                <div key={dataItem.id} class="relative group">
                                    <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                    </div>
                                    <a href={`/article/${dataItem.id}`} class="cursor-pointer">
                                        <div className="relative p-6 space-y-6 bg-slate-800 rounded-lg">
                                            <div class="flex items-center space-x-4">
                                                <Image articleId={dataItem.id} />
                                            </div>
                                            <div>
                                                <h3 class="text-lg font-semibold text-white">{dataItem.title}</h3>
                                            </div>
                                            <p class="leading-normal text-gray-300 text-md">{truncatedContent(dataItem.content, 150)}</p>
                                            <Link to={`/article/${dataItem.id}`} className="text-blue-500"> Read More </Link>
                                        </div>
                                    </a>
                                </div>
                            </>

                        ))
                ))

            }
        </>
    )
}

export default FilteredCard