import React from 'react'
import { Link } from 'react-router-dom'
import { scrollTop } from '../AllFunctions'
export default function DCatPopular({ catPopular, catName, catSlug }) {
    return (
        <>
            <div className="DSecTitle2">
                <h2>এই সপ্তাহের সর্বাধিক পঠিত গুরুত্বপূর্ণ {catName} খবর</h2>
            </div>
            <div className="DBottomNews">
                <div className="row">
                    {catPopular.map((nc) => {
                        return (
                            <div className="col-lg-6 col-12" key={nc.ContentID}>
                                <div className="DTop3List">
                                    <Link to={"/" + catSlug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                        <div className="row">
                                            <div className="col-lg-4 col-sm-4 col-5">
                                                <div className="DImgZoomBlock">
                                                    <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageThumbPath} alt={nc.ContentHeading} title={nc.ContentHeading} /></picture>
                                                    {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-sm-8 col-7 textBorder2">
                                                <div className="Desc textBorder">
                                                    <h3 className="Title BGTitle">{nc.ContentHeading}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
