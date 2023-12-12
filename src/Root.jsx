import { Outlet } from "react-router-dom";
import { CustomAppBar } from "./components/CustomAppBar";

export const Root = () => {

    return (
        <>
            <CustomAppBar />
            <Outlet />
        </>
    );
}