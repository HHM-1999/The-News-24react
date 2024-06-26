import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AmpRouterLink from './AmpRouterLink';

export default function RouterLink() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/amp/*" element={<AmpRouterLink />} />
            </Routes>
        </BrowserRouter>
    )
}