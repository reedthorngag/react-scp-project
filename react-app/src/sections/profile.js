import { Box, Menu, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/nav.css';

export default () => {

    const [profile, setProfile] = useState(null);

    useEffect(()=> {
        fetch((process.env.REACT_APP_API_URL || '')+`/api/profile`)
            .then(response => response.json())
            .then((data) => {
                setProfile(data);
            })
            .catch((e) => {
                console.error(`An error occurred: ${e}`)
            }
        );
    }, []);

    return profile ? 
        (
            <>
            <Box className='logo' display='flex' justifyContent='flex-end' width="50%">
                <DropDown>
                    <MenuButton>Profile</MenuButton>
                    <Menu slots={{listbox: Listbox}}>
                        <MenuItem onClick={()=>{window.location.href = (process.env.REACT_APP_API_URL || '')+'/api/logout'}}>Logout</MenuItem>
                    </Menu>
                </DropDown>
            </Box>
            </>
        ) : 
        (
            <>
            <Box className='logo' display='flex' justifyContent='flex-end' width="50%">
                <Link to='/login' style={{color:'rgb(95, 217, 251)'}}>
                    <p style={{fontSize: "3vh"}}>Login</p>
                </Link>
            </Box>
            </>
        )
}
