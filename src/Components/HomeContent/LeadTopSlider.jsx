import React from 'react'
import { Link } from 'react-router-dom'
import { scrollTop } from '../AllFunctions'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function LeadTopSlider({ state3 }) {
    var settings = {
        loop: true,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 1000,
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
            <div className="BottomLeadSection SectionSBorder">
                <Slider {...settings}>
                    {state3.map((nc) => {
                        return (
                            <div className="LeadBottom" key={nc.ContentID}>
                                <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                    <div className="DImgZoomBlocktest">
                                        <picture><img src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} width={305} height={171} alt={nc.ContentHeading} title={nc.ContentHeading} /></picture>
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
        </>
    );
}