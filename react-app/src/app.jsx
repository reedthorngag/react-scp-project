import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './css/css.css';

import Nav from './sections/nav.jsx';
import Test from './pages/test.jsx';
import Main from './pages/main/main.jsx';
import UpdateUserID from './pages/update-user-id.jsx';

export default function App() {
    return (
        <>
        <Nav />
        <Routes>
            <Route exact path="/" element={<Main/>}></Route>
            <Route exact path="/login" element={<Test/>}></Route>
            <Route exact path="/updateUserId" element={<UpdateUserID/>}></Route>
        </Routes>
        </>
    )
}

