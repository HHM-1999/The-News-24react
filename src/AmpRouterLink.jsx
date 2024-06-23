import React from 'react'
import {  Routes, Route } from "react-router-dom";
import Header from './ComponentsAmp/Header'
import Category from './ComponentsAmp/Category';
import Footer from './ComponentsAmp/Footer';
import Details from './ComponentsAmp/Details';
import SubCategory from './ComponentsAmp/SubCategory';

export default function AmpRouterLink() {
    return (
        <div className="amp-site">
            <Header />
            <Routes>
                 <Route path="/:catSlug" element={<Category />} />
                 <Route path="/:catSlug/news/:id" element={<Details />} />
                 <Route path="/:catSlug/:subCatSlug" element={<SubCategory />} />
            </Routes>
            <Footer />
        </div>


    )
}