import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { scrollTop, ForLazyLoaderImg, banglaDateConvetar } from '../AllFunctions'
import ErrorPage from "../ErrorPage";
import SocialShare from "../SocialShare";
// import VideoLatestPopularNews from "./VideoLatestPopularNews";
import Ads from '../../assets/media/Advertisement/18058797247224877917.png'
import RLoader from "../RLoader";
var lazyloaded = false
export default function VideoDetails() {
    let { vdoSlug, vdoID } = useParams();
    const [VideoDetails, setVideoDetails] = useState([]);
    const [videosList, setVideosList] = useState([]);

    // const [videosLatestNews, setVideosLatestNews] = useState([]);
    // const [videosPopularNews, setVideosPopularNews] = useState([]);
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        setTimeout(() => { window.location.reload(1); }, 300000);
        setisLoading(true)
        setTimeout(() => { setisLoading(false) }, 300);
        axios
            .get(`${process.env.REACT_APP_API_URL}videos-details/${vdoID}`)
            .then(({ data }) => {
                setisLoading(false)
                setVideoDetails(data.VideoDetails[0])
                console.log(data.VideoDetails[0]);
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
                // axios
                //     .get(`${process.env.REACT_APP_API_URL}webtv-category-video-latest/${data.VideoDetails[0].CategoryID}/10`)
                //     .then(({ data }) => {
                //         setVideosLatestNews(data.categoryWiseLatestVideo)
                //     })
                // axios
                //     .get(`${process.env.REACT_APP_API_URL}webtv-category-video-popular/${data.VideoDetails[0].CategoryID}/10`)
                //     .then(({ data }) => {
                //         setVideosPopularNews(data.categoryWisePopularVideo)
                //     })
            })
        axios
            .get(`${process.env.REACT_APP_API_URL}details-video-latest/4/${vdoID}`)
            .then(({ data }) => {
                setVideosList(data.allLatestVideos);
            })
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
    }, [vdoSlug, vdoID])

    if (!localStorage.getItem('VideoView_' + vdoID)) {
        localStorage.setItem('VideoView_' + vdoID, 1);
        axios
            .get(`${process.env.REACT_APP_API_URL}video-hit-count/${vdoID}`)
            .then(({ data }) => {
            })
    }//vidio hit
    return (
        <>
            {VideoDetails ?
                <main>
                    {isLoading===false ?
                    <>
                    <h2 className="DTitle">
                        <Link to="/video" onClick={scrollTop}>
                            <span className="DTitleInner"><span className="DTitleInnerBar"><span>ভিডিও গ্যালারি</span></span></span>
                        </Link>
                        <DocumentTitle title={VideoDetails.WebTVHeading} />
                    </h2>
                    <div className="container">
                        <div className="DVideoDetailsArea mb-5 mt-4">
                            <div className="row">
                                <div className="col-lg-8 col-12 border-right-inner">
                                    <h1 className="Title BGTitle fw-bold my-2" style={{ fontSize: '26px', lineHeight: '38px' }}>
                                        {/* <Link to={'/video/cat/' + VideoDetails.Slug} onClick={scrollTop}>
                                            {VideoDetails.WebTVHeading}
                                        </Link> */}
                                        {VideoDetails.WebTVHeading}
                                    </h1>
                                    <div className="DVideoDetailsFrame" key={VideoDetails.WebTVHeading}>
                                        <div className="col-sm-12 video-container">
                                            {VideoDetails.SourceType === "1" || VideoDetails.SourceType === 1 ?
                                                <iframe className="embed-responsive-item" title={VideoDetails.WebTVHeading} src={"https://www.youtube.com/embed/" + VideoDetails.WebTVLinkCode + "?autoplay=1"} frameBorder="0" webkitallowfullscreen='true' mozallowfullscreen='true' allowFullScreen></iframe>
                                                : VideoDetails.SourceType === "2" || VideoDetails.SourceType === 2 ?
                                                    <iframe src={"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F" + VideoDetails.WebTVLinkCode + "%2F&show_text=0&width=560"} title={VideoDetails.WebTVHeading} width="560" height="315" style={{ border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>
                                                    // : VideoDetails.SourceType === "3" || VideoDetails.SourceType === 3 ?
                                                    //     <iframe src={"https://player.vimeo.com/video/" + VideoDetails.WebTVLinkCode} title={VideoDetails.WebTVHeading} frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen='true' allowFullScreen></iframe>
                                                        : false}
                                        </div>
                                    </div>
                                    <div className="mt-4 d-contents d-sm-flex justify-content-between align-items-center">
                                        <p className="VideoPublishDate mt-2"> <span>প্রকাশিত:</span> {VideoDetails.create_date? banglaDateConvetar((VideoDetails.create_date).toString()) : ""} </p>
                                        <SocialShare title={VideoDetails.WebTVHeading} />
                                    </div>
                                    {VideoDetails.Remarks &&
                                        <div className="Brief"><p dangerouslySetInnerHTML={{ __html: VideoDetails.Remarks }} /></div>
                                    }
                                </div>

                                <div className="col-lg-4 col-12">
                                    {/* <VideoLatestPopularNews vCatSlug={VideoDetails.Slug} videosLatestNews={videosLatestNews} videosPopularNews={videosPopularNews} /> */}
                                    <div className="DAdd2 d-flex  justify-content-center">
                                        <Link to="#">
                                            <img data-src={Ads} alt="Header Advertisement" title="Header Advertisement" className="img-fluid img100" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="DVideoCatListTop4 mb-5">
                            <div className="SectionSBorder2">
                                <div className="SPSecTitle">
                                    <h2>আরও দেখুন</h2>
                                </div>
                            </div>
                            <div className="row">
                                {videosList.map((nc) => {
                                    return (
                                        <div className="col-lg-3 col-12 d-flex" key={nc.WebTVID}>
                                            <div className="DVideoCatListTop4List align-self-stretch">
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
                    </>
                    :
                    <RLoader />
                    }
                    
                </main>
                : <ErrorPage />}
        </>
    )
}
