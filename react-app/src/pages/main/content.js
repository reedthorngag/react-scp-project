import React from 'react';

import SCP_Subject from './scp-subject.js'
import { Stack } from '@mui/material';
import { useState, useEffect } from "react";


export default () => {   
 
    const [subjects, setData] = useState(null);

    useEffect(() => {
    fetch(`http://localhost:443/api/fetch/next`)
        .then(response => response.json())
        .then((data) => {
            setData(data);
        })
        .catch((e) => {
            console.error(`An error occurred: ${e}`)
        });
    }, []);
    return (
        <>
        <br/><br/>
        <Stack direction={'column'} spacing={'3vh'} alignItems={'center'} sx={{marginBottom: '10vh'}}>
            <h1>SCP subjects</h1>
            {subjects && subjects.map((subject) => <SCP_Subject subject={subject}/>)}
        </Stack>
        </>
    )
}
