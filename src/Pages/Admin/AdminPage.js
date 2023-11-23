// import {
//     Center,
//     Group,
//     Paper,
//     ScrollArea,
//     Table,
//     Text,
//     TextInput,
//     UnstyledButton,
//     keys,
//     rem,
// } from "@mantine/core";
// import {
//     IconChevronDown,
//     IconChevronUp,
//     IconSearch,
//     IconSelector,
// } from "@tabler/icons-react";

import "react-toastify/dist/ReactToastify.css";

import { Button, Divider, Group } from "@mantine/core";
import { useRef, useState } from "react";

import { toast } from "react-toastify";
import { useNetwork } from "@mantine/hooks";

// import classes from "./AdminPage.module.css";
// import { useState } from "react";

// function Th({ children, reversed, sorted, onSort }) {
//     const Icon = sorted
//         ? reversed
//             ? IconChevronUp
//             : IconChevronDown
//         : IconSelector;
//     return (
//         <Table.Th className={classes.th}>
//             <UnstyledButton onClick={onSort} className={classes.control}>
//                 <Group justify="space-between">
//                     <Text fw={500} fz="sm">
//                         {children}
//                     </Text>
//                     <Center className={classes.icon}>
//                         <Icon
//                             style={{ width: rem(16), height: rem(16) }}
//                             stroke={1.5}
//                         />
//                     </Center>
//                 </Group>
//             </UnstyledButton>
//         </Table.Th>
//     );
// }

// function filterData(data, search) {
//     const query = search.toLowerCase().trim();
//     return data.filter((item) =>
//         keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
//     );
// }

// function sortData(data, payload) {
//     const { sortBy } = payload;

//     if (!sortBy) {
//         return filterData(data, payload.search);
//     }

//     return filterData(
//         [...data].sort((a, b) => {
//             if (payload.reversed) {
//                 return b[sortBy].localeCompare(a[sortBy]);
//             }

//             return a[sortBy].localeCompare(b[sortBy]);
//         }),
//         payload.search
//     );
// }

// const data = [
//     {
//         name: "Athena Weissnat",
//         company: "Little - Rippin",
//         email: "Elouise.Prohaska@yahoo.com",
//     },
//     {
//         name: "Deangelo Runolfsson",
//         company: "Greenfelder - Krajcik",
//         email: "Kadin_Trantow87@yahoo.com",
//     },
//     {
//         name: "Danny Carter",
//         company: "Kohler and Sons",
//         email: "Marina3@hotmail.com",
//     },
//     {
//         name: "Trace Tremblay PhD",
//         company: "Crona, Aufderhar and Senger",
//         email: "Antonina.Pouros@yahoo.com",
//     },
//     {
//         name: "Derek Dibbert",
//         company: "Gottlieb LLC",
//         email: "Abagail29@hotmail.com",
//     },
//     {
//         name: "Viola Bernhard",
//         company: "Funk, Rohan and Kreiger",
//         email: "Jamie23@hotmail.com",
//     },
//     {
//         name: "Austin Jacobi",
//         company: "Botsford - Corwin",
//         email: "Genesis42@yahoo.com",
//     },
//     {
//         name: "Hershel Mosciski",
//         company: "Okuneva, Farrell and Kilback",
//         email: "Idella.Stehr28@yahoo.com",
//     },
//     {
//         name: "Mylene Ebert",
//         company: "Kirlin and Sons",
//         email: "Hildegard17@hotmail.com",
//     },
//     {
//         name: "Lou Trantow",
//         company: "Parisian - Lemke",
//         email: "Hillard.Barrows1@hotmail.com",
//     },
//     {
//         name: "Dariana Weimann",
//         company: "Schowalter - Donnelly",
//         email: "Colleen80@gmail.com",
//     },
//     {
//         name: "Dr. Christy Herman",
//         company: "VonRueden - Labadie",
//         email: "Lilyan98@gmail.com",
//     },
//     {
//         name: "Katelin Schuster",
//         company: "Jacobson - Smitham",
//         email: "Erich_Brekke76@gmail.com",
//     },
//     {
//         name: "Melyna Macejkovic",
//         company: "Schuster LLC",
//         email: "Kylee4@yahoo.com",
//     },
//     {
//         name: "Pinkie Rice",
//         company: "Wolf, Trantow and Zulauf",
//         email: "Fiona.Kutch@hotmail.com",
//     },
//     {
//         name: "Brain Kreiger",
//         company: "Lueilwitz Group",
//         email: "Rico98@hotmail.com",
//     },
// ];

// export default function AdminPage() {
//     const [search, setSearch] = useState("");
//     const [sortedData, setSortedData] = useState(data);
//     const [sortBy, setSortBy] = useState(null);
//     const [reverseSortDirection, setReverseSortDirection] = useState(false);

