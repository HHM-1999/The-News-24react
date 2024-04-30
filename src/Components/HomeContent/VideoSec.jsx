import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'

var lazyloaded = false
export default function VideoSec() {
    const [videos, setVideos] = useState([])
    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_API_URL}json/file/generatePositionVideoCategory1.json`)
        .then(({ data }) => {
            setVideos(data.data.slice(0, 4))
            setTimeout(function () {
                lazyloaded = false
                ForLazyLoaderImg(lazyloaded)
            }, 1000);
        })
    }, [])




    return (
        <>
           
                    <div className="SectionTitle"><h3><Link to="/video"><span className="ColorBox"></span>ভিডিও</Link></h3></div>
                    <div className="MoreVideoArea">

                    </div>
                    <div className="row">
                        {videos.map((nc)=>{
                            return(
                                <div className="col-lg-3 col-12 d-flex" key={nc.WebTVID}>
                                <div className="DMoreVideoListItem align-self-stretch">
                                    <Link to={"/video/show/" + nc.WebTVID} onClick={scrollTop}>
                                        <div className="row">
                                            <div className="col-lg-12 col-12">
                                                <div className="DMoreVideoThumb">
                                                    <div className="Imgresize">
                                                        <figure className="ImgViewer">
                                                            <picture className="FixingRatio">
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={'https://img.youtube.com/vi/' + nc.WebTVLinkCode + '/0.jpg'} width={406} height={228} alt={nc.WebTVHeading} title={nc.WebTVHeading} className="img100 ImgRatio" />
                                                                <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>
                                                            </picture>
                                                        </figure>
                                                    </div>
                                                    <div className="card-video-img transition"></div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-12">
                                                <div className="Desc">
                                                    <h3 className="Title">{nc.WebTVHeading}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            )
                        })}
                    </div>
            

        </>

    )
}
