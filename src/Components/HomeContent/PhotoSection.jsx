import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'

var lazyloaded = false

export default function PhotoSection() {
    const [photoStory, setPhotoStory] = useState([])
    const [photoStory2, setPhotoStory2] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generatePhotoFeature.json`)
            .then(({ data }) => {
                setPhotoStory(data.data.slice(0, 1))
                setPhotoStory2(data.data.slice(1, 4))
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            })
    }, [])
    return (

        <>   <div className="SectionTitle"><h3><Link onClick={scrollTop} to="/photo-feature"><span className="ColorBox"></span>ছবিঘর</Link></h3></div>
            <div className="row mt-3">
                <div className="col-md-6 col-12 border-right-inner">
                    <div className="DPhotoGalleryTop">
                        {photoStory.map((nc) => {
                            return (
                                <Link to={"/photo-feature/news/" + nc.PhotoFeatureID} key={nc.PhotoFeatureID} onClick={scrollTop}>
                                    <div className="Imgresize">
                                        <figure className="ImgViewer">
                                            <picture className="FixingRatio">
                                                <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img-fluid img100 ImgRatio" />
                                                {nc.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}
                                            </picture>
                                        </figure>
                                    </div>
                                    <div className="Desc">
                                        <div className="NewsTitle">
                                            <h2 className="Title"><i className="fas fa-camera"></i>  {nc.PhotoFeatureTitle}</h2>
                                        </div>
                                        <div className="Brief">
                                            <p>{nc.ShortBrief}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}

                    </div>
                </div>
                <div className="col-md-6 col-12 border-right-inner ">
                    <div className="DPhotoGalleryTop2">
                        <div className="row mb-2">
                            {photoStory2.map((nc) => {
                                return (
                                    <>
                                    <div className="col-md-6 col-6">
                                        <div className="DPhotoGalleryList ">
                                            <Link to={"/photo-feature/news/" + nc.PhotoFeatureID} key={nc.PhotoFeatureID} onClick={scrollTop}>
                                                <div className="Imgresize">
                                                    <figure className="ImgViewer">
                                                        <picture className="FixingRatio">
                                                            <img
                                                                src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img-fluid img100 ImgRatio" />
                                                            {nc.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}
                                                        </picture>
                                                    </figure>
                                                </div>
                                                <div className="Desc">
                                                    <h3 className="Title"><i className="fas fa-camera"></i> {nc.PhotoFeatureTitle}</h3>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                   
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}
