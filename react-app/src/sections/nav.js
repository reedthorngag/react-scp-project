import { Box, Stack } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/nav.css';
import logo from '../imgs/SCP-logo.png';

export default () => {
    return (
        <>
        <Stack className='nav' direction={'row'} width={'96vw'} height={'9vh'} padding={'0 2vw 0 1vw'} position={'relative'} sx={{border: '0.1vw solid black'}}>
            <Box width="50%" style={{display:'flex',justifyContent:'left',alignItems:'center',flexDirection:'row'}}>

                <Link className='logo' to='/' style={{display:'inline-block',height:'100%'}}>
                    <img src={logo} style={{height:'70%',marginTop:'10%', display: 'inline-block'}}/>
                </Link>
                <Link className='logo' to='/' style={{display:'inline-block',height:'100%',width:'40%',color:'rgb(95, 217, 251)'}}>
                        <div style={{fontSize:'3.5vh',display:'inline-block', height:'100%', maxHeight:'100%',width:'100%',textAlign: 'center',paddingTop:'2vh',paddingLeft:'3%'}}>SCP Foundation</div>
                </Link>
            </Box>
            <Box className='logo' display='flex' justifyContent='flex-end' width="50%">
                <Link to='/login' style={{color:'rgb(95, 217, 251)'}}>
                    <p style={{fontSize: "3vh"}}>Login</p>
                </Link>
            </Box>
        </Stack>
        </>
    )
}
