import { Box, Stack } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    const subject = props.subject;
    console.log(subject);
    return (
        <>
        <Stack direction={'column'} width={'80vw'} alignItems={'center'} sx={{border: '0.1vw solid black', padding: '0 4vw'}}>
            <h3>{subject.title}</h3>
            <h4><b>Class: </b>{subject.class}</h4><br/>
            <p>{false?subject.body.replace('${description}',subject.description):subject.description}</p>
        </Stack>
        </>
    )
}
