import { Box, Button, Stack, Toolbar, TextField, Grid, TextArea } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState, useRef } from "react";
import '../../css/main.css';

export default (props) => {

    const [subject, setSubject] = useState(structuredClone(props.subject));
    const [content, setContent] = useState(subject.Description);
    const [background, setBackground] = useState("#00000030");
    const [scroll, setScrollPos] = useState( {value: window.scrollY,active:false});
    const [editing, setEditing] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [updated, markUpdated] = useState(false);

    const [value,triggerUpdate] = useState(0);
    const update = () => triggerUpdate(value + 1);

    useEffect(() => {
        if (deleted) {
            fetch((process.env.REACT_APP_API_URL || '')+`/api/posts/${subject.PostID}/delete`)
                .then((res) => {
                    if (res.status != 200 && res.status != 201) {
                        alert("Couldn't delete subject!\n(You need to be the author to delete a post)\n Status code: "+res.status);
                    }
                    props.setUpdated(true);
                });
        }
    }, [deleted]);

    useEffect(() => {
        if (updated) {
            fetch((process.env.REACT_APP_API_URL || '')+`/api/posts/${subject.PostID}/update`,
                    {
                        method:post,
                        headers:{"Content-Type":"application/json"},
                        body: JSON.stringify(subject)
                    })
                .then((res) => {
                    if (res.status != 200 && res.status != 201) {
                        alert("Couldn't update subject!\n(You need to be the author to update a post)\n Status code: "+res.status);
                    }
                    props.setUpdated(true);
                });
        }
    }, [updated]);

    const updateSubject = (e, param) => {
        subject[param] = e.target.value;
        setSubject(subject);
        update();
    }

    const cancelEdit = () => {
        props.setUpdated(true);
    }

    const deleteSubject = () => {
        setDeleted(true);
    }

    return !editing ? (
        <>
        <Stack className="scp_subject" onClick={()=>{if (!scroll.active) setScrollPos({value: window.scrollY,active:true}); setContent(subject.Body.replace('${description}',subject.Description).replaceAll('\n','<br/>'))}}
                onMouseLeave={()=>{setContent(subject.Description.replaceAll('\n','<br/>'));setBackground("#00000030");
                    if (scroll.active) {window.scrollTo(0,scroll.value); scroll.active = false}
                }}
                onMouseEnter={()=>{setBackground("#00000045");}}
                direction={'column'} width={'80vw'} alignItems={'center'}>
            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <h3>{subject.Title}</h3>
                <Stack direction='row'>
                    <Button onClick={()=>setEditing(true)}>Edit</Button>
                    <Button onClick={()=>deleteSubject()} sx={{color:'red'}}>Delete</Button>
                </Stack>
            </Grid>
            <h4><b>Class: </b>{subject.Class}</h4><br/>
            <p dangerouslySetInnerHTML={{__html: content}}></p>
        </Stack>
        </>
        ) : 
        (
        <>
        <Stack className="scp_subject" onClick={()=>{if (!scroll.active) setScrollPos({value: window.scrollY,active:true}); setContent(subject.Body.replace('${description}',subject.Description).replaceAll('\n','<br/>'))}}
                onMouseLeave={()=>{setContent(subject.Description.replaceAll('\n','<br/>'));setBackground("#00000030");
                    if (scroll.active) {window.scrollTo(0,scroll.value); scroll.active = false}
                }}
                onMouseEnter={()=>{setBackground("#00000045");}}
                direction={'column'} width={'80vw'} alignItems={'center'}>
            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <TextField className='editBox' value={subject.Title} onChange={(e)=>updateSubject(e,'Title')}></TextField>
                <Stack direction='row'>
                    <Button onClick={()=>saveEdits()}>Save</Button>
                    <Button onClick={()=>cancelEdit()}>Cancel</Button>
                </Stack>
            </Grid>
            <h4><b>Class: </b><TextField>{subject.Class}</TextField></h4><br/>
            <p dangerouslySetInnerHTML={{__html: content}}></p>
        </Stack>
        </>
        )
}
