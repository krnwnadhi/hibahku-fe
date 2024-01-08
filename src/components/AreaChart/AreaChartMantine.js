import { AreaChart, BarChart } from "recharts";

import React from "react";

const AreaChartMantine = () => {
    const data = [
        { month: "January", Smartphones: 120, Laptops: 80, Tablets: 10 },
        { month: "February", Smartphones: 90, Laptops: 120, Tablets: 40 },
        { month: "March", Smartphones: 40, Laptops: 100, Tablets: 20 },
        { month: "April", Smartphones: 100, Laptops: 20, Tablets: 80 },
        { month: "May", Smartphones: 80, Laptops: 140, Tablets: 120 },
        { month: "June", Smartphones: 75, Laptops: 60, Tablets: 100 },
    ];
    return (
        <BarChart
            h={300}
            data={data}
            dataKey="month"
            series={[
                { name: "Smartphones", color: "violet.6" },
                { name: "Laptops", color: "blue.6" },
                { name: "Tablets", color: "teal.6" },
            ]}
            tickLine="y"
        />
    );
};

export default AreaChartMantine;
