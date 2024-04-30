import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
var lazyloaded = false

export default function Entertaiment() {
    const [state, setState] = useState([])
    const [state2, setState2] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateCategory5.json`)
            .then(({ data }) => {
                if (data.data.length > 0) {
                    setState(data.data[0]);
                    setState2(data.data.slice(1, 5));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])
    return (
        <div className="col-lg-9 col-12">
            <div className="SectionSBorder2">
                <div className="SPSecTitle">
                    <Link to="/entertainment" onClick={scrollTop}>
                        <h2>এখন আনন্দ</h2>
                    </Link>
                </div>
            </div>
            <div className="DEntertainMent">
                <div className="row">
                    <div className="col-lg-8 col-12">
                        <div className="DEntertainMentTop">
                            <Link to={"/" + state.Slug + "/news/" + state.ContentID} onClick={scrollTop}>
                                <div className="row">
                                    <div className="col-lg-8 col-12">
                                        <div className="DImgZoomBlock">
                                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + state.ImageBgPath} alt={state.ContentHeading} title={state.ContentHeading} /></picture>
                                            {state.ShowVideo === 1 && <div className="card-video-iconTop"><i className="fa-solid fa-play"></i></div>}
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12">
                                        <div className="Desc">
                                            <h3 className="Title BGTitle">{state.ContentHeading}</h3>
                                            <div className="Brief">
                                                <p>{state.ContentBrief}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {state2.map((nc) => {
                        return (
                            <div className="col-lg-4 col-12 d-flex" key={nc.ContentID}>
                                <div className="DEntertainMentList align-self-stretch">
                                    <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                        <div className="row">
                                            <div className="col-lg-12 col-sm-3 col-5">
                                                <div className="DImgZoomBlock">
                                                    <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} /></picture>
                                                    {nc.ShowVideo === 1 && <div className="card-video-iconTop"><i className="fa-solid fa-play"></i></div>}
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-sm-9 col-7 textBorder2">
                                                <div className="Desc">
                                                    <h3 className="Title">{nc.ContentHeading}</h3>
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
    )
}
