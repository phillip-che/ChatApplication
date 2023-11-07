import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const UsernameInput = () => {
    return (
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <TextField className="" required id="outlined-basic" label="Username" variant="outlined" />
        </Box>
    );
}

export default UsernameInput