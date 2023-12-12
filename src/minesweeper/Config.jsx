import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export const Config = ({ isDisabled, onConfigChange }) => {
    const [level, setLevel] = useState('');

    const handleChange = (event) => {
        setLevel(event.target.value);
        onConfigChange(event.target.value);
    }

    return (
        <>
            <br/>
            <FormControl variant="outlined" sx={{width: '150px'}}>
                <InputLabel id='select-label'>Level</InputLabel>
                <Select
                    labelId='select-label'
                    disabled={isDisabled}
                    value={level}
                    label='Level'
                    onChange={handleChange}
                >
                    <MenuItem value={'easy'}>Easy</MenuItem>
                    <MenuItem value={'medium'}>Medium</MenuItem>
                    <MenuItem value={'hard'}>Hard</MenuItem>
                </Select>  
            </FormControl>  
        </>
    );
}