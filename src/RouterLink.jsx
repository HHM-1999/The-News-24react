import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainRouterLink from './MainRouterLink'
import AmpRouterLink from './AmpRouterLink';

export default function RouterLink() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<MainRouterLink />} />
                <Route path="/amp/*" element={<AmpRouterLink />} />
            </Routes>
        </BrowserRouter>
    )
}