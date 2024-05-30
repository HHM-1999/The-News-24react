import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
import { Link } from 'react-router-dom'

var lazyloaded = false
export default function SpecialTop1() {

    const [state3, setState3] = useState([])
    useEffect(() => {

        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateSpecial2.json`)
            .then(({ data }) => {
                if (data.data) {
                    setState3(data.data.slice(0, 4));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])


    return (
        <>


            {state3.map((nc) => {
                return (
                    <div className="DHomeLeadList4 align-self-stretch" key={nc.ContentID}>
                        <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                            <div className="row">
                                <div className="col-lg-7 col-7">
                                    <div className="Desc">
                                        <h3 className="Title">{nc.ContentSubHeading ==1 && <span className="subheadTitle">{nc.ContentSubHeading  + "/"}</span> }{nc.ContentHeading}
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
                        </Link>
                    </div>
                )
            })}

        </>

    )
}
