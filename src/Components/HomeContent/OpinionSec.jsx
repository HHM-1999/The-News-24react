import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
import WriterDefaultImg from '../../assets/media/common/profile.png';

var lazyloaded = false
export default function OpinionSec() {
    const [state, setState] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateCategory18.json`)
            .then(({ data }) => {
                if (data.data.length > 0) {
                    setState(data.data.slice(0, 4));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])

    return (
        <>
        <div className="container">
        <div className="row">
                <div className="col-lg-12 col-12">
                    <div className="SectionTitle"><h3><Link to="/opinion"><span className="ColorBox"></span>মতামত</Link></h3></div>
                    <div className="DCatStyle5">
                        <div className="row">
                            {state.map((nc) => {
                                return (
                                    <div className="col-lg-3 col-12">
                                        <div className="DCatStyle5List">
                                            <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop}>
                                                <div className="row">
                                                    <div className="col-lg-4 col-sm-3 col-4">
                                                        <div className="DImgZoomBlock">
                                                            <picture>
                                                            {nc.ImageSmPath==null?
                                                             <img data-src={WriterDefaultImg}  alt={nc.ContentHeading} title={nc.ContentHeading} /> :
                                                             <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img-fluid img100" />
                                                            }
                                                            {nc.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}</picture>
                                                            </div>
                                                    </div>
                                                    <div className="col-lg-8 col-sm-9 col-8">
                                                        <h4 className="Title SMTitle">{nc.ContentHeading}</h4>
                                                        <p className="WriterName"><i className="fa fa-pencil" aria-hidden="true"></i> {nc.WriterName}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>


            </div>
        </div>
           

        </>

    )
}
