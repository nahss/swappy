import React from "react";
import SEO from "../common/seo";
import WrapperFour from "../layout/wrapper-4";
import MySneakersArea from "@/components/homes/home/my-sneakers-area";

const index = () => {
    return (
        <WrapperFour>
            <SEO pageTitle={"My Swap Requests"} />
    <MySneakersArea />
    </WrapperFour>
);
};

export default index;
