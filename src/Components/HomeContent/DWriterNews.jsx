import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'

var lazyloaded = false
export default function DWriterNews() {
    const [news, setNews] = useState([])
    const [news2, setNews2] = useState([])


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateCategory58.json`)
            .then(({ data }) => {
                setNews(data.data[0])
                setNews2(data.data.slice(1, 3))

                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            })
    }, [])
    return (
        <>
            <div className="SpecialBanner">
                <h2>পাঠকের সংবাদ</h2>
            </div>
            <div className="specialBannerSection">
                <div className="row">
                    <div className="col-md-12  ">
                            <div className="SpecialEventList border-bottom-inner ">
                                <Link to={"/" + news.Slug + "/news/" + news.ContentID} key={news.CategoryID} onClick={scrollTop} >
                                    <div className="row">
                                        <div className="col-lg-5 col-5">
                                            <div className="DImgZoomBlock">
                                                <picture>
                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + news.ImageSmPath} alt={news.ContentHeading} title={news.ContentHeading} className="img-fluid img100" />
                                                    {news.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}
                                                </picture>
                                            </div>
                                        </div>
                                        <div className="col-lg-7 col-7">
                                            <div className="Desc">
                                                <h2 className="Title FW700">{news.ContentSubHeading == 1 && <span className="subheadTitle">{news.ContentSubHeading + "/ "}</span>}{news.ContentHeading} </h2>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                      
                    </div>
                    {news2.map((nc) => {
                        return (
                            <div className="col-md-6  col-6 border-right-inner">
                                <div className="SpecialEventTop">
                                    <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.CategoryID} onClick={scrollTop}>
                                        <div className="DImgZoomBlock">
                                            <picture>
                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.ContentHeading} title={nc.ContentHeading}
                                                    className="img-fluid img100" />
                                                {nc.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}
                                            </picture>
                                        </div>
                                        <div className="Desc">
                                            <div className="Brief">
                                            <h2 className="Title FW700">{nc.ContentSubHeading ==1 && <span className="subheadTitle">{nc.ContentSubHeading  + " /"}</span> } {nc.ContentHeading}</h2>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>


        </>

    )
}
