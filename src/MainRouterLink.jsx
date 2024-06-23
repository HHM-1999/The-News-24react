import React from 'react'
import {  Routes, Route } from "react-router-dom";
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Components/Home'
import OnlinePollDetails from './Components/OnlinePollDetails';
import Category from './Components/Category/Category';
import SubCategory from './Components/Category/SubCategory';
import Details from './Components/DetailsPage/Details';
import ErrorPage from './Components/ErrorPage';
import Archives from './Components/Archives';
import TagPage from './Components/Tags/TagPage';
import AllTagList from './Components/Tags/AllTagList';
import WritersPage from './Components/Writers/WritersPage';
import AllWriters from './Components/Writers/AllWriters';
import VideoGallery from './Components/Video/VideoGallery';
import VideoCategory from './Components/Video/VideoCategory';
import VideoDetails from './Components/Video/VideoDetails';
import DivisionSlug from './Components/Country/DivisionSlug';
import DistrictSlug from './Components/Country/DistrictSlug';
import Live from './Components/Live';
import CategoryPhotoFeature from './Components/Photo-features/CategoryPhotoFeature';
import DetailsPhotoFeature from './Components/Photo-features/DetailsPhotoFeature';
import SearchResult from './Components/SearchResult';
import AboutUs from './Components/AboutUs';
import PrivacyPolicy from './Components/Privacy-policy';
import Terms from './Components/Terms'
import AdvertisementPage from './Components/AdvertisementPage';
import DPrayerTime from './Components/DPrayerTime';


export default function MainRouterLink() {
    return (
        <div className="main-site">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutUs" element={<AboutUs />} />

                <Route path="/live" element={<Live />} />
                <Route path="/pollresult" element={<OnlinePollDetails />} />
                <Route path="/archives" element={<Archives />} />
                <Route path="/:catSlug" element={<Category />} />
                <Route path="/:catSlug/:subCatSlug" element={<SubCategory />} />
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
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-service" element={<Terms />} />
                <Route path="/advertise" element={<AdvertisementPage />} />
                <Route path="/namaj" element={<DPrayerTime />} />

                <Route path="/*" element={<ErrorPage />} />

            </Routes>
            <Footer />
        </div>


    )
}