import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import DocumentTitle from "react-document-title";
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
// import LatestPopularNews from './LatestPopularNews';
import ErrorPage from '../ErrorPage';
import CategoryPopular from './CategoryPopular';
import SubCatLdJson from './SubCatLdJson';
import LeadLatestNews from '../HomeContent/LeadLatestNews';
import RLoader from '../RLoader';

var lazyloaded = false
var showMore = true
var limit = 8
var LeadNewsLimit = 5
var offset = 0
var catID = 0
var InnerSpecialContents
var formData = []
export default function SubCategory() {
    let { catSlug, subCatSlug } = useParams();
    const [CatName, setCatName] = useState([])
    const [CatSlug, setCatSlug] = useState([])
    const [subCatName, setSubCatName] = useState([])

    const [subCatLead, setSubCatLead] = useState([]);
    const [subCatLead2, setSubCatLead2] = useState([]);
    const [subCatLead3, setSubCatLead3] = useState([]);

    const [subCatreadMore, setSubCatreadMore] = useState([]);
    const [catLatest, setcatLatest] = useState([])
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        setTimeout(() => { window.location.reload(1); }, 300000);
        setisLoading(true)
        setTimeout(() => { setisLoading(false) }, 300);
        offset = 0
        axios
            .get(`${process.env.REACT_APP_API_URL}sub-category-by-slug/${subCatSlug}`)
            .then(({ data }) => {
                if (data.catInfo.Slug === catSlug) {
                    catID = data.SubCategory.CategoryID
                    setCatSlug(data.catInfo.Slug);
                    setCatName(data.catInfo.CategoryName);
                    setSubCatName(data.SubCategory);

                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                    axios
                        .get(`${process.env.REACT_APP_API_URL}json/file/generateCategoryPopular${catID}.json`)
                        .then(({ data }) => {
                            if (data.data) {
                            setcatLatest(data.data);}
                        });
                    axios
                        .get(`${process.env.REACT_APP_API_URL}sub-category-content/${catID}/${LeadNewsLimit}`)
                        .then(({ data }) => {
                            // console.log(`${process.env.REACT_APP_API_URL}sub-category-content/${catID}/${LeadNewsLimit}`);
                            // if (data.sub_category_content.length > 0) {
                            if (data.sub_category_content) {
                                setSubCatLead(data.sub_category_content[0]);
                                setSubCatLead2(data.sub_category_content[1]);
                                setSubCatLead3(data.sub_category_content.slice(2, 5));
                                // leadNews position array ------ start
                                InnerSpecialContents = ``
                                for (let i = 0; i < data.sub_category_content.length; i++) {
                                    if (data.sub_category_content[i].ContentID) {
                                        InnerSpecialContents = InnerSpecialContents + `${data.sub_category_content[i].ContentID}`
                                        if (data.sub_category_content.length !== i + 1) {
                                            InnerSpecialContents = InnerSpecialContents + `, `
                                        }
                                    }
                                }
                                InnerSpecialContents = InnerSpecialContents + ``
                            }
                            // leadNews position array ------ end
                            formData = { 'CategoryID': catID, 'limit': limit, 'offset': 0, 'InnerSpecialContents': InnerSpecialContents }
                            // console.log(formData);
                            axios
                                .post(`${process.env.REACT_APP_API_URL}sub-category-content-more`, formData)
                                .then(({ data }) => {
                                    if (data.sub_category_more_content) {
                                        setSubCatreadMore(data.sub_category_more_content);
                                        showMore = true
                                        if (data.sub_category_more_content.length < limit) {
                                            showMore = false
                                        }
                                        setTimeout(function () {
                                            lazyloaded = false
                                            ForLazyLoaderImg(lazyloaded)
                                        }, 1000);
                                    }
                                });

                        });
                } else setCatName(null);
            });
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
    }, [catSlug, subCatSlug])

    const toggleButtonState = () => {
        offset += limit
        showMore = true
        formData = { 'CategoryID': catID, 'limit': limit, 'offset': offset, 'InnerSpecialContents': InnerSpecialContents }
        axios
            .post(`${process.env.REACT_APP_API_URL}sub-category-content-more`, formData)
            .then(({ data }) => {
                if (data.sub_category_more_content) {
                    if (data.sub_category_more_content.length < limit) {
                        showMore = false
                    }
                    for (let i = 0; i < data.sub_category_more_content.length; i++) {
                        setSubCatreadMore(oldArray => [...oldArray, data.sub_category_more_content[i]]);
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
            {CatName ?
                <main>
                          {isLoading === false ?
                    <div className="container">
                        <h2 className="DTitle">
                            <Link to={+ '/'} onClick={scrollTop}>
                                <span className="DTitleInner"><span className="DTitleInnerBar"><span>{subCatName.CategoryName}</span></span></span>
                            </Link>
                            <DocumentTitle title={`${subCatName.CategoryName} | ${subCatName.CategoryName} সর্বশেষ খবর ::  দ্য নিউজ ২৪`} />
                            <SubCatLdJson CatNames={CatName} CatNameSlug={CatSlug} SubCatNames={subCatName.CategoryName} SubCatNameSlug={subCatName.Slug} />
                        </h2>

                        <section>
                            <div className="row">
                                <div className="col-lg-9 col-sm-12">
                                    <div className="row">
                                        <div className="col-lg-8 col-12 d-flex">
                                            <div className="DCatLeadTop">
                                                
                                                {subCatLead ?
                                                    <Link to={"/" + catSlug + "/news/" + subCatLead.ContentID} onClick={scrollTop}>
                                                        <div className="row">
                                                            <div className="col-lg-8 col-12">
                                                                <div className="DImgZoomBlock">
                                                                    <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + subCatLead.ImageBgPath} alt={subCatLead.ContentHeading} title={subCatLead.ContentHeading} /></picture>
                                                                    {subCatLead.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4 col-12">
                                                                <div className="Desc">
                                                                    <h3 className="Title BGTitle">{subCatLead.ContentHeading}</h3>
                                                                    <div className="Brief">
                                                                        <p>{subCatLead.ContentBrief}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link> : ""}
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-12 d-flex">
                                            <div className="DCatTop2 align-self-stretch">
                                                {subCatLead2 ?
                                                    <Link to={"/" + catSlug + "/news/" + subCatLead2.ContentID} onClick={scrollTop}>
                                                        <div className="row">
                                                            <div className="col-lg-12 col-sm-4 col-5">
                                                                <div className="DImgZoomBlock">
                                                                    <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + subCatLead2.ImageSmPath} alt={subCatLead2.ContentHeading} title={subCatLead2.ContentHeading} /></picture>
                                                                    {subCatLead2.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12 col-sm-8 col-7">
                                                                <div className="Desc">
                                                                    <h3 className="Title">{subCatLead2.ContentHeading}</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link> : ""}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="DCatTop3">
                                        <div className="row">
                                            {subCatLead3.map((nc) => {
                                                return (
                                                    <div className="col-lg-4 col-12 d-flex" key={nc.ContentID}>
                                                        <div className="DCatTop3tList align-self-stretch">
                                                            <Link to={"/" + catSlug + "/news/" + nc.ContentID} onClick={scrollTop}>
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
                                    {/* <LatestPopularNews /> */}
                                    <LeadLatestNews />
                                </div>
                            </div>
                        </section>

                        <div className="DBannerAdd">
                            <Link to="/">
                                <img src="/media/Advertisement/Advertisement(970X90).png" alt="Advertisement" title="Advertisement"
                                    className="img-fluid img100" />
                            </Link>
                        </div>

                        <section>
                            <div className="row">
                                <div className="col-lg-9 col-sm-12">
                                    <h2 className="LatestNewsH mt-4">{subCatName.CategoryName} বিভাগের সব খবর</h2>
                                    <section className="DCatNewsListArea">
                                        <div className="row">
                                            {subCatreadMore.map((nc) => {
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
                    :
                    <RLoader /> 
                                    }
                </main>
                : <ErrorPage />}
        </>
    )
}
