import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
var lazyloaded = false
export default function Cultural() {
    const [culture, setCulture] = useState([])
    const [culture2, setCulture2] = useState([])



    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateCategory2.json`)
            .then(({ data }) => {

                setCulture(data.data.slice(0, 1))
                setCulture2(data.data.slice(1, 4))

                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);


            })
    }, [])


    return (
        <>
            <div className="SectionTitle"><h3><Link to="#"  onClick={scrollTop}><span className="ColorBox"></span>সাহিত্য</Link></h3></div>
            <div className="DCatStyle2">
                <div className="DCatStyle2Top">
                    {culture.map((nc)=>{
                        return(
                            <Link to={"/" + nc.Slug + "/article/" + nc.ContentID + "/" + nc.URLAlies} key={nc.ContentID} onClick={scrollTop}>
                            <div className="Imgresize">
                                <figure className="ImgViewer">
                                    <picture className="FixingRatio">
                                        <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img-fluid img100 ImgRatio" />
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
                        {culture2.map((nc)=>{
                            return(
                                <li><Link to={"/" + nc.Slug + "/article/" + nc.ContentID + "/" + nc.URLAlies} key={nc.ContentID} onClick={scrollTop}><h4 className="Title">{nc.ContentHeading} </h4></Link></li>
                            )
                        })}
                        
                        {/* <li><Link to=""><h4 className="Title">চাকরি দিচ্ছে রূপালী ব্যাংক, আবেদন অনলাইনে </h4></Link></li>
                        <li><Link to=""><h4 className="Title">আকর্ষণীয় বেতনে ‘গ্রাম বিকাশ কেন্দ্রে’ বিশাল নিয়োগ বিজ্ঞপ্তি </h4></Link></li> */}
                    </ul>
                </div>
            </div>
        </>

    )
}
