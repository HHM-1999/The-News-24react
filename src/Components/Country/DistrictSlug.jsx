import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import { Link, useParams } from "react-router-dom";
import DocumentTitle from 'react-document-title';
import { scrollTop, banglaDateConvetar, ForLazyLoaderImg } from '../AllFunctions'
import DivisionDistricName from './DivisionDistricName';
import ErrorPage from '../ErrorPage';
// import LatestPopularNews from '../Category/LatestPopularNews';
import LeadLatestNews from '../HomeContent/LeadLatestNews';
// import RLoader from '../RLoader';

var lazyloaded = false
var limit = 10
var offset = 0
var Did
var LeadNewsLimit = 10
var InnerSpecialContents
var formData = []
export default function DistrictSlug() {
    const [isLoading, setisLoading] = useState(true)
    const [dristrictName, setDristrictName] = useState([])
    const [districtContentList, setDistrictContentList] = useState([])
    let { divisionSlug } = useParams();
    let { dristrictSlug } = useParams();
    const [showMore, setShowMore] = useState(true);
    useEffect(() => {
        setisLoading(true)
        window.scrollTo(0, 0)
        offset = 0
        axios
            .get(`${process.env.REACT_APP_API_URL}district-division-content/${divisionSlug}/${dristrictSlug}`)
            .then(({ data }) => {
                if (data.districtContent.content.length !== 0) {
                    // setisLoading(false)
                    setDristrictName(data.districtContent)
                    Did = data.districtContent.DistrictID
                    setDistrictContentList(data.districtContent.content);
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                    // leadNews position array ------ start
                    InnerSpecialContents = ``
                    for (let i = 0; i < data.districtContent.content.length; i++) {
                        if (data.districtContent.content[i].ContentID) {
                            InnerSpecialContents = InnerSpecialContents + `${data.districtContent.content[i].ContentID}`
                            if (data.districtContent.content.length !== i + 1) {
                                InnerSpecialContents = InnerSpecialContents + `, `
                            }
                        }
                    }
                    if (data.districtContent.content.length < LeadNewsLimit) {
                        let positionLength = data.districtContent.content.length
                        formData = { 'DistrictID': Did, 'limit': LeadNewsLimit - data.districtContent.content.length, 'offset': 0, 'InnerSpecialContents': InnerSpecialContents }
                        axios
                            .post(`${process.env.REACT_APP_API_URL}inner-district-content-more`, formData)
                            .then(({ data }) => {
                                if (data.inner_district_more_content) {
                                    for (let i = 0; i < data.inner_district_more_content.length; i++) {
                                        setDistrictContentList(oldArray => [...oldArray, data.inner_district_more_content[i]]);
                                    }
                                    offset += data.inner_district_more_content.length
                                    if (data.inner_district_more_content.length + positionLength < LeadNewsLimit) {
                                        setShowMore(false)
                                    }
                                    setTimeout(function () {
                                        lazyloaded = false
                                        ForLazyLoaderImg(lazyloaded)
                                    }, 1000);
                                }
                            });
                    }
                    // InnerSpecialContents = InnerSpecialContents + ``
                    // leadNews position array ------ end
                } else {
                    setDistrictContentList(null);
                }
            })
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        setTimeout(() => { window.location.reload(1); }, 300000);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);
    }, [divisionSlug, dristrictSlug])

    const toggleButtonState = () => {
        // offset += limit
        formData = { 'DistrictID': Did, 'limit': limit, 'offset': offset, 'InnerSpecialContents': InnerSpecialContents }
        axios
            .post(`${process.env.REACT_APP_API_URL}inner-district-content-more`, formData)
            .then(({ data }) => {
                if (data.inner_district_more_content) {
                    if (data.inner_district_more_content.length < limit) {
                        setShowMore(false)
                    }
                    for (let i = 0; i < data.inner_district_more_content.length; i++) {
                        setDistrictContentList(oldArray => [...oldArray, data.inner_district_more_content[i]]);
                    }
                    offset += limit
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    };

    return (
        <>
            {dristrictName ?
                <main>
                
                    <div className="container">
                        <div className="TopHomeSection"></div>
                        <h2 className="DTitle">
                            <DocumentTitle title={dristrictName.DistrictNameBn} />
                            <Link to={+"/"}><span className="DTitleInner"><span className="DTitleInnerBar"><span>{dristrictName.DistrictNameBn}</span></span></span></Link>
                        </h2>
                        <div className="row">
                            <div className="col-lg-9 col-sm-12 border-right-inner1">
                                <DivisionDistricName />
                                <div className="DivisionAllNews mt-3">
                                    <div className="row">
                                        {districtContentList && districtContentList.map((nc) => {
                                            return (
                                                <div className="col-lg-6 col-sm-12">
                                                    <div className="Division-panel">
                                                        <div className="DistrictListNews">
                                                            <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                                                <div className="row">
                                                                    <div className="col-lg-5 col-sm-4 col-5 card-video-part">
                                                                        <div className="DImgZoomBlock">
                                                                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} /></picture>
                                                                            {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-7 col-sm-8 col-7">
                                                                        <div className="Desc">
                                                                            <h3 className="Title">{nc.ContentHeading}</h3>
                                                                        </div>
                                                                        <span className="DateTime"> {banglaDateConvetar(format(new Date(nc.create_date), 'dd MMMM yyyy'))}</span>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                {showMore ?
                                    <div id="btnDiv" className="text-center mt-2 mb-4">
                                        <button id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG" onClick={toggleButtonState}>
                                            আরো পড়ুন
                                        </button>
                                    </div>
                                    : false}
                            </div>
                            <div className="col-lg-3 col-sm-12">
                                <div className="MarginBottom30">
                                <LeadLatestNews />
                                </div>
                            </div>
                        </div>
                    </div>
                 
                </main>
                : <ErrorPage />}
        </>
    )
}
