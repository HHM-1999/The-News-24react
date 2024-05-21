import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import DocumentTitle from "react-document-title";
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
// import LatestPopularNews from './LatestPopularNews';

import CategoryPopular from './CategoryPopular';
import ErrorPage from '../ErrorPage';
import DivisionDistricName from '../Country/DivisionDistricName';
import CatLdJson from './CatLdJson';
import LeadLatestNews from '../HomeContent/LeadLatestNews';
// import RLoader from '../RLoader';

var lazyloaded = false
var catID = 0
var showMore = true
var limit = 8
var LeadNewsLimit = 5
var offset = 5
var InnerSpecialContents
var formData = []
export default function Category() {
    let { catSlug } = useParams();
    const [catName, setcatName] = useState([])
    const [catNewsMore, setcatLeadMore] = useState([])

    const [catLeadNews1, setcatLeadNews1] = useState([])
    const [catLeadNews2, setcatLeadNews2] = useState([])
    const [catLeadNews3, setcatLeadNews3] = useState([])

    const [catLatest, setcatLatest] = useState([])
    // const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        setTimeout(() => { window.location.reload(1); }, 300000);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);
        offset = 0
        axios
            .get(`${process.env.REACT_APP_API_URL}category/${catSlug}`)
            .then(({ data }) => {

                setcatName(data.category);
                if (data.category) {
                    // setisLoading(false)
                    catID = data.category.CategoryID;
                }
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
                axios
                    .get(`${process.env.REACT_APP_API_URL}inner-category-content/${catID}/${LeadNewsLimit}`)
                    .then(({ data }) => {
                        // if (data.inner_category_content.length > 0) {
                        if (data.inner_category_content) {
                            // console.log(`${process.env.REACT_APP_API_URL}inner-category-content/${catID}/${LeadNewsLimit}`);
                            setcatLeadNews1(data.inner_category_content[0]);
                            setcatLeadNews2(data.inner_category_content[1]);
                            setcatLeadNews3(data.inner_category_content.slice(2, 5));
                            // leadNews position array ------ start
                            InnerSpecialContents = ``
                            for (let i = 0; i < data.inner_category_content.length; i++) {
                                if (data.inner_category_content[i].ContentID) {
                                    InnerSpecialContents = InnerSpecialContents + `${data.inner_category_content[i].ContentID}`
                                    if (data.inner_category_content.length !== i + 1) {
                                        InnerSpecialContents = InnerSpecialContents + `, `
                                    }
                                }
                            }
                            InnerSpecialContents = InnerSpecialContents + ``
                        }
                        // leadNews position array ------ end
                        formData = { 'CategoryID': catID, 'limit': limit, 'offset': 0, 'InnerSpecialContents': InnerSpecialContents }
                        axios
                            .post(`${process.env.REACT_APP_API_URL}inner-category-content-more`, formData)
                            .then(({ data }) => {
                                if (data.inner_category_more_content) {
                                    setcatLeadMore(data.inner_category_more_content);
                                    showMore = true
                                    if (data.inner_category_more_content.length < limit) {
                                        showMore = false
                                    }
                                    setTimeout(function () {
                                        lazyloaded = false
                                        ForLazyLoaderImg(lazyloaded)
                                    }, 1000);
                                }
                            });

                    });
                axios
                    .get(`${process.env.REACT_APP_API_URL}json/file/generateCategoryPopular${catID}.json`)
                    .then(({ data }) => {
                        if (data.data) {
                            setcatLatest(data.data);
                        }
                    });
            });
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
    }, [catSlug])

    const toggleButtonState = () => {
        offset += limit
        showMore = true
        formData = { 'CategoryID': catID, 'limit': limit, 'offset': offset, 'InnerSpecialContents': InnerSpecialContents }
        axios
            .post(`${process.env.REACT_APP_API_URL}inner-category-content-more`, formData)
            .then(({ data }) => {
                if (data.inner_category_more_content) {
                    if (data.inner_category_more_content.length < limit) {
                        showMore = false
                    }
                    for (let i = 0; i < data.inner_category_more_content.length; i++) {
                        setcatLeadMore(oldArray => [...oldArray, data.inner_category_more_content[i]]);
                    }
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    };
    return (
        <>
            {catName ?
                <main>
                
                        <div className="container">
                            <h2 className="DTitle">
                                {/* <Link to={'/' + catName.Slug} onClick={scrollTop}> */}
                                <Link to={+ '/'} onClick={scrollTop}>
                                    <span className="DTitleInner"><span className="DTitleInnerBar"><span>{catName.CategoryName}</span></span></span>
                                </Link>
                                <DocumentTitle title={`${catName.CategoryName} | ${catName.CategoryName} সর্বশেষ খবর ::  দ্য নিউজ ২৪`} />
                                <CatLdJson CatNames={catName.CategoryName} CatNameSlug={catName.Slug} />
                            </h2>

                            <section>
                                <div className="row">
                                    <div className="col-lg-9 col-sm-12 DBorderRight">
                                        <>
                                            {catSlug === 'country' && <DivisionDistricName />}
                                        </>
                                        <div className="row">
                                            <div className="col-lg-8 col-12 d-flex">
                                                <div className="DCatLeadTop BorderRight">
                                                    {catLeadNews1 ?
                                                        <Link to={"/" + catLeadNews1.Slug + "/news/" + catLeadNews1.ContentID} onClick={scrollTop}>
                                                            <div className="row">
                                                                <div className="col-lg-8 col-12">
                                                                    <div className="DImgZoomBlock">
                                                                        <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + catLeadNews1.ImageBgPath} alt={catLeadNews1.ContentHeading} title={catLeadNews1.ContentHeading} /></picture>
                                                                        {catLeadNews1.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-4 col-12">
                                                                    <div className="Desc">
                                                                        <h3 className="Title BGTitle">{catLeadNews1.ContentHeading}</h3>
                                                                        <div className="Brief">
                                                                            <p>{catLeadNews1.ContentBrief}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link> : ""}
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-12 d-flex">
                                                <div className="DCatTop2 align-self-stretch">
                                                    {catLeadNews2 ?
                                                        <Link to={"/" + catLeadNews2.Slug + "/news/" + catLeadNews2.ContentID} onClick={scrollTop}>
                                                            <div className="row">
                                                                <div className="col-lg-12 col-sm-4 col-5">
                                                                    <div className="DImgZoomBlock">
                                                                        <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + catLeadNews2.ImageSmPath} alt={catLeadNews2.ContentHeading} title={catLeadNews2.ContentHeading} /></picture>
                                                                        {catLeadNews2.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-12 col-sm-8 col-7">
                                                                    <div className="Desc">
                                                                        <h3 className="Title">{catLeadNews2.ContentHeading}</h3>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link> : ""}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="DCatTop3">
                                            <div className="row">
                                                {catLeadNews3.map((nc) => {
                                                    return (
                                                        <div className="col-lg-4 col-12 d-flex" key={nc.ContentID}>
                                                            <div className="DCatTop3tList align-self-stretch">
                                                                <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                                                    <div className="row">
                                                                        <div className="col-lg-12 col-sm-4 col-5">
                                                                            <div className="DImgZoomBlock">
                                                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} /></picture>
                                                                                {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-12 col-sm-8 col-7">
                                                                            <div className="Desc">
                                                                                <h3 className="Title">{nc.ContentHeading}</h3>
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
                                    </div>
                                    <div className="col-lg-3 col-sm-12">
                                        <div className="DRightSideAdd d-flex justify-content-center">
                                            <Link to="/">
                                                <img src="/media/Advertisement/Advertisement(300X90).png" alt="Advertisement" title="Advertisement" />
                                            </Link>
                                        </div>
                                        <LeadLatestNews />
                                    </div>
                                </div>
                            </section>

                            <div className="DBannerAdd d-flex justify-content-center">
                                <Link to="/">
                                    <img src="/media/Advertisement/Advertisement(970X90).png" alt="Advertisement" title="Advertisement"
                                        className="img-fluid img100" />
                                </Link>
                            </div>

                            <section>
                                <div className="row">
                                    <div className="col-lg-9 col-sm-12 mt-4 BorderRight">
                                        <h2 className="LatestNewsH ">{catName.CategoryName} বিভাগের সব খবর</h2>
                                        <section className="DCatNewsListArea">
                                            <div className="row">
                                                {catNewsMore.map((nc) => {
                                                    return (
                                                        <div className="col-lg-6 col-12 d-flex" key={nc.ContentID}>
                                                            <div className="DCatNewsList align-self-stretch">
                                                                <Link to={"/" + catSlug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                                                    <div className="row">
                                                                        <div className="col-lg-5 col-sm-4 col-5">
                                                                            <div className="DImgZoomBlock">
                                                                                <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} /></picture>
                                                                                {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-7 col-sm-8 col-7">
                                                                            <div className="Desc">
                                                                                <h3 className="Title">{nc.ContentHeading}</h3>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </section>
                                        {showMore ?
                                            <div id="btnDiv" className="text-center mt-4 mb-4"><button id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG" onClick={toggleButtonState}>আরো পড়ুন</button></div>
                                            : false}
                                    </div>
                                    <div className="col-lg-3 col-sm-12">
                                        <CategoryPopular catLatest={catLatest} catSlug={catSlug} />
                                    </div>
                                </div>
                            </section>

                        </div>
                    
                </main>
                : <ErrorPage />}
        </>
    )
}
