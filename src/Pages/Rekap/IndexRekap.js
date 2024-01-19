import { Container, Tabs } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";

import React from "react";
import RekapLembagaKeagamaan from "./RekapLembagaKeagamaan";
import RekapMasjid from "./RekapMasjid";

const IndexRekap = () => {
    const navigate = useNavigate();
    const { tabValue } = useParams();

    return (
        <>
            <Container size="xl">
                <Tabs
                    value={tabValue}
                    onChange={(value) =>
                        navigate(`/dashboard/admin/rekap/${value}`)
                    }
                    keepMounted={false}
                    p={10}
                    radius="md"
                    variant="pills"
                >
                    <Tabs.List grow>
                        <Tabs.Tab value="masjid">Masjid</Tabs.Tab>
                        <Tabs.Tab
                            value="lembagapendidikankeagamaan"
                            color="green"
                        >
                            Lembaga Keagamaan
                        </Tabs.Tab>
                    </Tabs.List>
                    {/*  */}

                    {/*  */}
                    <Tabs.Panel value="masjid" pt="md">
                        <RekapMasjid />
                    </Tabs.Panel>
                    <Tabs.Panel value="lembagapendidikankeagamaan" pt="md">
                        <RekapLembagaKeagamaan />
                    </Tabs.Panel>
                </Tabs>
            </Container>
        </>
    );
};

export default IndexRekap;
