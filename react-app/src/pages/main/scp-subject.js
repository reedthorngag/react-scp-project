import { Box, Stack } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useRef } from "react";

export default (props) => {
    const subject = props.subject;

    const [content, setContent] = useState(subject.Description);
    const [background, setBackground] = useState("#00000030");
    const [scroll, setScrollPos] = useState( {value: window.scrollY,active:false})

    return (
        <>
        <Stack onClick={()=>{if (!scroll.active) setScrollPos({value: window.scrollY,active:true}); setContent(subject.Body.replace('${description}',subject.Description).replaceAll('\n','<br/>'))}}
                onMouseLeave={()=>{setContent(subject.Description.replaceAll('\n','<br/>'));setBackground("#00000030");
                    if (scroll.active) {window.scrollTo(0,scroll.value); scroll.active = false}
                }}
                onMouseEnter={()=>{setBackground("#00000045");}}
                direction={'column'} width={'80vw'} alignItems={'center'} sx={{border: '0.1vw solid black', background: background, padding: '0 4vw'}}>
            <h3>{subject.Title}</h3>
            <h4><b>Class: </b>{subject.Class}</h4><br/>
            <p dangerouslySetInnerHTML={{__html: content}}></p>
        </Stack>
        </>
    )
}
