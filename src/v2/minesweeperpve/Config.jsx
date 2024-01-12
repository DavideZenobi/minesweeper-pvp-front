import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export const Config = ({ onChange }) => {
    const [selectedLevel, setSelectedLevel] = useState('easy');

    const handleLevelChange = (e) => {
        setSelectedLevel(e.target.value);
        onChange(e.target.value);
    }

    return (
        <>
            <h4 style={{textAlign: 'center'}}>Select Level</h4>
            <FormControl sx={{ width: '130px' }}>
                <InputLabel id='select-level'>Level</InputLabel>
                <Select
                    labelId='select-level'
                    label='Level'
                    value={selectedLevel}
                    onChange={handleLevelChange}
                >
                    <MenuItem value={'easy'}>Easy</MenuItem>
                    <MenuItem value={'medium'}>Medium</MenuItem>
                    <MenuItem value={'hard'}>Hard</MenuItem>
                </Select>
            </FormControl>  
        </>
    );
}