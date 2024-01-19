import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import React, { useMemo } from "react";

import { Container } from "@mantine/core";

const data = [
    {
        name: {
            firstName: "Zachary",
            lastName: "Davis",
        },
        address: "261 Battle Ford",
        city: "Columbus",
        state: "Ohio",
    },
    {
        name: {
            firstName: "Robert",
            lastName: "Smith",
        },
        address: "566 Brakus Inlet",
        city: "Westerville",
        state: "West Virginia",
    },
    {
        name: {
            firstName: "Kevin",
            lastName: "Yan",
        },
        address: "7777 Kuhic Knoll",
        city: "South Linda",
        state: "West Virginia",
    },
];

const RekapLembagaKeagamaan = () => {
    const columns = useMemo(
        () => [
            {
                accessorKey: "name.firstName",
                header: "First Name",
            },
            {
                accessorKey: "name.lastName",
                header: "Last Name",
            },
            {
                accessorKey: "address",
                header: "Address",
            },
            {
                accessorKey: "city",
                header: "City",
            },
            {
                accessorKey: "state",
                header: "State",
            },
        ],
        []
    );

    const table = useMantineReactTable({
        columns,
        data,
        mantineTableProps: {
            withColumnBorders: true,
        },
    });

    return (
        <>
            <MantineReactTable table={table} />
        </>
    );
};

export default RekapLembagaKeagamaan;
