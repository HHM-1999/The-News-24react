import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'

var lazyloaded = false
export default function Health() {
    const [health, setHealth] = useState([])
    const [health2, setHealth2] = useState([])



    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateCategory13.json`)
            .then(({ data }) => {

                setHealth(data.data.slice(0, 1))
                setHealth2(data.data.slice(1, 4))

                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);


            })
    }, [])
    return (
        <>
            <div className="SectionTitle"><h3><Link to="/health"  onClick={scrollTop}><span className="ColorBox"></span>স্বাস্থ্য</Link></h3></div>
            <div className="DCatStyle2">
                <div className="DCatStyle2Top">
                    {health.map((nc) => {
                        return (
                            <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop}>
                                <div className="Imgresize">
                                    <figure className="ImgViewer">
                                        <picture className="FixingRatio">
                                            <img
                                                src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img-fluid img100 ImgRatio" />
                                                 {nc.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}
                                        </picture>
                                    </figure>
                                </div>
                                <div className="Desc">
                                    <h3 className="Title">{nc.ContentHeading}</h3>
                                </div>
                            </Link>
                        )
                    })}

                </div>
                <div className="DCatStyle2List">
                    <ul>
                        {health2.map((nc)=>{
                            return(<li><Link  to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop}><h4 className="Title">{nc.ContentHeading}</h4></Link></li>)
                        })}
                    </ul>
                </div>
            </div>

        </>

    )
}
