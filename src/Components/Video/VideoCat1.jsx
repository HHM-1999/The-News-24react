import React from 'react'
import { Link } from 'react-router-dom'
import { scrollTop } from '../AllFunctions'

export default function VideoCat1({ state }) {
    return (
        <>
            {state.map((nc) => {
                return (
                    <React.Fragment key={nc.CategoryID}>
                        {nc.videos.length > 0 ?
                            <div className="row mt-5">
                                <div className="col-lg-12 col-12">
                                    <div className="SectionSBorder2">
                                        <div className="SPSecTitle">
                                            <Link to={'/video/cat/' + nc.Slug} onClick={scrollTop}>
                                                <h2>{nc.CategoryName}</h2>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="VideoGallery">
                                        <div className="row">
                                            <div className="col-lg-6 col-12">
                                                {nc.videos.map((nd, i) => {
                                                    return (
                                                        <>
                                                            {i === 0 ? (
                                                                <div className="VideoGalleryTop" key={nd.WebTVID}>
                                                                    <Link to={"/video/show/" + nd.WebTVID} onClick={scrollTop}>
                                                                        <div className="DImgZoomBlock">
                                                                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={'https://img.youtube.com/vi/' + nd.WebTVLinkCode + '/hqdefault.jpg'} alt={nd.WebTVHeading} title={nd.WebTVHeading} /></picture>
                                                                            <div className="card-videoGallery-icon"><i className="fa-solid fa-play"></i></div>
                                                                        </div>
                                                                        <div className="Desc">
                                                                            <h3 className="Title BGTitle">{nd.WebTVHeading}</h3>
                                                                            <div className="Brief">
                                                                                <p dangerouslySetInnerHTML={{ __html: nd.Remarks }}></p>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            ) : ("")}
                                                        </>
                                                    )
                                                })}
                                            </div>
                                            <div className="col-lg-6 col-12">
                                                <div className="row">
                                                    {nc.videos.map((nd, i) => {
                                                        return (
                                                            <>
                                                                {i !== 0 ?
                                                                    <div className="col-lg-6 col-12 d-flex" key={nd.WebTVID}>
                                                                        <div className="VideoGalleryList align-self-stretch">
                                                                            <Link to={"/video/show/" + nd.WebTVID} onClick={scrollTop}>
                                                                                <div className="row">
                                                                                    <div className="col-lg-12 col-sm-4 col-5">
                                                                                        <div className="DImgZoomBlock">
                                                                                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={'https://img.youtube.com/vi/' + nd.WebTVLinkCode + '/hqdefault.jpg'} alt={nd.WebTVHeading} title={nd.WebTVHeading} /></picture>
                                                                                            <div className="card-videoGallery-icon"><i className="fa-solid fa-play"></i></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-lg-12 col-sm-8 col-7 textBorder2">
                                                                                        <div className="Desc">
                                                                                            <h3 className="Title">{nd.WebTVHeading}</h3>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Link>
                                                                        </div>
                                                                    </div> : ""}
                                                            </>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : false}
                    </React.Fragment>
                )
            })}
        </>
    )
}
