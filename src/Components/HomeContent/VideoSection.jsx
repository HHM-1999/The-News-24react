import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
var lazyloaded = false

export default function VideoSection() {
    const [state, setState] = useState([])
    const [state2, setState2] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}videos/7`)
            .then(({ data }) => {
                if (data.webVideos.length > 0) {
                    setState(data.webVideos[0]);
                    setState2(data.webVideos.slice(1, 7));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])
    return (
        <div className="VideoSection mt-5">
            <div className="container">
                <div className="SectionSBorder2">
                    <div className="SPSecTitle">
                        <Link to="/video" onClick={scrollTop}>
                            <h2>ভিডিও</h2>
                        </Link>
                    </div>
                </div>
                <div className="DVideoTopArea">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="DVideoTop">
                                <Link to={"/video/show/" + state.WebTVID} onClick={scrollTop}>
                                    <div className="row">
                                        <div className="col-lg-8 col-12">
                                            <div className="DImgZoomBlock">
                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={'https://img.youtube.com/vi/' + state.WebTVLinkCode + '/0.jpg'} width={406} height={228} alt={state.WebTVHeading} title={state.WebTVHeading} /></picture>
                                                <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-12">
                                            <div className="Desc">
                                                <h3 className="Title BGTitle">{state.WebTVHeading}</h3>
                                                <div className="Brief">
                                                    <p dangerouslySetInnerHTML={{ __html: state.Remarks }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        {state2.map((nc) => {
                            return (
                                <div className="col-lg-3 col-6 d-flex" key={nc.WebTVID}>
                                    <div className="DVideoTop2 align-self-stretch">
                                        <Link to={"/video/show/" + nc.WebTVID} onClick={scrollTop}>
                                            <div className="DImgZoomBlock">
                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={'https://img.youtube.com/vi/' + nc.WebTVLinkCode + '/0.jpg'} width={299} height={168} alt={nc.WebTVHeading} title={nc.WebTVHeading} /></picture>
                                                <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>
                                            </div>
                                            <div className="Desc">
                                                <h3 className="Title">{nc.WebTVHeading}</h3>
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
    )
}
