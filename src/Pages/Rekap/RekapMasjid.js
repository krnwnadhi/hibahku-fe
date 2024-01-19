import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import React, { useMemo } from "react";

const data = [
    {
        name: {
            firstName: "Zachary",
            lastName: "Davis",
        },
        address: "261 Battle Ford",
        city: "Columbus",
        state: "Ohio",
        handphoneNumber: 1234567890,
    },
    {
        name: {
            firstName: "Robert",
            lastName: "Smith",
        },
        address: "566 Brakus Inlet",
        city: "Westerville",
        state: "West Virginia",
        handphoneNumber: 1234567890,
    },
    {
        name: {
            firstName: "Kevin",
            lastName: "Yan",
        },
        address: "7777 Kuhic Knoll",
        city: "South Linda",
        state: "West Virginia",
        handphoneNumber: 1234567890,
    },
    {
        name: {
            firstName: "John",
            lastName: "Upton",
        },
        address: "722 Emie Stream",
        city: "Huntington",
        state: "Washington",
        handphoneNumber: 1234567890,
    },
    {
        name: {
            firstName: "Nathan",
            lastName: "Harris",
        },
        address: "1 Kuhic Knoll",
        city: "Ohiowa",
        state: "Nebraska",
        handphoneNumber: 1234567890,
    },
];

const RekapMasjid = () => {
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
            {
                accessorKey: "handphoneNumber",
                header: "Handphone Number",
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

export default RekapMasjid;
