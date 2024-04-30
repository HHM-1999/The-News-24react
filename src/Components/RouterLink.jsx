import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import OnlinePollDetails from './OnlinePollDetails';
import Category from './Category/Category';
import SubCategory from './Category/SubCategory';
import Details from './DetailsPage/Details';
import ErrorPage from './ErrorPage';
import Archives from './Archives';
import TagPage from './Tags/TagPage';
import AllTagList from './Tags/AllTagList';
import WritersPage from './Writers/WritersPage';
import AllWriters from './Writers/AllWriters';
import VideoGallery from './Video/VideoGallery';
import VideoCategory from './Video/VideoCategory';
import VideoDetails from './Video/VideoDetails';
import DivisionSlug from './Country/DivisionSlug';
import DistrictSlug from './Country/DistrictSlug';
import Live from './Live';
import CategoryPhotoFeature from './Photo-features/CategoryPhotoFeature';
import DetailsPhotoFeature from './Photo-features/DetailsPhotoFeature';
import SearchResult from './SearchResult';
import AboutUs from './AboutUs';


export default function RouterLink() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                
                <Route path="/live" element={<Live />} />
                <Route path="/pollresult" element={<OnlinePollDetails />} />
                <Route path="/archives" element={<Archives />} />
                <Route path="/:catSlug" element={<Category />} />
                <Route path="/:catSlug/sub/:subCatSlug" element={<SubCategory />} />
                <Route path="/:catSlug/news/:id" element={<Details />} />
                <Route path="/tags/:TagTitle" element={<TagPage />} />
                <Route path="/all_tags" element={<AllTagList />} />
                <Route path="/writers/:WriterSlug" element={<WritersPage />} />
                <Route path="/all_writers" element={<AllWriters />} />
                <Route path="/video" element={<VideoGallery />} />
                <Route path="/video/cat/:vdoSlug" element={<VideoCategory />} />
                <Route path="/video/show/:vdoID" element={<VideoDetails />} />
                <Route path="/divisions/:divisionSlug" element={<DivisionSlug />} />
                <Route path="/divisions/:divisionSlug/:dristrictSlug" element={<DistrictSlug />} />
                <Route path="/photo-feature" element={<CategoryPhotoFeature />} />
                <Route path="/photo-feature/news/:photoID" element={<DetailsPhotoFeature />} />
                <Route path="/search/:searchSlug" element={<SearchResult />} />
                <Route path="/*" element={<ErrorPage />} />

            </Routes>
            <Footer />
        </BrowserRouter>
    )
}