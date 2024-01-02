import "moment/locale/id";

import Moment from "react-moment";
import React from "react";

const DateFormatter = ({ date }) => {
    return (
        <Moment
            locale="id"
            format="DD MMMM YYYY"
            // fromNow
        >
            {date}
        </Moment>
    );
};

export default DateFormatter;
