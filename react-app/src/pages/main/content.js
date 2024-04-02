import React from 'react';

import subjects from '../../data.json';
import SCP_Subject from './scp-subject.js'
import { Stack } from '@mui/material';

export default () => {
    return (
        <>
        <br/><br/>
        <Stack direction={'column'} spacing={'3vh'} alignItems={'center'} sx={{marginBottom: '10vh'}}>
            <h2>SCP subjects:</h2>
            {subjects.map((subject) => <SCP_Subject subject={subject}/>)}
        </Stack>
        </>
    )
}
