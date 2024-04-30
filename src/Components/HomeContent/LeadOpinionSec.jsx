import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'

var lazyloaded = false
export default function LeadOpinionSec() {

    const [state3, setState3] = useState([])
    useEffect(() => {

        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateSpecial2.json`)
            .then(({ data }) => {
                if (data.data.length > 0) {
                    setState3(data.data.slice(0, 2));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])


    return (
        <>

            <div className="DRightSideAdd">
                <a href="#">
                    <img src={"media/Advertisement/13982910857184178936.gif"} />
                </a>
            </div>
            {state3.map((nc) => {
                return (
                    <div className="DHomeLeadList3 align-self-stretch" key={nc.ContentID}>
                        <a href={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                            <div className="row">
                                <div className="col-lg-7 col-7">
                                    <div className="Desc">
                                        <h3 className="Title"><span>মতামত /</span>{nc.ContentHeading}
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-5">
                                    <div className="DImgZoomBlock">
                                        <picture><img
                                             src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img-fluid img100" />
                                              {nc.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}
                                        </picture>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                )
            })}

        </>

    )
}
