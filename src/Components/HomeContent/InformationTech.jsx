import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
var lazyloaded = false

export default function InformationTech() {
    const [state, setState] = useState([])
    const [state2, setState2] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateCategory6.json`)
            .then(({ data }) => {
                if (data.data.length > 0) {
                    setState(data.data[0]);
                    setState2(data.data.slice(1, 3));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])
    return (
        <div className="col-lg-3 col-12">
            <div className="SectionSBorder2">
                <div className="SPSecTitle">
                    <Link to="/information-technology" onClick={scrollTop}>
                        <h2>তথ্য প্রযুক্তি</h2>
                    </Link>
                </div>
            </div>
            <div className="Economic">
                <div className="EconomicNews align-self-stretch">
                    <Link to={"/" + state.Slug + "/news/" + state.ContentID} onClick={scrollTop}>
                        <div className="DImgZoomBlock card-video">
                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + state.ImageSmPath} alt={state.ContentHeading} title={state.ContentHeading} /></picture>
                            {state.ShowVideo === 1 && <div className="card-video-iconTop"><i className="fa-solid fa-play"></i></div>}
                        </div>
                        <div className="Desc">
                            <h3 className="Title BGTitle">{state.ContentHeading}</h3>
                        </div>
                    </Link>
                </div>
                {state2.map((nc) => {
                    return (
                        <div className="DTop3List" key={nc.ContentID}>
                            <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                <div className="row">
                                    <div className="col-lg-5 col-sm-3 col-5">
                                        <div className="DImgZoomBlock">
                                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.ContentHeading} title={nc.ContentHeading} /></picture>
                                            {nc.ShowVideo === 1 && <div className="card-video-iconTop"><i className="fa-solid fa-play"></i></div>}
                                        </div>
                                    </div>
                                    <div className="col-lg-7 col-sm-9 col-7 textBorder2">
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
    )
}
