import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
import Slider from 'react-slick';


var lazyloaded = false
export default function VideoSec() {
    const [videos, setVideos] = useState([])
    const [slideIndex, setSlideIndex] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);
    let sliderRef = useRef(null);
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
        dots: false,
        infinite: true,
        speed: 100,
        slidesToShow: 4,
        slidesToScroll: 1,
        afterChange: () => setUpdateCount(updateCount + 1),
        beforeChange: (current, next) => setSlideIndex(next),
        centerPadding: "50px",
        className: "center",
        centerMode: true,
        // dots: true,
        // infinite: true,
        // arrows: true,
        // autoplay: true,
        pauseOnFocus: true,
        Speed: 100,
        // slidesToShow: 4,
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

                        <Slider ref={slider => {
                            sliderRef = slider;
                        }}
                            {...settings}>
                            {videos.map((nc) => {
                                return (
                                    
                                    <div className="DMoreVideoListItem" key={nc.WebTVID} style={{ padding: "0 10px", margin: "0 10px" }}>
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
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react-slick/0.30.2/react-slick.min.js" integrity="sha512-9cn+e5E0uqJxF/RA4PERrZ9654f/pPwSWJWe1fPavysxUdVe0xYTj09jzlKW5pd9vrgaNtqDpW9CwkvKXdUBSw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/react-slick/0.30.2/react-slick.js" integrity="sha512-aP0zyfgfU02K5gDdprwgUcfmGQJ7zoVQPdIl1irO8iXCUJ80yWeTg/WTRwTJuV0pny/jWLZqBZwhz8pkb6NxlA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        </>

    )
}
