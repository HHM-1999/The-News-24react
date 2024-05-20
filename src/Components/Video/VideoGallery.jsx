import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
import Ads from '../../assets/media/Advertisement/Advertisement (300X250).png'
import RLoader from "../RLoader";
var lazyloaded = false
var limit = 8
var offset = 0
export default function VideoGallery() {
    const [leadVideoTop, setLeadVideoTop] = useState([]);
    const [leadVideos, setLeadVideos] = useState([]);
    const [state3, setState3] = useState([])
    const [showBtnForMoreNews, setShowBtnForMoreNews] = useState(true);
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {

        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        setTimeout(() => { window.location.reload(1); }, 300000);
        setisLoading(true)
        setTimeout(() => { setisLoading(false) }, 300);

        axios
            .get(`${process.env.REACT_APP_API_URL}videos/16`)
            .then(({ data }) => {
                if (data.webVideos.length > 0) {
                    setisLoading(false)
                    setLeadVideoTop(data.webVideos[0])
                    setLeadVideos(data.webVideos.slice(1, 4))
                    setState3(data.webVideos.slice(4, 12))
                    if (data.webVideos.length < limit) {
                        setShowBtnForMoreNews(false)
                    }
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            })
    }, [])

    const toggleButtonState = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}webtv-category-video-id/${leadVideoTop.CategoryID}/${limit}/${offset}`)
            .then(({ data }) => {
                if (data.webtvCategory_video.length < limit) {
                    setShowBtnForMoreNews(false)
                }
                for (let i = 0; i < data.webtvCategory_video.length; i++) {
                    setState3(oldArray => [...oldArray, data.webtvCategory_video[i]]);
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
            <main>
            {isLoading===false ? 
                <div className="container">
                    <h2 className="DTitle">
                        <Link to={+ '/'} onClick={scrollTop}>
                            <span className="DTitleInner"><span className="DTitleInnerBar"><span>ভিডিও গ্যালারি</span></span></span>
                        </Link>
                        <DocumentTitle title='দ্য নিউজ ২৪ :: ভিডিও গ্যালারী' />
                    </h2>

                    <div className="DVideoTopArea">
                        <div className="row">
                            <div className="col-lg-8 col-12" style={{borderRight: "1px solid #e2e2e2" ,paddingRight:"20px"}}>
                                <div className="DVideoTopInner">
                                    <Link to={"/video/show/" + leadVideoTop.WebTVID} onClick={scrollTop}>
                                        <div className="row">
                                            <div className="col-lg-8 col-12">
                                                <div className="DImgZoomBlock">
                                                    <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={'https://img.youtube.com/vi/' + leadVideoTop.WebTVLinkCode + '/maxresdefault.jpg'} alt={leadVideoTop.WebTVHeading} title={leadVideoTop.WebTVHeading} /></picture>
                                                    <div className="card-videoGallery-icon"><i className="fa-solid fa-play"></i></div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="Desc">
                                                    <div className="NewsTitle">
                                                        <h3 className="Title">{leadVideoTop.WebTVHeading}</h3>
                                                    </div>
                                                    <div className="Brief">
                                                        <p dangerouslySetInnerHTML={{ __html: leadVideoTop.Remarks }}></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="DVideoTop2Inner border-top-inner">
                                    <div className="row">
                                        {leadVideos.map((nc) => {
                                            return (
                                                <div className="col-lg-4 col-12 " key={nc.WebTVID}>
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
                            <div className="col-lg-4 col-12 " >
                                {/* <VPopularNews vdoPopular={popularVideos} /> */}
                                <div className=" d-flex   justify-content-center">
                                    <Link to="#">
                                        <img src={Ads} alt="Header Advertisement" title="Header Advertisement" className="img-fluid img100" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="DVideoTop2Inner mt-5">
                            <div className="row">
                                {state3.map((nc) => {
                                    return (
                                        <div className="col-lg-3 col-12  " key={nc.WebTVID}>
                                            <div className="DVideoTop2InnerList align-self-stretch">
                                                <Link to={"/video/show/" + nc.WebTVID} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-sm-4 col-5 videoIcon">
                                                            <div className="DImgZoomBlock">
                                                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={"https://img.youtube.com/vi/" + nc.WebTVLinkCode + "/0.jpg"} alt={nc.WebTVHeading} title={nc.WebTVHeading} className="img-fluid img100" /></picture>
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
                    {showBtnForMoreNews ?
                        <div id="btnDiv" className="text-center mt-4 mb-4"><button id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG" onClick={toggleButtonState}>সকল ভিডিও দেখুন</button></div>
                        : false}



                    {/* <VideoCat1 state={videoCat} /> */}
                </div>
                : <RLoader />}
            </main>
        </>
    )
}
