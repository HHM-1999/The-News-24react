import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
// import LeadTopSlider from './LeadTopSlider'
var lazyloaded = false
export default function Sports() {
    const [sports, setSports] = useState([])
    const [sports2, setSports2] = useState([])


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateCategory6.json`)
            .then(({ data }) => {

                setSports(data.data.slice(0, 2))
                setSports2(data.data.slice(2, 6))

                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);


            })
    }, [])
    return (
        <>
            <div className="SectionTitle"><h3><Link to="/sports"><span className="ColorBox"></span>ক্রীড়াঙ্গন</Link></h3></div>
            <div className="DSports">
                <div className="row">
                    <div className="col-lg-8 col-12 ">
                        <div className="row">
                            {sports.map((nc) => {
                                return (
                                    <div className="col-lg-6 col-12  mt-3">
                                        <div className="DSportsTop">
                                            <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop}>
                                                <div className="Imgresize">
                                                    <figure className="ImgViewer">
                                                        <picture className="FixingRatio">
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img-fluid img100 ImgRatio" />
                                                            {nc.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}
                                                        </picture>
                                                    </figure>
                                                </div>
                                                <div className="Desc">
                                                    <div className="NewsTitle">
                                                        {/* <h3 className="Title">{nc.ContentHeading}</h3> */}
                                                        {nc.ContentSubHeading == null ?
                                                            <h3 className="Title">{nc.ContentHeading} </h3> :
                                                            <h3 className="Title"> <span className="subheadTitle">{nc.ContentSubHeading + " /"}</span> {nc.ContentHeading} </h3>
                                                        }

                                                    </div>
                                                    <div className="Brief"><p>{nc.ContentBrief}</p></div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                    <div className="col-lg-4 col-12  ">
                        <div className="DSportsTop2">
                            {sports2.map((nc) => {
                                return (
                                    <div className="DSportsTop2List  mt-2">
                                        <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop}>
                                            <div className="row">
                                                <div className="col-4">
                                                    <div className="Imgresize">
                                                        <figure className="ImgViewer">
                                                            <picture className="FixingRatio">
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img-fluid img100 ImgRatio" />
                                                                {nc.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}
                                                            </picture>
                                                        </figure>
                                                    </div>
                                                </div>
                                                <div className="col-8">
                                                    <div className="Des8">
                                                        {/* <h2 className="Title">{nc.ContentHeading}</h2> */}
                                                        {nc.ContentSubHeading == null ?
                                                            <h2 className="Title">{nc.ContentHeading} </h2> :
                                                            <h2 className="Title"> <span className="subheadTitle">{nc.ContentSubHeading + " /"}</span> {nc.ContentHeading} </h2>
                                                        }

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
            </div>
        </>

    )
}
