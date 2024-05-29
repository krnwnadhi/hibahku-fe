import {
    IconClockHour4,
    IconLicense,
    IconReportAnalytics,
    IconUserSquare,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

import { Anchor } from "@mantine/core";
import { IconBuildingMosque } from "@tabler/icons-react";
import { IconHome2 } from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import classes from "./SideNav.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function SideNav() {
    const location = useLocation();

    const [active, setActive] = useState(location?.pathname);

    const userRole = useSelector((state) => state?.auth?.userAuth);

    const dataAdmin = [
        { link: "/dashboard", label: "Dashboard", icon: IconHome2 },
        {
            link: "/dashboard/admin/periode",
            label: "Periode",
            icon: IconClockHour4,
        },
        {
            link: "/dashboard/admin/persetujuan",
            label: "Persetujuan",
            icon: IconLicense,
        },
        {
            link: "/dashboard/admin/list",
            label: "List User",
            icon: IconUser,
        },
        {
            link: "/dashboard/rumah-ibadah/list",
            label: "List Tempat",
            icon: IconBuildingMosque,
        },
        {
            link: "/dashboard/admin/rekap/masjid",
            label: "Rekap",
            icon: IconReportAnalytics,
        },
    ];

    const linksAdmin = dataAdmin.map((item) => (
        <Anchor
            className={classes.link}
            data-active={item.link === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                setActive(item.label);
            }}
            p="sm"
            underline="never"
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Anchor>
    ));

    const dataUser = [
        {
            link: "/dashboard/user/beranda",
            label: "User",
            icon: IconUserSquare,
        },
    ];

    const linksUser = dataUser.map((item) => (
        <Link
            className={classes.link}
            to={item.link}
            key={item.label}
            onClick={(event) => {
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <nav className={classes.navbar}>
            {userRole?.role === 1 ? (
                <div className={classes.navbarMain}>{linksAdmin}</div>
            ) : (
                <div className={classes.navbarMain}>{linksUser}</div>
            )}
        </nav>
    );
}
