import React from "react";
import Header from "../components/Header";
import ViewLatestComponent from "../components/ViewLatestComponent";

const Latest = () => {
    return (
        <>
            <div className="bg-white">
                <Header />
                <div className="min-h-screen">
                    <ViewLatestComponent/>
                </div>
            </div>
        </>
    )
}

export default Latest;