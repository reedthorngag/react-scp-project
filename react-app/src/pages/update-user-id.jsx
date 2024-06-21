import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Stack, TextField } from '@mui/material';
import { Button } from '@mui/base';
import '../css/main.css';

export default () => {

    const [id, setId] = useState();
    const [submited, submit] = useState(false);

    useEffect(()=>{
        
        if (!submited) return;

        if (!id || id.length > 32) {
            alert("invalid ID!");
            return;
        }

        fetch((process.env.REACT_APP_API_URL || '')+`/api/setUserId`,
                    {
                        method: 'POST',
                        headers:{"Content-Type":"application/json"},
                        body: JSON.stringify({UserID:id})
                    })
                .then(async (res) => {
                    const body = (await new Response(res.body).json());
                    if (res.status != 200 && res.status != 201) {
                        if (res.status == 302 || res.status == 301) {
                            window.location.herf = '/';
                        }
                        if (res.status == 403 && body.error == 'user_id_taken') {
                            alert("User id taken!");
                        } else
                            alert("Couldn't set user ID!\n Status code: "+res.status);
                            
                        submit(false);
                        return;
                    }
                    document.cookie = 'auth='+body.new_auth+'; max-age='+(60*60*24*5)+'; path=/; Samesite=Strict; Secure;';
                    window.location.href = '/';
                });
        
    },[submited]);

    return (
        <>
            <Stack direction={'column'} spacing={'3vh'} alignItems={'center'} sx={{marginBottom: '10vh'}}>
                <h2>Choose your new user ID</h2>
                <Stack>
                    <TextField className='textfield' sx={{ input: { color: '#d8d4cf' } }} onChange={(e)=>setId(e.target.value)}></TextField>
                    <Button className='button' onClick={()=>submit(true)}><h2 className='small-margin'>Submit!</h2></Button>
                </Stack>
            </Stack>
        </>
    )
}