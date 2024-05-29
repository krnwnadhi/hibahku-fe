import "react-toastify/dist/ReactToastify.css";

import { Button, Divider, Group } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

import { getAllUsersAction } from "../../redux/slices/user/userSlices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const AdminPage = () => {
    const [loading, setLoading] = useState(false);

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

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsersAction());
    }, [dispatch]);

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
