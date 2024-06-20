import React from 'react';

import SCP_Subject from './scp-subject.jsx'
import { Stack } from '@mui/material';
import { useState, useEffect } from "react";


export default () => {   
 
    const [subjects, setData] = useState(null);
    const [update, setUpdated] = useState(true);

    useEffect(() => {
        if (update) {
            fetch((process.env.REACT_APP_API_URL || '')+`/api/fetch/next`)
                .then(response => response.json())
                .then((data) => {
                    setData(null);
                    setData(data);
                })
                .catch((e) => {
                    console.error(`An error occurred: ${e}`)
                }
            );
            setUpdated(false);
        }
    }, [update]);
    return (
        <>
        <br/><br/>
        <Stack direction={'column'} spacing={'3vh'} alignItems={'center'} sx={{marginBottom: '10vh'}}>
            <h1>SCP subjects</h1>
            {subjects && subjects.map((subject) => <SCP_Subject subject={subject} setUpdated={setUpdated}/>)}
        </Stack>
        </>
    )
}
