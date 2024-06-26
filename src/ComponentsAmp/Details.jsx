import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { banglaDateConvetar, ForLazyLoaderImg, scrollTop } from './AllFunctions'
import ErrorPage from './ErrorPage'
// import DCatLatest from './DCatLatest'
// import DCatPopular from './DCatPopular'
// import DWriters from './DWriters'
// import DFrom from './DFrom'
import DSocialShare from './DSocialShare'
// import DfbComment from './DfbComment'
// import Ldjson from './Ldjson'
// import RLoader from '../RLoader'
// import RLoader from '../RLoader'
var lazyloaded = false
var dateArray = []
var allTags
var tagArray = []
var catID
var nextNewsIDs = []
var ajaxLoading = false;
var maxNews = 0;
var contentLoaded = false
var dataCalled = false // for once call function

var R_ContentData = []
export default function Details() {
    let { catSlug, id } = useParams()
    const [catName, setCatName] = useState([])
    const [state, setState] = useState([])
    const [catLatest, setCatLatest] = useState([])
    const [catPopular, setCatPopular] = useState([])
    const [writer, setWriter] = useState([]);
    // const [isLoading, setisLoading] = useState(true)
    // const [isLoading, setisLoading] = useState(true)

    const PrintAble = () => { window.print(); };
    useEffect(() => {
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        setTimeout(() => { window.location.reload(1); }, 300000);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);
        // setisLoading(true)
        // setTimeout(() => { setisLoading(false) }, 300);
        contentLoaded = false
        axios
            .get(`${process.env.REACT_APP_API_URL}category/${catSlug}`)
            .then(({ data }) => {
                if (data.category !== null) {
                    // setisLoading(false)
                    // setisLoading(false)
                    setCatName(data.category);
                    catID = data.category.CategoryID
                    axios
                        .get(`${process.env.REACT_APP_API_URL}category-latest-content/${catID}/5`)
                        .then(({ data }) => {
                            setCatLatest(data.category_latest_contents);
                        });
                    axios
                        .get(`${process.env.REACT_APP_API_URL}json/file/generateCategoryPopular${catID}.json`)
                        .then(({ data }) => {
                            setCatPopular(data.data.slice(0, 4));
                        });
                    axios
                        .get(`${process.env.REACT_APP_API_URL}content-next-details/${catID}/${id}`)
                        .then(({ data }) => {
                            nextNewsIDs = []
                            maxNews = data.data.length + 1
                            for (let i = 0; i < data.data.length; i++) {
                                nextNewsIDs.push(data.data[i].ContentID)
                            }
                        });
                }
            });
        if (!dataCalled) {
            dataCalled = true
            axios
                .get(`${process.env.REACT_APP_API_URL}content-details/${catSlug}/${id}`)
                .then(({ data }) => {
                    dataCalled = false
                    if (data.contentDetails.length > 0) {
                        if (id !== data.contentDetails[0].contentID) {
                            setState(data.contentDetails);
                            document.title = data.contentDetails[0].ContentHeading;
                            setTimeout(function () {
                                contentLoaded = true
                                lazyloaded = false
                                ForLazyLoaderImg(lazyloaded)
                            }, 1000);
                            setTimeout(function () {
                                inner_Caption(data.contentDetails[0].ContentID)
                                ineerRelatedNews(data.contentDetails[0].ContentID)
                            }, 400);
                            if (data.contentDetails[0].create_date) {
                                dateArray = [data.contentDetails[0].create_date]
                            } else {
                                dateArray = [[]]
                            }
                            allTags = data.contentDetails[0].Tags
                            if (allTags) {
                                tagArray = [allTags.split(',')]
                            } else {
                                tagArray = [[]]
                            }
                            setWriter([data.writerInfo])
                            if (data.contentDetails[0].RelNewsIDs) {
                                axios
                                    .get(`${process.env.REACT_APP_API_URL}related-news/${id}`)
                                    .then(({ data }) => {
                                        R_ContentData['id' + id] = data.relatedNewslist;
                                    });
                            }
                        }
                    } else setState(null);
                });
        }



        const handleScroll = () => {
            if (contentLoaded) {
                var counter = document.getElementsByClassName("newsDetail").length[0];
                if (counter >= 0) {
                    var elmnt = document.getElementsByClassName("newsDetail")[counter];
                    if (window.pageYOffset + 200 > (elmnt.offsetHeight + elmnt.offsetTop) - window.innerHeight && !ajaxLoading && counter + 1 < maxNews && nextNewsIDs[counter]) {
                        ajaxLoading = true;
                        axios
                            .get(`${process.env.REACT_APP_API_URL}content-details/${catSlug}/${nextNewsIDs[counter]}`)
                            .then(({ data }) => {
                                if (data.contentDetails && data.contentDetails[0] && data.contentDetails[0].ContentID && !document.getElementById(data.contentDetails[0].ContentID)) {
                                    setState(oldArray => [...oldArray, data.contentDetails[0]]);
                                    ajaxLoading = false;
                                    setTimeout(function () {
                                        lazyloaded = false
                                        ForLazyLoaderImg(lazyloaded)
                                    }, 1000);
                                    setTimeout(function () {
                                        inner_Caption(data.contentDetails[0].ContentID)
                                        ineerRelatedNews(data.contentDetails[0].ContentID)
                                    }, 400);
                                    if (data.contentDetails[0].create_date) {
                                        dateArray.push(data.contentDetails[0].create_date)
                                    } else {
                                        dateArray.push([])
                                    }
                                    allTags = data.contentDetails[0].Tags
                                    if (allTags) {
                                        tagArray.push(allTags.split(','))
                                    } else {
                                        tagArray.push([])
                                    }
                                    setWriter(oldArray => [...oldArray, data.writerInfo])
                                    axios
                                        .get(`${process.env.REACT_APP_API_URL}related-news/${nextNewsIDs[counter]}`)
                                        .then(({ data }) => {
                                            R_ContentData['id' + nextNewsIDs[counter]] = data.relatedNewslist;
                                        });
                                }
                                else {
                                    ajaxLoading = false;
                                }
                            });
                    }

                    var Wscroll = window.pageYOffset
                    var elements = document.getElementsByClassName('newsDetail');

                    for (var i = 0; i < elements.length; i++) {
                        if (Wscroll > elements[i].offsetTop && Wscroll < elements[i].offsetTop + elements[i].offsetHeight) {
                            let id = elements[i].getAttribute('id')
                            let title = elements[i].getAttribute('data-title')

                            if ((window.location.href).split('/').pop() !== id) {
                                document.title = title;
                                document.querySelector('meta[name="description"]').setAttribute("content", title);
                                if (!localStorage.getItem('contentView_' + id)) {
                                    localStorage.setItem('contentView_' + id, 1);
                                    axios
                                        .get(`${process.env.REACT_APP_API_URL}hit-count/${id}`)
                                        .then(({ data }) => {
                                        })
                                }
                                window.history.replaceState(null, null, id);
                            }
                        }
                    }
                }
            }
        }


        window.addEventListener("scroll", handleScroll, { passive: true });

        const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timer);
        }
    }, [catSlug, id])
    if (!localStorage.getItem('contentView_' + id)) {
        localStorage.setItem('contentView_' + id, 1);
        axios
            .get(`${process.env.REACT_APP_API_URL}hit-count/${id}`)
            .then(({ data }) => {
            })
    }

    const inner_Caption = (id) => {
        let contentImages = document.querySelectorAll(`#contentDetails.contentDetails${id} p img`)
        for (let index = 0; index < contentImages.length; index++) {
            let caption = contentImages[index].getAttribute('alt');
            let pstyle = contentImages[index].getAttribute('style');
            contentImages[index].removeAttribute('style');
            let image = contentImages[index].outerHTML
            if (caption !== "") {
                let newDiv = `<div className="dCaption2" style="${pstyle}">${image}<p className="img-caption">${caption}</p></div>`
                contentImages[index].outerHTML = newDiv
            } else {
                let newDiv = `<div class="dCaption2" style="${pstyle}">${image}</div>`
                contentImages[index].outerHTML = newDiv
            }
        }

        let contentIframes = document.querySelectorAll(`#contentDetails.ContentDetails${id} p iframe`)
        for (let index = 0; index < contentIframes.length; index++) {
            let iframe = contentIframes[index].outerHTML
            let newDiv = `<div class="embed-responsive embed-responsive-16by9">${iframe}</div>`
            contentIframes[index].outerHTML = newDiv
            // console.log(iframe);
        } //internal video from iframe

        let contentScript = document.querySelectorAll(`#contentDetails.contentDetails${id} p script`)
        for (let index = 0; index < contentScript.length; index++) {
            let script = contentScript[index]
            var newscript = document.createElement('script');
            newscript.type = 'text/javascript';
            newscript.async = true;
            newscript.src = script.src;
            script.parentNode.insertBefore(newscript, script)
            script.remove()
        }//reRun twitter & instragram-embed script from API
    }

    const ineerRelatedNews = (id) => {
        var contentDetails = document.querySelectorAll(`#contentDetails.ContentDetails${id} p`)[0]
        var contentDetailsChildDiv = document.querySelectorAll(`#contentDetails.ContentDetails${id} p`)[0].children[1]
        var contentDetailsChildDiv2 = document.querySelectorAll(`#contentDetails.ContentDetails${id} p`)[0].children[2]

        const relatedNewsDiv = document.createElement('div');
        relatedNewsDiv.className = 'DRelatedNewsSection d-print-none';
        const para = document.createElement("p");
        para.className = 'DRelatedNews Title';
        para.innerHTML = `<i class="fa-solid fa-list"></i> আরও পড়ুন:`
        relatedNewsDiv.appendChild(para);

        const relatedNewsMainDiv = document.createElement('div');
        relatedNewsMainDiv.className = 'row';

        // let R_Arr = R_ContentData['id' + id]
        // let R_HTML = ''
        // for (let i = 0; i < R_Arr.length; i++) {
        //     if (contentDetailsChildDiv !== null) {
        //         R_HTML += `<div class="col-lg-3 col-12 d-flex ss">
        //             <div class="DRelatedNewsList align-self-stretch">
        //                 <a href=${process.env.REACT_APP_FONT_DOMAIN_URL + R_Arr[i].Slug + "/news/" + R_Arr[i].ContentID}>
        //                     <div class="row">
        //                         <div class="col-lg-12 col-sm-4 col-5">
        //                             <div class="DImgZoomBlocktest">
        //                                 <picture><img src=${process.env.REACT_APP_DOMAIN_URL + "media/imgAll/" + R_Arr[i].ImageSmPath} alt='${R_Arr[i].ContentHeading}' title='${R_Arr[i].ContentHeading}' /></picture>
        //                                 ${R_Arr[i].ShowVideo === 1 || R_Arr[i].VideoID ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
        //                             </div>
        //                         </div>
        //                         <div class="col-lg-12 col-sm-8 col-7">
        //                             <div class="Desc">
        //                                 <h3 class="Title">${R_Arr[i].ContentHeading}</h3>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </a>
        //             </div>
        //         </div>`;
        //         if (R_Arr.length >= i + 1) {
        //             relatedNewsDiv.appendChild(relatedNewsMainDiv);
        //             relatedNewsMainDiv.innerHTML = R_HTML
        //             contentDetails.insertBefore(relatedNewsDiv, contentDetailsChildDiv2);
        //         }
        //     }
        // }
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-8 m-auto">
                    {state ?
                        <main>

                            <>
                                <section>
                                    <div className="DSecTitle">
                                        <Link to={'/amp/' + catName.Slug}>
                                            <h3><span className="ColorBox"></span>{catName.CategoryName}</h3>
                                        </Link>
                                    </div>
                                </section>

                                <section id="newsSection">
                                    {state.map((news, i) => {
                                        return (
                                            <div className="newsDetail" id={news.ContentID} data-title={news.ContentHeading} key={news.ContentID}>
                                                {/* <Ldjson news={news} catName={catName} catSlug={catSlug} /> */}
                                                <div className=" mt-2">
                                                    <div className="ContentDetails">
                                                        {news.ContentSubHeading && <h3 className='DHeadingSubHeading'>{news.ContentSubHeading}</h3>}
                                                        <h1>{news.DetailsHeading ? news.DetailsHeading : news.ContentHeading}</h1>
                                                        {news.ContentShoulder && <h4 className='DHeadingContentShoulder'>{news.ContentShoulder}</h4>}
                                                    </div>

                                                    {news.VideoID !== null && news.VideoID !== '' && news.ShowVideo === 1 ?
                                                        <>
                                                            <div className={allTags === null ? "col-sm-12 video-container mt-2" : "col-sm-12 video-container"}>
                                                                {news.VideoType === "youtube" ?
                                                                    <iframe className="embed-responsive-item" title="youtube-video" src={"https://www.youtube.com/embed/" + news.VideoID + "?autoplay=0"} frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                                                                    : news.VideoType === "vimeo" ?
                                                                        <iframe src={"https://player.vimeo.com/video/" + news.VideoID} title="vimeo-video" frameBorder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
                                                                        : news.VideoType === "facebook" ?
                                                                            <iframe src={"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F" + news.VideoID + "%2F&show_text=0&width=560"} title="facebook-video" width="560" height="315" style={{ border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                                                            : news.VideoType === "instagram" ?
                                                                                <iframe className="embed-responsive-item" title="instagram-video" src={"//instagram.com/p/" + news.VideoID + ">/embed"} width="100%" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                                                                                : false}
                                                            </div>

                                                            <div style={{ paddingTop: "20px", paddingLeft: "5px" }}>
                                                                <DSocialShare title={news.ContentHeading} contentID={news.ContentID} />
                                                            </div>

                                                        </> :
                                                        <>
                                                            <div className="DTopImg">
                                                                <div className="Details">
                                                                    <picture><amp-img src={process.env.REACT_APP_IMG_Path + news.ImageBgPath} alt={news.ContentHeading} title={news.ContentHeading} layout="responsive" width="600" height='351px' /></picture>
                                                                </div>
                                                                {/* <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + news.ImageBgPath} alt={news.ContentHeading} title={news.ContentHeading} className="img-fluid img100" /> */}
                                                                <div className="DetailsTopCap">
                                                                    <p className="DTopImgCaption">{news.ImageBgPathCaption}</p>
                                                                    {/* <p className="DTopImgCaption">{dateArray[i][1] && banglaDateConvetar(dateArray[i][1])}</p> */}
                                                                    <p className="DTopImgCaption">{dateArray[i] && banglaDateConvetar(format(new Date(dateArray[i]), 'dd MMMM yyyy, H:mm'))}</p>
                                                                </div>
                                                            </div>
                                                            <div style={{ paddingTop: "20px", paddingLeft: "5px" }}>
                                                                <DSocialShare title={news.ContentHeading} contentID={news.ContentID} />
                                                            </div>


                                                        </>
                                                    }

                                                    {/* <div className="col-lg-4 col-12 d-none d-lg-block detailsPage">
                                                    <DCatLatest catLatest={catLatest} catName={catName.CategoryName} catSlug={catSlug} />
                                                </div> */}
                                                </div>


                                                <div className={'ContentDetails page-break  ContentDetails' + news.ContentID} id="contentDetails">
                                                    {/* {news.ContentSubHeading && <h3 className='DHeadingSubHeading'>{news.ContentSubHeading}</h3>}
                                                    <h1>{news.DetailsHeading ? news.DetailsHeading : news.ContentHeading}</h1>
                                                    {news.ContentShoulder && <h4 className='DHeadingContentShoulder'>{news.ContentShoulder}</h4>} */}
                                                    {/* <DocumentTitle title={news.ContentHeading} /> */}
                                                    <p dangerouslySetInnerHTML={{ __html: news.ContentDetails }}></p>

                                                </div>
                                                {/* <div className="DTagsNews d-print-none">
                                                            {tagArray && tagArray[i].map((nc) => {
                                                                return (
                                                                    <Link to={"/tags/" + nc} key={nc} onClick={scrollTop}><p>{nc}</p></Link>
                                                                )
                                                            })}
                                                        </div> */}
                                                {/* <DfbComment contentID={news.ContentID} /> */}



                                            </div>
                                        )
                                    })}
                                </section>

                                {/* <section>
                                <div className="row mt-3 d-print-none">
                                    <div className="col-lg-9 col-12">
                                        <div className="row d-block d-lg-none">
                                            <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-10 offset-1 my-4">
                                                <DFrom />
                                            </div>
                                        </div>
                                        <div className="DRelatedNews">
                                            <DCatPopular catPopular={catPopular} catName={catName.CategoryName} catSlug={catSlug} />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-12">
                                        <div className="mt-4 d-block d-lg-none">
                                            <DCatLatest catLatest={catLatest} catName={catName.CategoryName} catSlug={catSlug} />
                                        </div>
                                    </div>
                                </div>
                            </section> */}
                            </>

                        </main>
                        : <ErrorPage />}
                </div>
            </div>
        </div>
    )
}
