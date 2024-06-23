import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg, banglaDateConvetar } from '../AllFunctions'
import { format } from 'date-fns'
var lazyloaded = false
export default function LeadNews() {
    const [state, setState] = useState([])
    const [state2, setState2] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateSpecial1.json`)
            .then(({ data }) => {
                if (data.data.length > 0) {
                    setState(data.data[0]);
                    setState2(data.data.slice(1, 5));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])

    return (
        <>
            <div className="DHomeTopLead">
                <Link to={"/" + state.Slug + "/news/" + state.ContentID} onClick={scrollTop}>
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="DImgZoomBlock">
                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + state.ImageBgPath} alt={state.ContentHeading} title={state.ContentHeading} className="img-fluid img100" />
                                    {state.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}</picture>

                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="Desc">
                                {state.ContentSubHeading == null  ?
                                    <h1 className="Title"> {state.ContentHeading}</h1> :
                                    <h1 className="Title"> <span className="subheadTitle">{state.ContentSubHeading}/</span>  {state.ContentHeading}</h1>


                                }
                                <div className="Brief">
                                    <p>{state.ContentBrief}</p>
                                </div>
                                <span className="PublishTime"><i className="far fa-clock"></i> {state.created_at && "আপডেট " + banglaDateConvetar(format(new Date(state.created_at), 'dd MMMM yyyy, HH:mm'))} </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="DHomeLeadList3Sec">
                <div className="row">
                    {state2.map((nc) => {
                        return (
                            <div className="col-lg-6 col-12 d-flex" key={nc.ContentID}>
                                <div className="DHomeLeadList3 align-self-stretch">
                                    <a href={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                        <div className="row">
                                            <div className="col-md-7 col-7">
                                                <div className="Desc">
                                                    {nc.ContentSubHeading == null ?
                                                        <h3 className="Title">{nc.ContentSubHeading} {nc.ContentHeading}</h3> :
                                                        <h3 className="Title"> <span className="subheadTitle">{nc.ContentSubHeading + "" + "/"}</span> {nc.ContentHeading}</h3>

                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-5 col-5">
                                                <div className="DImgZoomBlock">
                                                    <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img-fluid img100" />
                                                        {nc.ShowVideo === 1 && <div className="card-video-icon transition" ><i className="fa-solid fa-play"></i></div>}
                                                    </picture>

                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        )
                    }

                    )}
                </div>
            </div>

        </>

    )
}
