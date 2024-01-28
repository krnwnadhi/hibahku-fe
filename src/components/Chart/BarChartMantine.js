import { BarChart } from "@mantine/charts";
import React from "react";

const BarChartMantine = () => {
    const data = [
        { month: "January", X: 120, Y: 80, Z: 10 },
        { month: "February", X: 90, Y: 120, Z: 40 },
        { month: "March", X: 40, Y: 100, Z: 20 },
        { month: "April", X: 100, Y: 20, Z: 80 },
        { month: "May", X: 80, Y: 140, Z: 120 },
        { month: "June", X: 75, Y: 60, Z: 100 },
    ];

    return (
        <>
            {" "}
            <BarChart
                h={300}
                data={data}
                dataKey="month"
                series={[
                    { name: "X", color: "violet.6" },
                    { name: "Y", color: "blue.6" },
                    { name: "Z", color: "teal.6" },
                ]}
                tickLine="y"
            />
        </>
    );
};

export default BarChartMantine;
