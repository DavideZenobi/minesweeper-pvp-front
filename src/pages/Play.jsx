import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import PvpIcon from '../static/pvp.png';
import { Pve } from "../components/Pve";
import { Pvp } from "../components/Pvp";
import { PveCoop } from "../components/PveCoop";

export const Play = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const containerStyle = {
        border: '2px solid black',
        height: '500px',
        margin: 'auto',
        width: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '10px'
    }

    const tabsContainerStyle = {
        //borderBottom: '1px solid black'
    }

    const handleTab = (e, tabNumber) => {
        setSelectedTab(tabNumber);
    }

    return (
        <>
            <Box sx={containerStyle}>
                <Box sx={tabsContainerStyle}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTab}
                    >
                        <Tab icon={<PersonIcon />} label='pve' />
                        <Tab icon={<img src={PvpIcon} alt="PvP" width='24' height='24' />} label='pvp' />
                        <Tab icon={<GroupIcon />} label='pve coop' />
                    </Tabs>
                </Box> 
                {selectedTab === 0 && <Pve />}
                {selectedTab === 1 && <Pvp />}
                {selectedTab === 2 && <PveCoop />}
            </Box>
        </>
    );
}