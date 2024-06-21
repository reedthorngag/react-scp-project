import { Box, Menu, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/nav.css';
import { Dropdown, MenuButton, MenuItem } from '@mui/base';

export default () => {

    const [profile, setProfile] = useState(null);


    
    useEffect(()=> {
        fetch((process.env.REACT_APP_API_URL || '')+`/api/profile`, {redirect:'manual'})
            .then(async response => {
                const body = (await new Response(response.body).json());
                if (response.status == 404 && body.error == 'user_not_created') {
                    window.location.href = '/updateUserId';
                    return;
                }
                if (response.status != 200) {
                    alert("Failed to get profile!\nStatus: "+response.status);
                }
                setProfile(body);
            })
            .catch((e) => {
                console.error(`An error occurred: ${e}`)
            }
        );
    }, []);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return profile ? 
        (
            <>
            <Box className='logo' display='flex' justifyContent='flex-end' width="50%">
                <Link to='/api/logout' style={{color:'rgb(95, 217, 251)'}}>
                    <p style={{fontSize: "3vh"}}>Logout</p>
                </Link>
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
