import {
    IconError404,
    IconLogin,
    IconLogout,
    IconUserShield,
    IconUserSquare,
} from "@tabler/icons-react";

import { IconHome2 } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import classes from "./SideNav.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function SideNav() {
    const [active, setActive] = useState("Dashboard");

    const userRole = useSelector((state) => state?.auth?.userAuth);

    const dataUser = [
        { link: "/dashboard", label: "Dashboard", icon: IconHome2 },
        { link: "/dashboard/user", label: "User", icon: IconUserSquare },
        { link: "/error", label: "Error", icon: IconError404 },
        // { link: "/register", label: "Sign Out", icon: IconLogout },
    ];

    const dataAdmin = [
        { link: "/dashboard", label: "Dashboard", icon: IconHome2 },
        { link: "/dashboard/admin", label: "Admin", icon: IconUserShield },
        { link: "/dashboard/user", label: "User", icon: IconUserSquare },
        { link: "/error", label: "Error", icon: IconError404 },
        // { link: "/register", label: "Sign Out", icon: IconLogout },
    ];

    const linksUser = dataUser.map((item) => (
        <Link
            className={classes.link}
            data-active={item.label === active || undefined}
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

    const linksAdmin = dataAdmin.map((item) => (
        <Link
            className={classes.link}
            data-active={item.label === active || undefined}
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
