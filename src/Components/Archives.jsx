import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { scrollTop, banglaDateConvetar, ForLazyLoaderImg } from './AllFunctions'
import { useLocation } from 'react-router-dom';
// import RLoader from './RLoader'

var lazyloaded = false
var offset = 0
var limit = 12
var showMore = true

var start_date = ""
var end_date = ""
var category_name = ""

var formData = []
export default function Archives() {
    const { state } = useLocation();
    const [allCategoryList, setAllCategoryList] = useState([]);
    const [news, setNews] = useState([]);
    // const [isLoading, setisLoading] = useState(true)
    // console.log(state);
    useEffect(() => {
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        setTimeout(() => { window.location.reload(1); }, 300000);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);
        // window.scrollTo(0, 0)
        // state = { 'start_date': "", 'end_date': "", 'category_name': "0", 'limit': limit, 'offset': offset }
        if (state) {
            axios
                .post(`${process.env.REACT_APP_API_URL}archive`, state)
                .then(({ data }) => {
                    // setisLoading(false)
                    setNews(data.archive_data);
                    if (data.archive_data.length < limit) {
                        showMore = false
                    }
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                });
        } else {
            offset = 0
            formData = { 'start_date': "", 'end_date': "", 'category_name': "", 'limit': limit, 'offset': offset }
            axios
                .post(`${process.env.REACT_APP_API_URL}archive`, formData)
                .then(({ data }) => {
                    if (data.archive_data.length < limit) {
                        showMore = false
                    }
                    setNews(data.archive_data);
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                });
        }
        axios
            .get(`${process.env.REACT_APP_API_URL}category`)
            .then(({ data }) => {
                setAllCategoryList(data.categories);
            });
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
    }, [state]);

    const resultSubmit = (e) => {
        e.preventDefault()
        start_date = e.target.start_date.value;
        end_date = e.target.end_date.value;
        category_name = parseInt(e.target.category_name.value);
        offset = 0
        formData = { 'start_date': start_date, 'end_date': end_date, 'category_name': category_name, 'limit': limit, 'offset': offset }
        axios
            .post(`${process.env.REACT_APP_API_URL}archive`, formData)
            .then(({ data }) => {
                setNews(data.archive_data);
                if (data.archive_data.length < limit) {
                    showMore = false
                }
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            });
    }

    const toggleButtonState = (e) => {
        e.preventDefault()
        offset += limit
        formData = { 'start_date': start_date, 'end_date': end_date, 'category_name': category_name, 'limit': limit, 'offset': offset }
        axios
            .post(`${process.env.REACT_APP_API_URL}archive`, formData)
            .then(({ data }) => {
                if (data.archive_data.length < limit) {
                    showMore = false
                }
                for (let i = 0; i < data.archive_data.length; i++) {
                    setNews(oldArray => [...oldArray, data.archive_data[i]]);
                }
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            });
    }

    return (
        <main>
         
            <div className="container">
                <div className="TopHomeSection"></div>
                <DocumentTitle title=" দ্য নিউজ ২৪ :: আর্কাইভস" />
                <h2 className="DTitle"><Link to="/archives"><span className="DTitleInner"><span className="DTitleInnerBar"><span>আর্কাইভস</span></span></span></Link></h2>
                <div className="row">
                    <div className="col-sm-12 my-4">
                        <form className="form-inline" onSubmit={resultSubmit}>
                            <div className="form-group clearfix">
                                <div className="row">
                                    <div className="col-sm-4 my-2">
                                        <label htmlFor="start_date">  তারিখ হতে :</label>
                                        <input type="date" className="form-control hasDatepicker" id="datepicker" name="start_date" />
                                    </div>
                                    <div className="col-sm-4 my-2">
                                        <label htmlFor="end_date">  তারিখ পর্যন্ত :</label>
                                        <input type="date" id="datepickerto" name="end_date" className="form-control hasDatepicker" />
                                    </div>
                                    <div className="col-sm-4 my-2">
                                        <label htmlFor="category_name">  সব ক্যাটাগরি :</label>
                                        <select defaultValue={'0'} name="category_name" className="form-control cboCatName">
                                            <option value="0" disabled>সকল খবর</option>
                                            {allCategoryList.map((nc) => {
                                                return (
                                                    <option key={nc.CategoryID} value={nc.CategoryID}>{nc.CategoryName}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div id="btnDiv" className="text-center my-4">
                                <button type="submit" name="btnSubmit" className="btn btn-lg btn-block ButtonBG">
                                    খুঁজুন
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="DAdd1 mb-4 d-flex  justify-content-center">
                            <Link to="/"><img src={"/media/Advertisement/Advertisement(970X90).png"} alt="Advertisement" title="Advertisement" className="img-fluid img100" /></Link>
                        </div>
                    </div>
                </div>
                <div className="row archiveSection">
                    {news.map((nc) => {
                        return (
                            <div className="col-lg-6 col-sm-12" key={nc.ContentID}>
                                <div className="archiveListNews" >
                                    <Link to={"/" + nc.Slug + "/news/" + nc.ContentID} onClick={scrollTop}>
                                        <div className="row">
                                            <div className="col-sm-4 col-5 card-video-part">
                                                <div className="DImgZoomBlock">
                                                    <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageSmPath} alt={nc.ContentHeading} title={nc.ContentHeading} /></picture>
                                                    {nc.ShowVideo === 1 && <div className="card-video-icon"><i className="fa-solid fa-play"></i></div>}
                                                </div>
                                            </div>
                                            <div className="col-sm-8 col-7">
                                                <div className="Desc">
                                                    <h3 className="Title BGTitle">{nc.ContentHeading}</h3>
                                                    <div className="Brief">
                                                        <p>{nc.ContentBrief}</p>
                                                    </div>
                                                </div>
                                                <p className="pDate">{banglaDateConvetar(nc.create_date)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {showMore &&
                    <div id="btnDiv" className="text-center mt-3 mb-4">
                        <button onClick={toggleButtonState} id="ajax-more-btn" className="btn btn-lg btn-block ButtonBG">আরো খবর...</button>
                    </div>}
            </div>
            
        

        </main>
    )
}
