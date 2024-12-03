import { Children } from "react";

const MapUtils = ({ of, render }) => {
    if (of.length === 0) {
        console.log("Data Kosong");
    }

    if (typeof render !== "function") {
        console.error("Render harus function");
    }
    return Children.toArray(of.map((item, index) => render(item, index)));
};

export default MapUtils;

export const App = () => {
    const DATA_LIST = [
        {
            id: 1,
            name: "John",
            age: 25,
        },
        {
            id: 2,
            name: "Doe",
            age: 30,
        },
    ];
    return (
        <div>
            <MapUtils of={DATA_LIST} render={(item) => <p>{item?.name}</p>} />
        </div>
    );
};
