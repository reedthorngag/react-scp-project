import { Box, Stack } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';


export default () => {
    return (
        <>
        <Stack direction={'row'} width={'96vw'} height={'9vh'} padding={'0 2vw 0 1vw'} position={'relative'} sx={{border: '0.1vw solid black'}}>
            <Box width="50%">
                <Link to='/' height={'100%'}>
                        <h2>SCP Foundation</h2>
                </Link>
            </Box>
            <Box display='flex' justifyContent='flex-end' width="50%">
                <Link to='/login'>
                    <p style={{fontSize: "3vh"}}>Login</p>
                </Link>
            </Box>
        </Stack>
        </>
    )
}
