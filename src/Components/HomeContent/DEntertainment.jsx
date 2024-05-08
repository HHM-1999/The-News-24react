import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
var lazyloaded = false
export default function DEntertainment() {
    const [entertainment, setEntertainment] = useState([])
    const [entertainment2, setEntertainment2] = useState([])
    const [entertainment3, setEntertainment3] = useState([])
  
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateCategory7.json`)
            .then(({ data }) => {

                setEntertainment(data.data.slice(0, 1))
                setEntertainment2(data.data.slice(1, 4))
                setEntertainment3(data.data.slice(4, 9))
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);


            })
    }, [])

    return (
        <>

          <div className="container">
          <div className="SectionTitle"><h3><Link to="/entertainment"  onClick={scrollTop}><span className="ColorBox"></span>বিনোদন</Link></h3></div>
            <div className="DEntertainment">
                <div className="row">
                    <div className="col-lg-8 col-12">
                        {entertainment.map((nc) => {
                            return (
                                <div className="DEntertainmentTop">
                                    <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop}>
                                        <div className="row">
                                            <div className="col-md-8 order-md-1 col-12">
                                                <div className="Imgresize">
                                                    <figure className="ImgViewer">
                                                        <picture className="FixingRatio">
                                                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img-fluid img100 ImgRatio" />
                                                            {nc.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}
                                                        </picture>
                                                    </figure>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-12">
                                                <div className="Desc">
                                                    <div className="NewsTitle">
                                                        <h3 className="Title">{nc.ContentHeading}  </h3>
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

                        <div className="DEnterTop3">
                            <div className="row">
                                {entertainment2.map((nc) => {
                                    return (
                                        <div className="col-lg-4 col-12 d-flex">
                                            <div className="DEnterList2 align-self-stretch">
                                                <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-12 col-5">
                                                            <div className="Imgresize">
                                                                <figure className="ImgViewer">
                                                                    <picture className="FixingRatio">
                                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img-fluid img100 ImgRatio" />
                                                                        {nc.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}
                                                                    </picture>
                                                                </figure>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-7">
                                                            <div className="Desc">
                                                                <h2 className="Title">{nc.ContentHeading}</h2>
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
                    <div className="col-lg-4 col-12">
                        <div className="DEntertainmentList">
                            {entertainment3.map((nc) => {
                                return (
                                    <div className="DEntertainmentListItem">
                                        <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop}>
                                            <div className="row">
                                                <div className="col-lg-5 col-5">
                                                    <div className="Imgresize">
                                                        <figure className="ImgViewer">
                                                            <picture className="FixingRatio">
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img-fluid img100 ImgRatio" />
                                                                {nc.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}
                                                            </picture>
                                                        </figure>
                                                    </div>
                                                </div>
                                                <div className="col-lg-7 col-7">
                                                    <div className="Desc">
                                                        <h2 className="Title">{nc.ContentHeading}</h2>
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

          </div>
        </>

    )
}
