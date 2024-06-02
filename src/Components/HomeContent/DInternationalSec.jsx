import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'

var lazyloaded = false
export default function DInternationalSec() {
    const [international, setInternational] = useState([])
    const [international2, setInternational2] = useState([])
    const [international3, setInternational3] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateCategory4.json`)
            .then(({ data }) => {

                setInternational(data.data.slice(0, 1))
                setInternational2(data.data.slice(1, 2))
                setInternational3(data.data.slice(2, 5))
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);


            })
    }, [])
    return (
        <>
            <section className="Country">
                <div className="SectionTitle"><h3><Link to="/international" onClick={scrollTop}><span className="ColorBox"></span>আন্তর্জাতিক</Link></h3></div>
                <div className="DCountry">
                    <div className="row">
                        <div className="col-lg-8 col-12">
                            {international.map((nc) => {
                                return (
                                    <div className="DCountryTop">
                                        <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop}>
                                            <div className="row">
                                                <div className="col-lg-8 col-12">
                                                    <div className="Imgresize">
                                                        <figure className="ImgViewer">
                                                            <picture className="FixingRatio">
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img100 ImgRatio" />

                                                                {nc.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}
                                                            </picture>
                                                        </figure>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-12">
                                                    <div className="Desc">
                                                        <div className="NewsTitle">
                                                            {/* <h3 className="Title">{nc.ContentHeading}</h3> */}
                                                            {nc.ContentSubHeading == null ?
                                                                <h3 className="Title">{nc.ContentHeading} </h3> :
                                                                <h3 className="Title"> <span className="subheadTitle">{nc.ContentSubHeading + " /"}</span> {nc.ContentHeading} </h3>
                                                            }
                                                        </div>
                                                        <div className="Brief">
                                                            <p>{nc.ContentBrief}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}

                        </div>
                        <div className="col-lg-4 col-12 d-flex">
                            {international2.map((nc) => {
                                return (<div className="DCountryList align-self-stretch">
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
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>)
                            })}

                        </div>
                        {international3.map((nc) => {
                            return (
                                <div className="col-lg-4 col-12 d-flex">
                                    <div className="DCountryList align-self-stretch">
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
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </section>

        </>

    )
}
