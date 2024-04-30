import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { EmailIcon, FacebookIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from "react-share";
import DocumentTitle from 'react-document-title';
import LatestPopularNews from '../Category/LatestPopularNews'
import { scrollTop, ForLazyLoaderImg } from '../AllFunctions'
import ErrorPage from '../ErrorPage';

var lazyloaded = false
var showMore = true
var limit = 10
var offset = 0
export default function WritersPage() {
    const [pageURL, setPageURL] = useState(0);
    const [writers, setWriters] = useState([]);
    const [writersRelatedNews, setWritersRelatedNews] = useState([]);
    let { WriterSlug } = useParams();

    useEffect(() => {
        offset = 0
        axios
            .get(`${process.env.REACT_APP_API_URL}writers/${WriterSlug}`)
            .then(({ data }) => {
                if (data.writers.length !== 0) {
                    setWriters(data.writers)
                } else {
                    setWriters(null)
                }
            })
        axios
            .get(`${process.env.REACT_APP_API_URL}writers-content/${WriterSlug}/${limit}/${offset}`)
            .then(({ data }) => {
                if (data.writers_content.length < limit) {
                    showMore = false
                }
                setWritersRelatedNews(data.writers_content)
                if (data.writers_content.length !== 0) {
                    setTimeout(function () {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                    }, 1000);
                }
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            })
        setPageURL(window.location.href);
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        return () => clearTimeout(timer);
    }, [WriterSlug])

    const toggleButtonState = () => {
        offset += limit
        axios
            .get(`${process.env.REACT_APP_API_URL}writers-content/${WriterSlug}/${limit}/${offset}`)
            .then(({ data }) => {
                if (data.writers_content.length < limit) {
                    showMore = false
                }
                for (let i = 0; i < data.writers_content.length; i++) {
                    setWritersRelatedNews(oldArray => [...oldArray, data.writers_content[i]]);
                }
                setTimeout(function () {
                    lazyloaded = false
                    ForLazyLoaderImg(lazyloaded)
                }, 1000);
            });
    };
    return (
        <>
            {writers ?
                <main>
                    <div className="container">
                        <div className="TopHomeSection"></div>
                        <div className="DTagLead">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="DTagName">
                                        <i className="fa-solid fa-user"></i>
                                        <h1>লেখক বৃত্তান্ত:</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="writers-details">
                                <div className="row">
                                    {writers.map((nc) => {
                                        return (
                                            <React.Fragment key={nc.WriterID}>
                                                {nc.ImagePath ? (
                                                    <>
                                                        <div className="col-lg-2 col-sm-4 col-5">
                                                            <img src={process.env.REACT_APP_IMG_Writer + nc.ImagePath} alt={nc.WriterName} title={nc.WriterName} className="img-fluid img100" />
                                                        </div>
                                                        <div className="col-lg-10 col-sm-8 col-7">
                                                            <div className="Desc">
                                                                <h2 className="Title">{nc.WriterName}</h2>
                                                                <p dangerouslySetInnerHTML={{ __html: nc.WriterBio }}></p>
                                                                <DocumentTitle title={nc.WriterName} />
                                                                <div className="DSocialTop">
                                                                    {/* social media button end */}
                                                                    <FacebookShareButton url={pageURL} title={nc.WriterName}>
                                                                        <FacebookIcon size={30} round={true} />
                                                                    </FacebookShareButton>
                                                                    <LinkedinShareButton url={pageURL}>
                                                                        <LinkedinIcon size={30} round={true} />
                                                                    </LinkedinShareButton>
                                                                    <TwitterShareButton url={pageURL}>
                                                                        <TwitterIcon size={30} round={true} />
                                                                    </TwitterShareButton>
                                                                    <EmailShareButton url={pageURL} body="mailto:support@example.com">
                                                                        <EmailIcon size={30} round={true} />
                                                                    </EmailShareButton>
                                                                    <WhatsappShareButton url={pageURL}>
                                                                        <WhatsappIcon size={30} round={true} />
                                                                    </WhatsappShareButton>
                                                                    {/* social media button end */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className="col-12">
                                                        <div className="Desc">
                                                            <h2 className="Title">{nc.WriterName}</h2>
                                                            <DocumentTitle title={nc.WriterName} />
                                                            <div className="DSocialTop">
                                                                {/* social media button end */}
                                                                <FacebookShareButton url={pageURL} title={nc.WriterName}>
                                                                    <FacebookIcon size={30} round={true} />
                                                                </FacebookShareButton>
                                                                <LinkedinShareButton url={pageURL}>
                                                                    <LinkedinIcon size={30} round={true} />
                                                                </LinkedinShareButton>
                                                                <TwitterShareButton url={pageURL}>
                                                                    <TwitterIcon size={30} round={true} />
                                                                </TwitterShareButton>
                                                                <EmailShareButton url={pageURL} body="mailto:support@example.com">
                                                                    <EmailIcon size={30} round={true} />
                                                                </EmailShareButton>
                                                                <WhatsappShareButton url={pageURL}>
                                                                    <WhatsappIcon size={30} round={true} />
                                                                </WhatsappShareButton>
                                                                {/* social media button end */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}


                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-9 col-sm-12 border-right-inner1">
                                <div className="SubCategory read-more">
                                    <section className="SubCategoryList read-more">
                                        {writersRelatedNews.map((nc) => {
                                            return (
                                                <div className="archiveListNews" key={nc.WriterID}>
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
                                                                        <p dangerouslySetInnerHTML={{ __html: nc.ContentBrief }}></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        })}
                                    </section>
                                    {showMore &&
                                        <div id="btnDiv" className="text-center my-4">
                                            <button type="submit" name="btnSubmit" className="btn btn-lg btn-block ButtonBG" onClick={toggleButtonState}>
                                                আরো পড়ুন
                                            </button>
                                        </div>}
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-12 mb-4 Subcat">
                                <LatestPopularNews />
                            </div>
                        </div>

                    </div>
                </main>
                : <ErrorPage />}
        </>
    )
}
