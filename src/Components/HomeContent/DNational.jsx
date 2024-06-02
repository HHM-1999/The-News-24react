import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
var lazyloaded = false
export default function DNational() {
    const [national, setNational] = useState([])
    const [national2, setNational2] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateCategory1.json`)
            .then(({ data }) => {
                setNational(data.data.slice(0, 1))
                setNational2(data.data.slice(1, 4))
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            })
    }, [])
    return (
        <>
            <section className="National">
                <div className="SectionTitle"><h3><Link to="/national" onClick={scrollTop}><span className="ColorBox"></span>জাতীয়</Link></h3></div>
                <div className="DNational">
                    <div className="row">
                        {national.map((nc) => {
                            return (
                                <div className="col-lg-6 col-sm-12">
                                    <div className="DNationalTop">
                                        <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop} >
                                            <div className="Imgresize">
                                                <figure className="ImgViewer">
                                                    <picture className="FixingRatio">
                                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img100 ImgRatio" />
                                                        {nc.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}
                                                    </picture>
                                                </figure>
                                            </div>
                                            <div className="Desc">
                                                <div className="NewsTitle">
                                                    {nc.ContentSubHeading == null ?
                                                        <h3 className="Title">{nc.ContentHeading} </h3> :
                                                        <h3 className="Title"> <span className="subheadTitle">{nc.ContentSubHeading + " /"}</span> {nc.ContentHeading} </h3>
                                                    }

                                                    {/* <h3 className="Title">{nc.ContentSubHeading === null && <span className='subheadTitle'> {nc.ContentSubHeading + "/ "}</span>} {nc.ContentHeading}</h3> */}
                                                </div>
                                                <div className="Brief">
                                                    <p>{nc.ContentBrief}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}

                        <div className="col-lg-6 col-sm-12">
                            <div className="DNationalTop2">
                                {national2.map((nc) => {
                                    return (<div className="DNationalList">
                                        <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop}>
                                            <div className="row">
                                                <div className="col-lg-5 col-5">
                                                    <div className="Imgresize">
                                                        <figure className="ImgViewer">
                                                            <picture className="FixingRatio">
                                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img100 ImgRatio" />
                                                                {nc.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}
                                                            </picture>
                                                        </figure>
                                                    </div>
                                                </div>
                                                <div className="col-lg-7 col-7">
                                                    <div className="Desc">


                                                        {nc.ContentSubHeading == null ?
                                                            <h3 className="Title">{nc.ContentHeading} </h3> :
                                                            <h3 className="Title"> <span className="subheadTitle">{nc.ContentSubHeading + " /"}</span> {nc.ContentHeading} </h3>
                                                        }


                                                        <div className="Brief">
                                                            <p>{nc.ContentBrief}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>)
                                })}


                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}
