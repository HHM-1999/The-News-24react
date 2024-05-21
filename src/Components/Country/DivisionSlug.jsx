import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from "react-router-dom";
import DocumentTitle from 'react-document-title';
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
import DivisionDistricName from './DivisionDistricName';
import ErrorPage from '../ErrorPage';
// import LatestPopularNews from '../Category/LatestPopularNews';
import LeadLatestNews from '../HomeContent/LeadLatestNews';
// import RLoader from '../RLoader';
var lazyloaded = false

export default function DivisionSlug() {
    const [divisionName, setDivisionName] = useState([])
    // const [isLoading, setisLoading] = useState(true)
    const [division, setDivision] = useState([])
    let { divisionSlug } = useParams();
    useEffect(() => {
        // setisLoading(true)
        window.scrollTo(0, 0)
        axios
            .get(`${process.env.REACT_APP_API_URL}district-division-content/${divisionSlug}`)
            .then(({ data }) => {
                if (data.districtContent.length !== 0) {
                    // setisLoading(false)
                    setDivisionName(data.districtContent[0].DivisionNameBn);
                    setDivision(data.districtContent.slice(0,4));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                } else {
                    setDivision(null);
                }
            })
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        setTimeout(() => { window.location.reload(1); }, 300000);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);
    }, [divisionSlug])

    return (
        <>
            {division ?
                <main>
              
                    <div className="container">
                        <div className="TopHomeSection"></div>
                        <h2 className="DTitle">
                            <DocumentTitle title={divisionName} />
                            <Link to={+ '/'}><span className="DTitleInner"><span className="DTitleInnerBar"><span>{divisionName}</span></span></span></Link>
                        </h2>
                        <div className="row">
                            <div className="col-lg-9 col-sm-12 border-right-inner1">
                                <DivisionDistricName />
                                <div className="DivisionAllNews">
                                    <div className="row">
                                        {division.map((nc) => {
                                            return (
                                                <div className="col-lg-4 col-sm-12" key={nc.DistrictID}>
                                                    <div className="Division-panel">
                                                        <div className="DivisionHeader">
                                                            <Link to={"/divisions/" + divisionSlug + '/' + nc.DistrictSlug} onClick={scrollTop}>
                                                                {nc.DistrictNameBn}
                                                            </Link>
                                                        </div>
                                                        {nc.content.map((nd, i) => {
                                                            return (
                                                                <div className="DivisionBody">
                                                                    {i === 0  ?
                                                                        <div className="DivisionLeadNews">
                                                                            <Link to={"/" + nd.Slug + "/news/" + nd.ContentID} onClick={scrollTop}>
                                                                                <div className="DImgBlock card-video-part">
                                                                                    <div className="DImgZoomBlock">
                                                                                        <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nd.ImageSmPath} alt={nd.ContentHeading} title={nd.ContentHeading} /></picture>
                                                                                        {nd.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="Desc">
                                                                                    <h2 className="Title">{nd.ContentHeading}</h2>
                                                                                </div>
                                                                            </Link>
                                                                        </div> :
                                                                        <div className="DivisionListNews">
                                                                            <Link to={"/" + nd.Slug + "/news/" + nd.ContentID} onClick={scrollTop}>
                                                                                <div className="Desc">
                                                                                    <h3 className="Title">
                                                                                        {nd.ContentHeading}
                                                                                    </h3>
                                                                                </div>
                                                                            </Link>
                                                                        </div>}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-12">
                                <div className="MarginBottom30">
                                    <LeadLatestNews />
                                </div>
                            </div>
                        </div>
                    </div> 
                  
                </main>
                : <ErrorPage />}
        </>
    )
}
