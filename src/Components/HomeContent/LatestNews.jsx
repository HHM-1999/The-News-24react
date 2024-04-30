import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
var lazyloaded = false
export default function LatestNews() {
    const [state, setState] = useState([])
    const [state2, setState2] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateLatest.json`)
            .then(({ data }) => {
                if (data.data.length > 0) {
                    setState(data.data.slice(0, 3));
                    setState2(data.data.slice(3, 6));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])
    return (
        <>
            <div className="col-lg-9 col-12">
                <h2 className="LatestNewsH"><Link to="/archives" onClick={scrollTop}>সর্বশেষ</Link></h2>
                <div className="row">
                    <div className="col-lg-6 col-12">
                        <div className="DTop3">
                            {state.map((nc) => {
                                return (
                                    <div className="DTop3List homePage" key={nc.ContentID}>
                                        <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                            <div className="row">
                                                <div className="col-lg-4 col-sm-3 col-5">
                                                    <div className="DImgZoomBlock">
                                                        <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.ContentHeading} title={nc.ContentHeading} /></picture>
                                                        {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                    </div>
                                                </div>
                                                <div className="col-lg-8 col-sm-9 col-7 textBorder2">
                                                    <div className="Desc textBorder">
                                                        <h3 className="Title BGTitle">{nc.ContentHeading}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-lg-6 col-12">
                        <div className="DTop3">
                            {state2.map((nc) => {
                                return (
                                    <div className="DTop3List homePage" key={nc.ContentID}>
                                        <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                            <div className="row">
                                                <div className="col-lg-4 col-sm-3 col-5">
                                                    <div className="DImgZoomBlock">
                                                        <picture>
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.ContentHeading} title={nc.ContentHeading} />
                                                        </picture>
                                                        {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                    </div>
                                                </div>
                                                <div className="col-lg-8 col-sm-9 col-7 textBorder2">
                                                    <div className="Desc textBorder">
                                                        <h3 className="Title BGTitle">{nc.ContentHeading}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="extraBtn SectionSBorder MShow">
                    <Link to="/archives" onClick={scrollTop}>
                        <p className="readMore">আরও পড়ুন</p>
                        <i className="fa-solid fa-sort-down"></i>
                    </Link>
                </div>
            </div>
        </>
    )
}
