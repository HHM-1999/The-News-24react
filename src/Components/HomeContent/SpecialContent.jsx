import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ForLazyLoaderImg, scrollTop } from '../AllFunctions'
var lazyloaded = false
export default function SpecialContent() {
    const [state, setState] = useState([])
    const [state2, setState2] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateCategory40.json`)
            .then(({ data }) => {
                if (data.data.length > 0) {
                    setState(data.data[0]);
                    setState2(data.data.slice(1, 4));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])
    return (
        <section>
            <div className="SectionSBorder2 mt-2">
                <div className="SPSecTitle">
                    <Link to="/special-report" onClick={scrollTop}>
                        <h2>বিশেষ প্রতিবেদন</h2>
                    </Link>
                </div>
            </div>
            <div className="DSpecial">
                <div className="row">
                    <div className="col-lg-4 col-12 d-flex">
                        <div className="DSpecialTop align-self-stretch">
                            <Link to={"/" + state.Slug + "/news/" + state.ContentID} onClick={scrollTop}>
                                <div className="DImgZoomBlock">
                                    <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + state.ImageBgPath} width={406} height={228} alt={state.ContentHeading} title={state.ContentHeading} /></picture>
                                    {state.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                </div>
                                <div className="Desc">
                                    <h3 className="Title BGTitle FW700">{state.ContentHeading}</h3>
                                    <div className="Brief">
                                        <p>{state.ContentBrief}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-8 col-12">
                        <div className="DSpecialTop2">
                            <div className="row">
                                {state2.map((nc) => {
                                    return (
                                        <div className="col-lg-4 col-sm-12 d-flex" key={nc.ContentID}>
                                            <div className="DSpecialList align-self-stretch">
                                                <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-sm-3 col-5">
                                                            <div className="DImgZoomBlock">
                                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} width={264} height={148} alt={nc.ContentHeading} title={nc.ContentHeading} /></picture>
                                                                {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-sm-9 col-7 textBorder2">
                                                            <div className="Desc">
                                                                <h3 className="Title FW700">{nc.ContentHeading}</h3>
                                                                <div className="Brief">
                                                                    <p>{nc.ContentBrief}</p>
                                                                </div>
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
            </div>
        </section>
    )
}
