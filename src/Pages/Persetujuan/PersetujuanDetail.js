import {
    Anchor,
    Breadcrumbs,
    Container,
    List,
    Table,
    Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
    getAllPersetujuanAction,
    getDetailAdminPersetujuanAction,
} from "../../redux/slices/persetujuan/persetujuanSlices";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

const PersetujuanDetail = () => {
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPersetujuanAction());
        dispatch(getDetailAdminPersetujuanAction(params?.id));
    }, [dispatch, params]);

    const persetujuan = useSelector((state) => state?.persetujuan);
    const { loading, appError, serverError, detailAdminPersetujuan } =
        persetujuan;

    console.log(detailAdminPersetujuan);

    // const [detailAdminPersetujuanState, setDetailAdminPersetujuan] = useState([
    //     detailAdminPersetujuan,
    // ]);

    // console.log(detailAdminPersetujuanState);

    const list =
        detailAdminPersetujuan &&
        detailAdminPersetujuan.map((item, index) => (
            <List key={index}>
                {/* <List.Item>{item?.index}</List.Item> */}
                <List.Item>{item?.id}</List.Item>
                <List.Item>{item?.norek}</List.Item>
            </List>
        ));

    // const rowsList = detailAdminPersetujuanState.map((item, index) => (
    //     <Table.Tr key={item?.index}>
    //         <Table.Td ta="center">{index + 1}</Table.Td>
    //         <Table.Td ta="center">{item?.id}</Table.Td>
    //         <Table.Td ta="center">{item?.norek}</Table.Td>
    //     </Table.Tr>
    // ));

    const items = [
        { title: "Home", href: "/dashboard" },
        { title: "Persetujuan", href: "/dashboard/admin/persetujuan" },
        {
            title: `Detail ${params.id}`,
            href: `/dashboard/admin/persetujuan/${params.id}`,
        },
    ].map((item, index) => (
        <Anchor href={item.href} key={index} size="sm" truncate="end">
            {item.title}
        </Anchor>
    ));

    return (
        <>
            <Container size="xl">
                <Breadcrumbs separator="→" mt="xs" mb="lg">
                    {items}
                </Breadcrumbs>
                {/* <Table.ScrollContainer minWidth={500}>
                    <Table
                        withColumnBorders
                        withTableBorder
                        horizontalSpacing="lg"
                        verticalSpacing="md"
                        striped
                        highlightOnHover
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>No.</Table.Th>
                                <Table.Th>Id</Table.Th>
                                <Table.Th>No. Rekening</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rowsList}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer> */}

                {list}
            </Container>
        </>
    );
};

export default PersetujuanDetail;
