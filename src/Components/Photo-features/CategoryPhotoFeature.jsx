import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DocumentTitle from "react-document-title";
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
// import LatestPopularNews from '../Category/LatestPopularNews';
import LeadLatestNews from '../HomeContent/LeadLatestNews';
import RLoader from '../RLoader';

var lazyloaded = false
var showMore = true
var limit = 8
var offset = 5
var InnerSpecialContents
var formData = []
export default function CategoryPhotoFeature() {
    const [catNewsMore, setcatLeadMore] = useState([])

    const [catLeadNews1, setcatLeadNews1] = useState([])
    const [catLeadNews2, setcatLeadNews2] = useState([])
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        setTimeout(() => { window.location.reload(1); }, 300000);
        setisLoading(true)
        setTimeout(() => { setisLoading(false) }, 300);
        offset = 0
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generatePhotoFeature.json`)
            .then(({ data }) => {
                if (data.data) {
                    setisLoading(false)
                    setcatLeadNews1(data.data[0]);
                    setcatLeadNews2(data.data.slice(1, 5));
                    // leadNews position array ------ start
                    InnerSpecialContents = ``
                    for (let i = 0; i < 5; i++) {
                        if (data.data[i].PhotoFeatureID) {
                            InnerSpecialContents = InnerSpecialContents + `${data.data[i].PhotoFeatureID}`
                            if (data.data.length !== i + 1) {
                                InnerSpecialContents = InnerSpecialContents + `, `
                            }
                        }
                    }
                    InnerSpecialContents = InnerSpecialContents + ``
                }
                // leadNews position array------end
                formData = { 'limit': limit, 'offset': 0, 'InnerSpecialContents': InnerSpecialContents }
                axios
                    .post(`${process.env.REACT_APP_API_URL}photo-feature`, formData)
                    .then(({ data }) => {
                        if (data.data) {
                            setcatLeadMore(data.data);
                            showMore = true
                            if (data.data.length < limit) {
                                showMore = false
                            }
                            setTimeout(function () {
                                lazyloaded = false
                                ForLazyLoaderImg(lazyloaded)
                            }, 1000);
                        }
                    });
            });
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        return () => clearTimeout(timer);
    }, [])

    const toggleButtonState = () => {
        offset += limit
        showMore = true
        formData = { 'limit': limit, 'offset': offset, 'InnerSpecialContents': InnerSpecialContents }
        axios
            .post(`${process.env.REACT_APP_API_URL}photo-feature`, formData)
            .then(({ data }) => {
                if (data.data) {
                    if (data.data.length < limit) {
                        showMore = false
                    }
                    for (let i = 0; i < data.data.length; i++) {
                        setcatLeadMore(oldArray => [...oldArray, data.data[i]]);
                    }
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    };
    return (
        <>
            <main>
            {isLoading === false ? 
                <div className="container">
                    <h2 className="DTitle">
                        <Link to={+ '/'} onClick={scrollTop}>
                            <span className="DTitleInner"><span className="DTitleInnerBar"><span>ছবিঘর</span></span></span>
                        </Link>
                        <DocumentTitle title="ছবিঘর | ছবিঘর সর্বশেষ খবর :: দ্য নিউজ ২৪" />
                    </h2>

                    <section>
                        <div className="PhotoGallery page mt-4">
                            <div className="row">
                                <div className="col-lg-6 col-12">
                                    <div className="PhotoGalleryTop">
                                        <Link to={"/photo-feature/news/" + catLeadNews1.PhotoFeatureID} onClick={scrollTop}>
                                            <div className="DImgZoomBlock">
                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + catLeadNews1.ImageBgPath} width={513} height={389} alt={catLeadNews1.PhotoFeatureTitle} title={catLeadNews1.PhotoFeatureTitle} /></picture>
                                                <div className="card-video-icon"><i className="fa-solid fa-camera"></i></div>
                                            </div>
                                            <div className="Desc">
                                                <h3 className="Title BGTitle">{catLeadNews1.PhotoFeatureTitle}</h3>
                                                <div className="Brief">
                                                    <p>{catLeadNews1.ShortBrief}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-12">
                                    <div className="row">
                                        {catLeadNews2.map((nc) => {
                                            return (
                                                <div className="col-lg-6 col-12 d-flex" key={nc.PhotoFeatureID}>
                                                    <div className="PhotoGalleryList align-self-stretch">
                                                        <Link to={"/photo-feature/news/" + nc.PhotoFeatureID} onClick={scrollTop}>
                                                            <div className="row">
                                                                <div className="col-lg-12 col-sm-3 col-5">
                                                                    <div className="DImgZoomBlock">
                                                                        <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} width={353} height={198} alt={nc.PhotoFeatureTitle} title={nc.PhotoFeatureTitle} /></picture>
                                                                        <div className="card-video-icon"><i className="fa-solid fa-camera"></i></div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12 col-sm-9 col-7 textBorder2">
                                                                    <div className="Desc">
                                                                        <h3 className="Title">{nc.PhotoFeatureTitle}</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="DBannerAdd">
                        <Link to="/">
                            <img src="/media/Advertisement/Advertisement(970X90).png" alt="Advertisement" title="Advertisement"
                                className="img-fluid img100" />
                        </Link>
                    </div>

                    <section>
                        <div className="row">
                            <div className="col-lg-9 col-sm-12">
                                <h2 className="LatestNewsH mt-4">ছবিঘর বিভাগের সব খবর</h2>
                                <section className="DCatNewsListArea">
                                    <div className="row">
                                        {catNewsMore.map((nc) => {
                                            return (
                                                <div className="col-lg-6 col-12 d-flex" key={nc.PhotoFeatureID}>
                                                    <div className="DCatNewsList align-self-stretch">
                                                        <Link to={"/photo-feature/news/" + nc.PhotoFeatureID} onClick={scrollTop}>
                                                            <div className="row">
                                                                <div className="col-lg-5 col-sm-4 col-5">
                                                                    <div className="DImgZoomBlock">
                                                                        <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.PhotoFeatureTitle} title={nc.PhotoFeatureTitle} /></picture>
                                                                        <div className="card-video-icon"><i className="fa-solid fa-camera"></i></div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-7 col-sm-8 col-7">
                                                                    <div className="Desc">
                                                                        <h3 className="Title">{nc.PhotoFeatureTitle}</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </section>
                                {showMore ?
                                    <div id="btnDiv" className="text-center mt-4 mb-4"><button id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG" onClick={toggleButtonState}>আরো পড়ুন</button></div>
                                    : false}
                            </div>
                            <div className="col-lg-3 col-sm-12">
                                {/* <LatestPopularNews /> */}
                                <LeadLatestNews />
                            </div>
                        </div>
                    </section>

                </div>
                :
                <RLoader />}
            </main>
        </>
    )
}
