import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './css/app.css';

import Nav from './sections/nav.js';
import Test from './pages/test.js';
import Main from './pages/main/main.js';

export default function App() {
    return (
        <>
        <Nav />
        <Routes>
            <Route exact path="/" element={<Main/>}></Route>
            <Route exact path="/login" element={<Test/>}></Route>
        </Routes>
        </>
    )
}