//     const setSorting = (field) => {
//         const reversed = field === sortBy ? !reverseSortDirection : false;
//         setReverseSortDirection(reversed);
//         setSortBy(field);
//         setSortedData(sortData(data, { sortBy: field, reversed, search }));
//     };

//     const handleSearchChange = (event) => {
//         const { value } = event.currentTarget;
//         setSearch(value);
//         setSortedData(
//             sortData(data, {
//                 sortBy,
//                 reversed: reverseSortDirection,
//                 search: value,
//             })
//         );
//     };

//     const rows = sortedData.map((row) => (
//         <Table.Tr key={row.name}>
//             <Table.Td>{row.name}</Table.Td>
//             <Table.Td>{row.email}</Table.Td>
//             <Table.Td>{row.company}</Table.Td>
//         </Table.Tr>
//     ));

//     return (
//         <Paper shadow="xs" p="xl">
//             <ScrollArea>
//                 <TextInput
//                     placeholder="Search by any field"
//                     mb="md"
//                     leftSection={
//                         <IconSearch
//                             style={{ width: rem(16), height: rem(16) }}
//                             stroke={1.5}
//                         />
//                     }
//                     value={search}
//                     onChange={handleSearchChange}
//                 />
//                 <Table
//                     horizontalSpacing="lg"
//                     verticalSpacing="lg"
//                     miw={700}
//                     layout="fixed"
//                 >
//                     <Table.Tbody>
//                         <Table.Tr>
//                             <Th
//                                 sorted={sortBy === "name"}
//                                 reversed={reverseSortDirection}
//                                 onSort={() => setSorting("name")}
//                             >
//                                 Name
//                             </Th>
//                             <Th
//                                 sorted={sortBy === "email"}
//                                 reversed={reverseSortDirection}
//                                 onSort={() => setSorting("email")}
//                             >
//                                 Email
//                             </Th>
//                             <Th
//                                 sorted={sortBy === "company"}
//                                 reversed={reverseSortDirection}
//                                 onSort={() => setSorting("company")}
//                             >
//                                 Company
//                             </Th>
//                         </Table.Tr>
//                     </Table.Tbody>
//                     <Table.Tbody>
//                         {rows.length > 0 ? (
//                             rows
//                         ) : (
//                             <Table.Tr>
//                                 <Table.Td colSpan={Object.keys(data[0]).length}>
//                                     <Text fw={500} ta="center">
//                                         Nothing found
//                                     </Text>
//                                 </Table.Td>
//                             </Table.Tr>
//                         )}
//                     </Table.Tbody>
//                 </Table>
//             </ScrollArea>
//         </Paper>
//     );
// }

// export default function AdminPage() {
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(getAllUsersAction());
//     }, [dispatch]);

//     return (
//         <Paper shadow="xs" p="xl">
//             aksas
//         </Paper>
//     );
// }

// export default function AdminPage() {
//     const notify = () => toast.success("Success Notification !");

//     return (
//         <>
//             <Button onClick={notify}>Click Me!</Button>
//         </>
//     );
// }

const AdminPage = () => {
    const [loading, setLoading] = useState(false);
    const networkStatus = useNetwork();

    const handleUpdateClick = () => {
        toast.info("Updating...");

        // Simulate an update process
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("Update successful!");
        }, 2000);
    };

    const handleLoadingClick = () => {
        toast("Loading...", {
            isLoading: true,
            autoClose: false, // Don't auto-close for loading
        });

        // Simulate a loading process
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.dismiss(); // Dismiss the loading toast
            toast.success("Loading complete!");
        }, 2000);
    };

    const update = () => {
        const id = toast.loading("Harap Tunggu...");
        //do something else
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            toast.update(id, {
                render: () => <div>New content</div>,
                type: "success",
                isLoading: false,
            });
            toast.dismiss(id); // Dismiss the loading toast
        }, 3000);
    };

    const toastId = useRef(null);

    const notify = () => {
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast("I cannot be duplicated!");
        }
    };

    return (
        <div>
            <Group>
                <Button onClick={handleUpdateClick} disabled={loading}>
                    {loading ? "Updating..." : "Update"}
                </Button>

                <Divider orientation="vertical" />

                <Button onClick={handleLoadingClick} disabled={loading}>
                    {loading ? "Loading..." : "Load"}
                </Button>

                <Divider orientation="vertical" />

                <Button onClick={update} disabled={loading}>
                    {loading ? "Loading..." : "Load"}
                </Button>

                <Divider orientation="vertical" />

                <Button onClick={notify}>Notify</Button>

                <Divider orientation="vertical" />
            </Group>
        </div>
    );
};

export default AdminPage;
