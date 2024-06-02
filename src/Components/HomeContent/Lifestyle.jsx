import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'

var lazyloaded = false
export default function Lifestyle() {
    const [lifeStyle, setLifeStyle] = useState([])
    const [lifeStyle2, setLifeStyle2] = useState([])


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateCategory11.json`)
            .then(({ data }) => {

                setLifeStyle(data.data.slice(0, 1))
                setLifeStyle2(data.data.slice(1, 4))

                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);


            })
    }, [])
    return (
        <>
            <div className="container">
                <div className="SectionTitle"><h3><Link to="/lifestyle"><span className="ColorBox"></span>লাইফস্টাইল</Link></h3></div>
                <div className="DLifestyle">
                    <div className="row">
                        {lifeStyle.map((nc) => {
                            return (
                                <div className="col-lg-4 col-12 d-flex border-right-inner">
                                    <div className="DLifestyleTop align-self-stretch ">
                                        <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop}>
                                            <div className="Imgresize">
                                                <figure className="ImgViewer">
                                                    <picture className="FixingRatio">
                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img100 ImgRatio" />
                                                    </picture>
                                                </figure>
                                            </div>
                                            <div className="Desc">
                                                {/* <h3 className="Title">{nc.ContentHeading}</h3> */}
                                                {nc.ContentSubHeading == null ?
                                                    <h3 className="Title">{nc.ContentHeading} </h3> :
                                                    <h3 className="Title"> <span className="subheadTitle">{nc.ContentSubHeading + " /"}</span> {nc.ContentHeading} </h3>
                                                }

                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}

                        <div className="col-lg-8 col-12">
                            <div className="DLifestyleTop2">
                                <div className="row">
                                    {lifeStyle2.map((nc) => {
                                        return (
                                            <div className="col-lg-4 col-sm-12 d-flex border-right-inner">
                                                <div className="DLifestyleList align-self-stretch">
                                                    <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop}>
                                                        <div className="row">
                                                            <div className="col-lg-12 col-5">
                                                                <div className="Imgresize">
                                                                    <figure className="ImgViewer">
                                                                        <picture className="FixingRatio">
                                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img100 ImgRatio" />
                                                                            {nc.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}
                                                                        </picture>
                                                                    </figure>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 col-7">
                                                                <div className="Desc">
                                                                    {/* <h3 className="Title">{nc.ContentHeading}</h3> */}
                                                                    {nc.ContentSubHeading == null ?
                                                                        <h3 className="Title">{nc.ContentHeading} </h3> :
                                                                        <h3 className="Title"> <span className="subheadTitle">{nc.ContentSubHeading + " /"}</span> {nc.ContentHeading} </h3>
                                                                    }

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
            </div>
        </>

    )
}
