import React from 'react';

import SCP_Subject from './scp-subject.jsx'
import { Stack } from '@mui/material';
import { useState, useEffect } from "react";
import { Button } from '@mui/base';
import '../../css/main.css';


export default (props) => {   
 
    const [subjects, setData] = useState(null);
    const [update, setUpdated] = useState(true);
    const [creatingNew, createNew] = useState(false);

    useEffect(() => {
        if (update) {
            if (creatingNew) {
                createNew(false);
                return;
            }
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
    }, [update,creatingNew]);
    return (
        <>
        <br/><br/>
        <Stack direction={'column'} spacing={'3vh'} alignItems={'center'} sx={{marginBottom: '10vh'}}>
            <h1>SCP subjects</h1>
            <Button className='button' onClick={() => {props.profile ? createNew(true) : window.location.href = '/auth/google';}}><h3>Create new!</h3></Button>
            {creatingNew && <SCP_Subject subject='new' setUpdated={setUpdated} profile={props.profile}/>}
            {subjects && subjects.map((subject) => <SCP_Subject subject={subject} setUpdated={setUpdated} profile={props.profile}/>)}
        </Stack>
        </>
    )
}
