import { SideBar } from './sidebar/SideBar';
import { Outlet } from "react-router-dom"


export const RootV2 = () => {


    return (
        <>
            <div className="flex flex-col md:flex-row w-screen h-screen bg-gray-700">
                <div className="hidden md:flex">
                    <SideBar />
                </div>
                <Outlet />
            </div>
        </>
    )

    /*return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: '#31465b'}}>
                <SideBar />
                <Box sx={{ flex: '1' }}>
                    <Outlet />
                </Box>
            </Box>
        </>
    )*/
}