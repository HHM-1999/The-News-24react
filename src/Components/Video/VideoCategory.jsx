import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
// import VPopularNews from "./VPopularNews";
// import Ads from '../../assets/media/Advertisement/18058797247224877917.png'
import ErrorPage from "../ErrorPage";
var lazyloaded = false
var leadLimit = 14
var limit = 8
var offset = 0
export default function VideoCategory() {
    let { vdoSlug } = useParams();
    const [VideoName, setVideoName] = useState([]);

    const [leadVideoTop, setLeadVideoTop] = useState([]);
    const [leadVideos1, setLeadVideos1] = useState([]);
    const [leadVideos2, setLeadVideos2] = useState([]);

    const [VideoMore, setVideoMore] = useState([]);

    const [popularVideos, setPopularVideos] = useState([]);

    const [showBtnForMoreNews, setShowBtnForMoreNews] = useState(true);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}webtv-category/${vdoSlug}`)
            .then(({ data }) => {
                setVideoName(data.category)
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
                axios
                    .get(`${process.env.REACT_APP_API_URL}webtv-category-video-popular/${data.category.CategoryID}/10`)
                    .then(({ data }) => {
                        setPopularVideos(data.categoryWisePopularVideo);
                    });
                offset = leadLimit
                axios
                    .get(`${process.env.REACT_APP_API_URL}webtv-category-video-id/${data.category.CategoryID}/${leadLimit}/0`)
                    .then(({ data }) => {
                        setLeadVideoTop(data.webtvCategory_video[0])
                        setLeadVideos1(data.webtvCategory_video.slice(1, 3))
                        setLeadVideos2(data.webtvCategory_video.slice(3, 6))
                        setVideoMore(data.webtvCategory_video.slice(6, 14))
                        if (data.webtvCategory_video.length < limit) {
                            setShowBtnForMoreNews(false)
                        }
                    })
            })
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        return () => clearTimeout(timer);
    }, [vdoSlug])

    const toggleButtonState = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}webtv-category-video-id/${leadVideoTop.CategoryID}/${limit}/${offset}`)
            .then(({ data }) => {
                if (data.webtvCategory_video.length < limit) {
                    setShowBtnForMoreNews(false)
                }
                for (let i = 0; i < data.webtvCategory_video.length; i++) {
                    setVideoMore(oldArray => [...oldArray, data.webtvCategory_video[i]]);
                }
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
                offset += limit
            });
    };
    return (
        <>
            {VideoName ?
                <main>
                    <div className="container">
                        <h2 className="DTitle">
                            <Link to={+ '/'} onClick={scrollTop}>
                                <span className="DTitleInner"><span className="DTitleInnerBar"><span>{leadVideoTop.CategoryName}</span></span></span>
                            </Link>
                            <DocumentTitle title={leadVideoTop.CategoryName} />
                        </h2>

                        <div className="DVideoTopArea">
                            <div className="row">
                                <div className="col-lg-8 col-12 border-right-inner">
                                    <div className="row">
                                        <div className="col-lg-8 col-12 d-flex border-right-inner">
                                            <div className="DVideoCatTopInner align-self-stretch">
                                                <Link to={"/video/show/" + leadVideoTop.WebTVID} onClick={scrollTop}>
                                                    <div className="DImgZoomBlock">
                                                        <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={'https://img.youtube.com/vi/' + leadVideoTop.WebTVLinkCode + '/maxresdefault.jpg'} alt={leadVideoTop.WebTVHeading} title={leadVideoTop.WebTVHeading} /></picture>
                                                        <div className="card-videoGallery-icon"><i className="fa-solid fa-play"></i></div>
                                                    </div>
                                                    <div className="Desc">
                                                        <h3 className="Title BGTitle">{leadVideoTop.WebTVHeading}</h3>
                                                        <div className="Brief">
                                                            <p dangerouslySetInnerHTML={{ __html: leadVideoTop.Remarks }}></p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-12">
                                            {leadVideos1.map((nc) => {
                                                return (
                                                    <div className="DVideoCatListTop2List align-self-stretch" key={nc.WebTVID}>
                                                        <Link to={"/video/show/" + nc.WebTVID} onClick={scrollTop}>
                                                            <div className="row">
                                                                <div className="col-lg-12 col-sm-4 col-5">
                                                                    <div className="DImgZoomBlock">
                                                                        <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={'https://img.youtube.com/vi/' + nc.WebTVLinkCode + '/maxresdefault.jpg'} alt={nc.WebTVHeading} title={nc.WebTVHeading} /></picture>
                                                                        <div className="card-videoGallery-icon"><i className="fa-solid fa-play"></i></div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12 col-sm-8 col-7 textBorder2">
                                                                    <div className="Desc">
                                                                        <h3 className="Title">{nc.WebTVHeading}</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="DVideoCategoryTop border-top-inner">
                                        <div className="row">
                                            {leadVideos2.map((nc) => {
                                                return (
                                                    <div className="col-lg-4 col-12 d-flex border-right-inner" key={nc.WebTVID}>
                                                        <div className="DVideoTop2InnerList align-self-stretch">
                                                            <Link to={"/video/show/" + nc.WebTVID} onClick={scrollTop}>
                                                                <div className="row">
                                                                    <div className="col-lg-12 col-sm-4 col-5">
                                                                        <div className="DImgZoomBlock">
                                                                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={'https://img.youtube.com/vi/' + nc.WebTVLinkCode + '/maxresdefault.jpg'} alt={nc.WebTVHeading} title={nc.WebTVHeading} /></picture>
                                                                            <div className="card-videoGallery-icon"><i className="fa-solid fa-play"></i></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-12 col-sm-8 col-7 textBorder2">
                                                                        <div className="Desc">
                                                                            <h3 className="Title">{nc.WebTVHeading}</h3>
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
                                <div className="col-lg-4 col-12 VCAT">
                                    {/* <VPopularNews vdoPopular={popularVideos} /> */}
                                    <div className="DAdd2 d-flex  justify-content-center">
                                        <Link to="">
                                            <img src={"media/Advertisement/18058797247224877917.png"} alt="Header Advertisement" title="Header Advertisement" className="img-fluid img100" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="DVideoCategoryBottom">
                            <div className="row mt-5">
                                {VideoMore.map((nc) => {
                                    return (
                                        <div className="col-lg-3 col-12 d-flex" key={nc.WebTVID}>
                                            <div className="DVideoTop2InnerList align-self-stretch">
                                                <Link to={"/video/show/" + nc.WebTVID} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-sm-4 col-5">
                                                            <div className="DImgZoomBlock">
                                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={'https://img.youtube.com/vi/' + nc.WebTVLinkCode + '/maxresdefault.jpg'} alt={nc.WebTVHeading} title={nc.WebTVHeading} /></picture>
                                                                <div className="card-videoGallery-icon"><i className="fa-solid fa-play"></i></div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-sm-8 col-7 textBorder2">
                                                            <div className="Desc">
                                                                <h3 className="Title">{nc.WebTVHeading}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div> */}
                        {showBtnForMoreNews ?
                            <div id="btnDiv" className="text-center mt-4 mb-4"><button id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG" onClick={toggleButtonState}>সকল ভিডিও দেখুন</button></div>
                            : false}
                    </div>
                </main>
                : <ErrorPage />}
        </>
    )
}
