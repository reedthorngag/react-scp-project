import React from 'react';
import { Link } from 'react-router-dom';

import Content from './content.jsx';

export default (props) => {
    return (
        <>
        <Content profile={props.profile}/>
        </>
    )
}