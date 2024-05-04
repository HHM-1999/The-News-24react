import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'

var lazyloaded = false
export default function DEducation() {
    const [education, setEducation] = useState([])
    const [education2, setEducation2] = useState([])



    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateCategory17.json`)
            .then(({ data }) => {

                setEducation(data.data.slice(0, 1))
                setEducation2(data.data.slice(1, 4))

                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);


            })
    }, [])

    return (
        <>
            <div className="SectionTitle"><h3><Link to="/education"  onClick={scrollTop}><span className="ColorBox"></span>শিক্ষা</Link></h3></div>
            <div className="DCatStyle2">
                <div className="DCatStyle2Top">
                    {education.map((nc) => {
                        return (
                            <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop}>
                                <div className="Imgresize">
                                    <figure className="ImgViewer">
                                        <picture className="FixingRatio">
                                            <img
                                                src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img-fluid img100 ImgRatio" />
                                                 {nc.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}
                                        </picture>
                                    </figure>
                                </div>
                                <div className="Desc">
                                    <h3 className="Title">{nc.ContentHeading}</h3>
                                </div>
                            </Link>
                        )
                    })}

                </div>
                <div className="DCatStyle2List">
                    <ul>
                        {education2.map((nc)=>{
                            return(
                                <li><Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop}><h4 className="Title">{nc.ContentHeading}</h4></Link></li>
                            )
                        })}
                     
                        {/* <li><Link to=""><h4 className="Title">ভর্তির আবেদনে জিপিএ নম্বর থাকছে না বরিশাল বিশ্ববিদ্যালয়ে </h4></Link></li>
                        <li><Link to=""><h4 className="Title">পর্যাপ্ত সুবিধা নেই কেন্দ্রীয় গ্রন্থাগারে, আছে নিয়মের গ্যাড়াকল</h4></Link></li> */}
                    </ul>
                </div>
            </div>
        </>

    )
}
