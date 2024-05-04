import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
var lazyloaded = false
export default function DBusiness() {

    const [business, setBusiness] = useState([])
    const [business2, setBusiness2] = useState([])


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}json/file/generateCategory8.json`)
            .then(({ data }) => {

                setBusiness(data.data.slice(0, 1))
                setBusiness2(data.data.slice(1,4))
          
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);


            })
    }, [])
    return (
        <>
                 
                 <div className="SectionTitle"><h3><Link to="/trade"  onClick={scrollTop}><span className="ColorBox"></span>বাণিজ্য</Link></h3></div>
                    <div className="DCatStyle1List">
                        {business.map((nc)=>{
                            return (
                                <div className="DCatStyle1Top">
                                <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop}>
                                    <div className="thumbnail">
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
                                    </div>
                                        
                                </Link>
                            </div>
                            )
                        })}
                        {business2.map((nc)=>{
                            return(
                                <div className="DCatStyle1ListItem">
                            <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} key={nc.ContentID} onClick={scrollTop}>
                                <div className="row">
                                    <div className="col-lg-4 col-5">
                                        <div className="Imgresize">
                                            <figure className="ImgViewer">
                                                <picture className="FixingRatio">
                                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img-fluid img100 ImgRatio" />
                                                    {nc.ShowVideo === 1 && <div className="card-video-icon big transition"> <i className="fa-solid fa-play"></i> </div>}
                                                </picture>
                                            </figure>
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-7">
                                        <div className="Desc">
                                            <h2 className="Title">{nc.ContentHeading}</h2>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                            )
                        })}
                       
                        
                        {/* <div className="DCatStyle1ListItem">
                            <Link to="">
                                <div className="row">
                                    <div className="col-lg-4 col-5">
                                        <div className="Imgresize">
                                            <figure className="ImgViewer">
                                                <picture className="FixingRatio">
                                                    <img src={"media/imgAll/d6c8ce08869682f0450e9f363ad91b18-6102a0edbca6e.webp"} alt="" title="" className="img-fluid img100 ImgRatio" />
                                                </picture>
                                            </figure>
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-7">
                                        <div className="Desc">
                                            <h2 className="Title">‘বিভ্রান্তি’ দূর করার সংবাদ সম্মেলন ডেকেও বাতিল করল আলেশা মার্ট</h2>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="DCatStyle1ListItem">
                            <Link to="">
                                <div className="row">
                                    <div className="col-lg-4 col-5">
                                        <div className="Imgresize">
                                            <figure className="ImgViewer">
                                                <picture className="FixingRatio">
                                                    <img src={"media/imgAll/d8b001550ecd8707e718143be10f45cb-606d95f8d60b3.webp"} alt="" title="" className="img-fluid img100 ImgRatio" />
                                                </picture>
                                            </figure>
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-7">
                                        <div className="Desc">
                                            <h2 className="Title">ডিএসইতে শেয়ার লেনদেন দেড় হাজার কোটি টাকা ছাড়িয়েছে</h2>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div> */}
                    </div>

        </>

    )
}
