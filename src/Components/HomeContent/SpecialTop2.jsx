import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'

var lazyloaded = false
export default function SpecialTop2() {

    const [state2, setState2] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateSpecial3.json`)
            .then(({ data }) => {
                if (data.data.length > 0) {
                    setState2(data.data.slice(0,2));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])

    return (
        <>
            <div className="DHomeLeadListSpecialSec">
                <div className="row">
                    {state2.map((nc) => {
                        return (
                            <div className="col-lg-6 col-12 d-flex border-right-inner" key={nc.ContentID}>
                                <div className="DHomeLeadListSpecial align-self-stretch">
                                    <a href={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                        <div className="row">
                                            <div className="col-md-8 col-8">
                                                <div className="Desc">
                                                    <h3 className="Title"><span className="subheadTitle">{nc.CategoryName + "" + " /"}</span>{nc.ContentHeading}</h3>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-4">
                                                <div className="DImgZoomBlock">
                                                    <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img-fluid img100" />
                                                        {nc.ShowVideo === 1 && <div className="card-video-icon transition" ><i className="fa-solid fa-play"></i></div>}
                                                    </picture>

                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        )
                    }

                    )}
                </div>
            </div>

        </>

    )
}
