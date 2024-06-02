import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'

var lazyloaded = false
export default function Technology() {
    const [techNews, setTechNews] = useState([])
    const [techNews2, setTechNews2] = useState([])


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateCategory9.json`)
            .then(({ data }) => {

                setTechNews(data.data.slice(0, 1))
                setTechNews2(data.data.slice(1, 4))

                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);


            })
    }, [])
    return (
        <>
            <div className="SectionTitle"><h3><Link to="/technology"><span className="ColorBox"></span>তথ্য প্রযুক্তি</Link></h3></div>
            <div className="DCatStyle2">
                <div className="DCatStyle2Top">
                    {
                        techNews.map((nc) => {
                            return (
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
                                        {/* <h3 className="Title">{nc.ContentHeading}</h3> */}
                                        {nc.ContentSubHeading == null ?
                                            <h3 className="Title">{nc.ContentHeading} </h3> :
                                            <h3 className="Title"> <span className="subheadTitle">{nc.ContentSubHeading + " /"}</span> {nc.ContentHeading} </h3>
                                        }

                                    </div>
                                </Link>
                            )
                        })
                    }

                </div>
                <div className="DCatStyle2List">
                    <ul>
                        {techNews2.map((nc) => {
                            return (<li><Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop}>

                                {/* <h4 className="Title">{nc.ContentHeading} </h4> */}
                                {nc.ContentSubHeading == null ?
                                    <h4 className="Title">{nc.ContentHeading} </h4> :
                                    <h4 className="Title"> <span className="subheadTitle">{nc.ContentSubHeading + " /"}</span> {nc.ContentHeading} </h4>
                                }

                            </Link></li>)

                        })}

                        {/* <li><Link to=""><h4 className="Title">যুক্তরাষ্ট্রে থাকার জন্য ২৮ হাজার আফগানদের মধ্যে ভাগ্য খুলল ১০০ জনের </h4></Link></li>
                        <li><Link to=""><h4 className="Title">এয়ারপড মাইক্রোফোন কাজ করছে না, ঠিক করুন এই ৬ উপায়ে </h4></Link></li> */}
                    </ul>
                </div>
            </div>
        </>

    )
}
