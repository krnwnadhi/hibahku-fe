import {
    IconClockHour4,
    IconFileAnalytics,
    IconLicense,
    IconReportAnalytics,
} from "@tabler/icons-react";

import { Anchor } from "@mantine/core";
import { IconBuildingMosque } from "@tabler/icons-react";
import { IconHome2 } from "@tabler/icons-react";
import { IconTimeline } from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import classes from "./SideNav.module.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function SideNav() {
    const location = useLocation();

    const [active, setActive] = useState(location?.pathname);

    const userRole = useSelector((state) => state?.auth?.userAuth);

    const persetujuan = useSelector((state) => state?.persetujuan);
    const { persetujuanList } = persetujuan;

    const user = useSelector((state) => state?.auth?.userAuth);
    const { nik } = user ?? {};

    const filteredResult = persetujuanList?.result?.filter((item) => {
        return nik === item?.userid;
    });

    const persetujuanId =
        filteredResult?.length > 0 ? parseInt(filteredResult[0]?.id) : "";

    const dataAdmin = [
        { link: "/dashboard", label: "Dashboard", icon: IconHome2 },
        // {
        //     link: "/dashboard/admin/periode",
        //     label: "Periode",
        //     icon: IconClockHour4,
        // },
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
            p="md"
            underline="never"
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Anchor>
    ));

    const dataUser = [
        {
            link: "/dashboard/user/beranda",
            label: "Dashboard",
            icon: IconHome2,
        },
        {
            link: "/dashboard/user/dokumen",
            label: "Permohonan",
            icon: IconFileAnalytics,
        },
        {
            link: `/dashboard/user/progres/${persetujuanId}`,
            label: "Progress",
            icon: IconTimeline,
        },
    ];

    const dataUserNoPersetujuanId = [
        {
            link: "/dashboard/user/beranda",
            label: "Dashboard",
            icon: IconHome2,
        },
        {
            link: "/dashboard/user/dokumen",
            label: "Permohonan",
            icon: IconFileAnalytics,
        },
    ];

    const linksUser = persetujuanId
        ? dataUser?.map((item) => (
              <Anchor
                  className={classes.link}
                  data-active={item.link === active || undefined}
                  href={item.link}
                  key={item.label}
                  onClick={(event) => {
                      setActive(item.label);
                  }}
                  p="sm"
              >
                  <item.icon className={classes.linkIcon} stroke={1.5} />
                  <span>{item.label}</span>
              </Anchor>
          ))
        : dataUserNoPersetujuanId?.map((item) => (
              <Anchor
                  className={classes.link}
                  data-active={item.link === active || undefined}
                  href={item.link}
                  key={item.label}
                  onClick={(event) => {
                      setActive(item.label);
                  }}
                  p="sm"
                  // underline="never"
              >
                  <item.icon className={classes.linkIcon} stroke={1.5} />
                  <span>{item.label}</span>
              </Anchor>
          ));

    // const linksUser = dataUser?.map((item) => (
    //     <Anchor
    //         className={classes.link}
    //         data-active={item.link === active || undefined}
    //         href={item.link}
    //         key={item.label}
    //         onClick={(event) => {
    //             setActive(item.label);
    //         }}
    //         p="sm"
    //     >
    //         <item.icon className={classes.linkIcon} stroke={1.5} />
    //         <span>{item.label}</span>
    //     </Anchor>
    // ));

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
