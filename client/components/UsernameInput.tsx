import { Dispatch, SetStateAction, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UsernameInput = ({ setUsername } : { setUsername: Dispatch<SetStateAction<String>>}) => {

    const [usernameInput, setUsernameInput] = useState<String>("");

    const handleChange = (e: any) => {
        setUsernameInput(e.target.value);
    };

    const handleClick = () => {
        setUsername(usernameInput);
    }

    return (
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <TextField onChange={handleChange} required id="outlined-basic" label="Username" variant="outlined" />
            <Button variant="contained" onClick={handleClick}>Enter</Button>
        </Box>  
    );
}

export default UsernameInput