import { AreaChart } from "@mantine/charts";

const AreaChartMantine = () => {
    const data = [
        {
            date: "1 Mar 2022",
            A: 2890,
            B: 2338,
            C: 2452,
        },
        {
            date: "2 Mar 2022",
            A: 2756,
            B: 2103,
            C: 2402,
        },
        {
            date: "3 Mar 2022",
            A: 3322,
            B: 986,
            C: 1821,
        },
        {
            date: "4 Mar 2022",
            A: 3470,
            B: 2108,
            C: 2809,
        },
        {
            date: "5 Mar 2022",
            A: 3129,
            B: 1726,
            C: 2290,
        },
    ];

    return (
        <AreaChart
            h={300}
            data={data}
            dataKey="date"
            series={[
                { name: "A", color: "indigo.6" },
                { name: "B", color: "blue.6" },
                { name: "C", color: "teal.6" },
            ]}
            curveType="linear"
        />
    );
};

export default AreaChartMantine;
