import { Box, Button, Stack, Toolbar, TextField, Grid, TextArea, TextareaAutosize } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState, useRef } from "react";
import '../../css/main.css';

export default (props) => {

    const profile = props.profile;

    if (props.subject == 'new') {
        props.subject = {
            Title: '',
            Class: '',
            Description: '',
            Body: '\nThe next line is replaced with the description, don\'t change it:\n${Description}\n',
            New: true
        }
    }

    const [subject, setSubject] = useState(structuredClone(props.subject));
    const [content, setContent] = useState(subject.Description.replaceAll('\n','<br/>'));
    const [background, setBackground] = useState("#00000030");
    const [scroll, setScrollPos] = useState( {value: window.scrollY,active:false});
    const [editing, setEditing] = useState(!!subject.New);
    const [deleted, setDeleted] = useState(false);
    const [updated, saveEdits] = useState(false);

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
            fetch((process.env.REACT_APP_API_URL || '')+`/api/posts/${subject.New? 'create' : subject.PostID+'/update'}`,
                    {
                        method: 'POST',
                        headers:{"Content-Type":"application/json"},
                        body: JSON.stringify(subject)
                    })
                .then((res) => {
                    if (res.status != 200 && res.status != 201) {
                        alert("Couldn't update subject!\n(You need to be the author to update a post)\n Status code: "+res.status);
                    } else {
                        alert((subject.New ? 'Created' : 'Updated') + ' successfully!');
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

    return !editing && !subject.New ? (
        <>
        <Stack className="scp_subject" onClick={()=>{if (!scroll.active) setScrollPos({value: window.scrollY,active:true}); setContent((subject.Description+subject.Body).replaceAll('\n','<br/>'))}}
                onMouseLeave={()=>{setContent(subject.Description.replaceAll('\n','<br/>'));setBackground("#00000030");
                    if (scroll.active) {window.scrollTo(0,scroll.value); scroll.active = false}
                }}
                onMouseEnter={()=>{setBackground("#00000045");}}
                direction={'column'} width={'80vw'} alignItems={'center'}>
            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <h3>{subject.Title}</h3>
                <Stack direction='row'>
                    {profile && profile.UserID == subject.AuthorID && <><Button onClick={()=>setEditing(true)}>Edit</Button></>}
                    {profile && (profile.UserID == subject.AuthorID || profile.IsAdmin) && <><Button onClick={()=>deleteSubject()} sx={{color:'red'}}>Delete</Button></>}
                </Stack>
            </Grid>
            <h4><b>Class: </b>{subject.Class}</h4><br/>
            <p dangerouslySetInnerHTML={{__html: content}}></p>
            <p><b>Author: </b>{subject.AuthorID}</p>
        </Stack>
        </>
        ) : 
        (
        <>
        <Stack className="scp_subject"
                onMouseEnter={()=>{setBackground("#00000045");}}
                direction={'column'} width={'80vw'} alignItems={'left'} paddingLeft={'2vw'}>
            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Stack direction='row'>
                    <h3>Title: </h3>
                    <Box display='flex' justifyContent={'center'} alignItems={'center'} paddingLeft={'3%'}>
                        <TextField className='textfield' sx={{ input: { color: '#d8d4cf' } }} size='small' value={subject.Title} onChange={(e)=>updateSubject(e,'Title')}></TextField>
                    </Box>
                </Stack>
                <Stack direction='row'>
                    <Button onClick={()=>saveEdits(true)}>Save</Button>
                    <Button onClick={()=>cancelEdit()} sx={{color:'red'}}>Cancel</Button>
                </Stack>
            </Grid>
            <h4><b>Class: </b></h4>
            <Grid container direction='row' justifyContent='space-between' alignItems='left'>
                <TextField className='textfield' sx={{ input: { color: '#d8d4cf' } }} size='small' value={subject.Class} onChange={(e)=>updateSubject(e,'Class')}></TextField>
            </Grid>
            <h4>Description:</h4>
            <TextareaAutosize className='textarea' minRows={3} value={subject.Description} onChange={(e)=>updateSubject(e,'Description')}></TextareaAutosize>
            <h4>Body:</h4>
            <TextareaAutosize className='textarea' minRows={5} value={subject.Body} onChange={(e)=>updateSubject(e,'Body')}></TextareaAutosize>
            <br/>
            <p><b>Author: </b>{profile.UserID}</p>
        </Stack>
        </>
        )
}
