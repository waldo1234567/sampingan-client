import "../css/index.css"
import Card from "../components/Card";

const CardArticleHome = ({ passedData }) => {

    return (
        <>
           
            <div className="flex justify-center items-center h-full">
                <div className="grid grid-cols-3 gap-12 justify-center">
                    <Card passedData={passedData}/>
                </div>
            </div>
        </>
    )
}

export default CardArticleHome;