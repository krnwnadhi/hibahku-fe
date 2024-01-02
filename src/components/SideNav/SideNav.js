import {
    IconClockHour4,
    IconError404,
    IconFileTypePdf,
    IconLicense,
    IconUserShield,
    IconUserSquare,
} from "@tabler/icons-react";
import { Link, useLocation, useParams } from "react-router-dom";

import { Anchor } from "@mantine/core";
import { IconBuildingMosque } from "@tabler/icons-react";
import { IconHome2 } from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import classes from "./SideNav.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function SideNav() {
    const url = window.location.pathname;
    console.log(url);
    const location = useLocation();
    console.log(location.pathname);

    const [active, setActive] = useState(location?.pathname);

    const userRole = useSelector((state) => state?.auth?.userAuth);

    const dataAdmin = [
        { link: "/dashboard", label: "Dashboard", icon: IconHome2 },
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
            label: "List Rumah Ibadah",
            icon: IconBuildingMosque,
        },
        {
            link: "/dashboard/admin/rekap",
            label: "Rekap Permohonan",
            icon: IconFileTypePdf,
        },
        {
            link: "/dashboard/admin/periode",
            label: "Periodisasi",
            icon: IconClockHour4,
        },
    ];

    const linksAdmin = dataAdmin.map((item) => (
        <Anchor
            className={classes.link}
            data-active={item.link === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                // event.preventDefault();
                setActive(item.label);
            }}
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
                // event.preventDefault();
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

            {/* <div className={classes.footer}>
                <a
                    href="#"
                    className={classes.link}
                    onClick={(event) => event.preventDefault()}
                >
                    <IconSwitchHorizontal
                        className={classes.linkIcon}
                        stroke={1.5}
                    />
                    <span>Change account</span>
                </a>

                <a
                    href="/#"
                    className={classes.link}
                    // onClick={(event) => event.preventDefault()}
                >
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div> */}
        </nav>
    );
}
