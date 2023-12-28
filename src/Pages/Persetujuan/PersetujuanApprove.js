import React from "react";
import { useParams } from "react-router-dom";

const PersetujuanApprove = () => {
    const params = useParams();
    // console.log(params.id);

    return <div>PersetujuanApprove : {params.id} </div>;
};

export default PersetujuanApprove;
