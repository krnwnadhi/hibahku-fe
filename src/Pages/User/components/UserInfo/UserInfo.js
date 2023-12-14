// import { Avatar, Group, Paper, Text } from "@mantine/core";
// import { IconAt, IconPhoneCall } from "@tabler/icons-react";
// import { useDispatch, useSelector } from "react-redux";

// import classes from "./UserInfo.module.css";
// import { getAllUsersAction } from "../../../../redux/slices/user/userSlices";
// import { useEffect } from "react";

// export default function UserInfo() {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(getAllUsersAction());
//     }, [dispatch]);

//     const user = useSelector((state) => state?.auth?.userAuth);
//     const { nama } = user;

//     return (
//         <div>
//             <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
//                 <Group wrap="nowrap">
//                     <Avatar
//                         src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
//                         size={94}
//                         radius="md"
//                     />
//                     <div>
//                         <Text fz="lg" fw={500} className={classes.name}>
//                             {nama}
//                         </Text>

//                         <Group wrap="nowrap" gap={10} mt={3}>
//                             <IconAt
//                                 stroke={1.5}
//                                 size="1rem"
//                                 className={classes.icon}
//                             />
//                             <Text fz="xs" c="dimmed">
//                                 robert@glassbreaker.io
//                             </Text>
//                         </Group>

//                         <Group wrap="nowrap" gap={10} mt={5}>
//                             <IconPhoneCall
//                                 stroke={1.5}
//                                 size="1rem"
//                                 className={classes.icon}
//                             />
//                             <Text fz="xs" c="dimmed">
//                                 +11 (876) 890 56 23
//                             </Text>
//                         </Group>
//                     </div>
//                 </Group>
//             </Paper>
//         </div>
//     );
// }

import { Avatar, Paper, Text } from "@mantine/core";

import { useSelector } from "react-redux";

export default function UserInfo() {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getAllUsersAction());
    // }, [dispatch]);

    const user = useSelector((state) => state?.auth?.userAuth);
    const { nama, nik, notelpon } = user;

    return (
        <>
            <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
                <Avatar
                    // src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                    src="https://xsgames.co/randomusers/avatar.php?g=pixel"
                    size={120}
                    radius={120}
                    mx="auto"
                />
                <Text ta="center" fz="lg" fw={500} mt="md">
                    {nama}
                </Text>
                <Text ta="center" c="dimmed" fz="xs">
                    {nik} • {notelpon}
                </Text>
            </Paper>
        </>
    );
}
