import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ForLazyLoaderImg, scrollTop } from '../AllFunctions'
var lazyloaded = false

export default function Event() {
    const [event, setEvent] = useState('')
    const [state, setState] = useState([])
    const [state2, setState2] = useState([])
    const [state3, setState3] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}home-event-active/9`)
            .then(({ data }) => {
                if (data.eventContent !== "no-event" && data.eventContent.length > 0) {
                    setEvent(data.event_title)
                    setState(data.eventContent[0]);
                    setState2(data.eventContent.slice(1, 5));
                    setState3(data.eventContent.slice(5, 9));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])
    return (
        <>
            {event !== '' &&
                <div className="EventTop">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 text-center text-white">
                                <h5 className='fs-4 mb-3'>{event}</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-12">
                                <div className="DCountryTop align-self-stretch">
                                    <Link to={"/" + state.Slug + "/news/" + state.ContentID} onClick={scrollTop}>
                                        <div className="DImgZoomBlock">
                                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + state.ImageBgPath} alt={state.ContentHeading} title={state.ContentHeading} /></picture>
                                            {state.ShowVideo === 1 && <div className="card-video-iconTop"><i className="fa-solid fa-play"></i></div>}
                                        </div>
                                        <div className="Desc">
                                            <h3 className="Title BGTitle">{state.ContentHeading}</h3>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-3 col-12 order-lg-first">
                                <div className="DCountry">
                                    {state2.map((nc) => {
                                        return (
                                            <div className="DCountryList" key={nc.ContentID}>
                                                <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-5 col-sm-4 col-5">
                                                            <div className="DImgZoomBlock">
                                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.ContentHeading} title={nc.ContentHeading} /></picture>
                                                                {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-7 col-sm-8 col-7 textBorder2">
                                                            <div className="Desc textBorder">
                                                                <h3 className="Title">{nc.ContentHeading}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="col-lg-3 col-12">
                                <div className="DCountry">
                                    {state3.map((nc) => {
                                        return (
                                            <div className="DCountryList leftSide" key={nc.ContentID}>
                                                <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                                    <div className="row">
                                                        <div className="col-lg-5 col-sm-4 col-5">
                                                            <div className="DImgZoomBlock">
                                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.ContentHeading} title={nc.ContentHeading} /></picture>
                                                                {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-7 col-sm-8 col-7 textBorder2 order-lg-first">
                                                            <div className="Desc textBorder">
                                                                <h3 className="Title">{nc.ContentHeading}</h3>
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
            }
        </>
    )
}
