import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
import Slider from 'react-slick';


var lazyloaded = false
export default function VideoSec() {
    const [videos, setVideos] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generatePositionVideoCategory1.json`)
            .then(({ data }) => {
                setVideos(data.data.slice(0, 8))
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            })
    }, [])

    var settings = {
        centerPadding: "50px",
        className: "center",
        centerMode: true,
        dots: false,
        infinite: true,
        arrows: true,
        autoplay: true,
        pauseOnFocus: true,
        Speed: 100,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <>

            <div className="container">
                <div className="SectionTitle"><h3><Link to="/video" onClick={scrollTop}><span className="ColorBox"></span>ভিডিও</Link></h3></div>
                <div className="MoreVideoArea">

                </div>
                <div className="slider-container">
               
                    <div className="row Dmargin">
                       
                    <Slider {...settings}>
                            {videos.map((nc) => {
                                return (
                                        <div className="DMoreVideoListItem   " key={nc.WebTVID} style={{padding:"0 10px",margin:"0 10px"}}>
                                            <Link to={"/video/show/" + nc.WebTVID} onClick={scrollTop}>
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
                                                <div className="Desc">
                                                    <h3 className="Title">{nc.WebTVHeading}</h3>
                                                </div>
                                            </Link>
                                        </div>
                             


                                )
                            })}
                         </Slider>

                    </div>
                 


                </div>

 
            </div>


        </>

    )
}
