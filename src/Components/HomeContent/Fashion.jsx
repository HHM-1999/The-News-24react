import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { ForLazyLoaderImg, scrollTop } from '../AllFunctions'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

var lazyloaded = false
export default function Fashion() {
    const [state, setState] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateCategory7.json`)
            .then(({ data }) => {
                if (data.data.length > 0) {
                    setState(data.data);
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])
    var settings = {
        loop: true,
        autoplay: false,
        slidesToShow: 4,
        focusOnSelect: true,
        dots: true,
        infinite: true,
        lazyLoad: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 620,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2
            }
        }
        ]
    };
    return (
        <>
            <section>
                <div className="LifeStyle mt-5">
                    <div className="SectionSBorder2">
                        <div className="SPSecTitle">
                            <Link to="/fashion" onClick={scrollTop}>
                                <h2>ফ্যাশন</h2>
                            </Link>
                        </div>
                    </div>
                    <Slider {...settings}>
                        {state.map((nc) => {
                            return (
                                <div className="LifeStyleNews" key={nc.ContentID}>
                                    <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                        <div className="DImgZoomBlocktest">
                                            <picture><img src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} width={295} height={166} alt={nc.ContentHeading} title={nc.ContentHeading} /></picture>
                                            {nc.ShowVideo === 1 && <div className="card-video-iconTop"><i className="fa-solid fa-play"></i></div>}
                                        </div>
                                        <div className="Desc">
                                            <h2 className="Title BGTitle">{nc.ContentHeading}</h2>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </section>
        </>
    )
}
