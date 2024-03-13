import { Link } from "react-router-dom";
import "../css/index.css"
import Image from "./Image";
import { useLayout } from "../LayoutContext/LayoutContext";
import SkeletonLoader from "./SkeletonLoader";
import { useEffect } from "react";


const Card = ({ passedData }) => {
    const { isLoading, setIsHomePage, setIsAllArticlePage, isHomePage, isAllArticlePage, isChecked } = useLayout();

    useEffect(() => {
        const pathName = window.location.pathname;
        setIsAllArticlePage(pathName === '/article/all-article');
        setIsHomePage(pathName === '/home');
    }, [])

    return (
        <>
            {
                passedData.map((item, index) => {
                    const truncatedContent = item.content.length > 150 ? item.content.slice(0, 150) + '...' : item.content;
                    return (
                        <div key={item.id}>
                            {
                                isLoading ? (
                                    <SkeletonLoader />
                                )
                                    : (
                                        isAllArticlePage ? (
                                            <>
                                                <div class="relative group">
                                                    <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 blur duration-400 group-hover:opacity-100 group-hover:duration-200">
                                                    </div>
                                                    <a href={`/article/${item.id}`} class="cursor-pointer">
                                                        <div className="relative p-6 space-y-6 bg-slate-800 rounded-lg">
                                                            <div class="flex items-center space-x-4">
                                                                <Image articleId={item.id} />
                                                            </div>
                                                            <div>
                                                                <h3 class="text-lg font-semibold text-white">{item.title}</h3>
                                                            </div>
                                                            <p class="leading-normal text-gray-300 text-md">{truncatedContent}</p>
                                                            <Link to={`/article/${item.id}`} className="text-blue-500"> Read More </Link>
                                                        </div>
                                                    </a>
                                                </div>
                                            </>

                                        ) : (
                                            isHomePage && index < 6 && (
                                                <div key={item.id} className="w-72 mb-8">
                                                    <div className="max-w-xs rounded overflow-hidden shadow-lg">
                                                        <div className="px-6 py-8">
                                                            <Image articleId={item.id} />
                                                            <div className="font-bold text-xl mb-4 mt-4">{item.title}</div>
                                                            <p className="text-gray-700 text-base mb-4">{truncatedContent}</p>
                                                            <Link to={`/article/${item.id}`} className="text-blue-500"> Read More </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    )
                            }
                        </div>
                    )
                })
            }
        </>
    )
}

export default Card;