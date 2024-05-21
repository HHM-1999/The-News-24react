import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { banglaDateConvetar, ForLazyLoaderImg, scrollTop } from '../AllFunctions'
import ErrorPage from '../ErrorPage'
import DCatLatest from './DCatLatest'
import DCatPopular from './DCatPopular'
// import DocumentTitle from 'react-document-title'
// import DRelatedNews from './DRelatedNews'
import DWriters from './DWriters'
import DFrom from './DFrom'
import DSocialShare from './DSocialShare'
import DfbComment from './DfbComment'
import Ldjson from './Ldjson'
var lazyloaded = false
var dateArray = []
var allTags
var tagArray = []
// var RelatedNews = []
var catID
var nextNewsIDs = []
var ajaxLoading = false;
var maxNews = 0;
var contentLoaded = false
var dataCalled = false
export default function Details() {
    let { catSlug, id } = useParams()
    const [catName, setCatName] = useState([])
    const [state, setState] = useState([])
    const [catLatest, setCatLatest] = useState([])
    const [catPopular, setCatPopular] = useState([])
    // const [relatedNews, setRelatedNews] = useState([])
    const [writer, setWriter] = useState([]);
    // const [nextNews, setNextNews] = useState([]);
    // const [writer, setWriter] = useState([]);
    // const [involvedNews, setInvolvedNews] = useState([])
    // const [relatedNews, setRelatedNews] = useState([])
    // const [readMore, setReadMore] = useState([])
    // const [latestNews, setLatestNews] = useState([])
    // const [popularNews, setPopularNews] = useState([])

    const PrintAble = () => { window.print(); };
    useEffect(() => {
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // window.scrollTo(0, 0)
        contentLoaded = false
        axios
            .get(`${process.env.REACT_APP_API_URL}category/${catSlug}`)
            .then(({ data }) => {
                if (data.category !== null) {
                    setCatName(data.category);
                    catID = data.category.CategoryID
                    axios
                        .get(`${process.env.REACT_APP_API_URL}category-latest-content/${catID}/4`)
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
                            // console.log(id);
                            nextNewsIDs = []
                            maxNews = data.data.length + 1
                            for (let i = 0; i < data.data.length; i++) {
                                nextNewsIDs.push(data.data[i].ContentID)
                            }
                            // setNextNews(nextNewsIDs)
                            // console.log(nextNewsIDs);
                        });
                }
            });
        if (!dataCalled) {
            // console.log(dataCalled)
            dataCalled = true
            axios
                .get(`${process.env.REACT_APP_API_URL}content-details/${catSlug}/${id}`)
                .then(({ data }) => {
                    if (data.contentDetails.length > 0) {
                        setState(data.contentDetails);
                        document.title = data.contentDetails[0].ContentHeading;
                        setTimeout(function () {
                            contentLoaded = true
                            lazyloaded = false
                            ForLazyLoaderImg(lazyloaded)
                        }, 1000);
                        setTimeout(function () {
                            console.log('here')
                            inner_Caption(data.contentDetails[0].ContentID)
                        }, 400);
                        if (data.contentDetails[0].create_date) {
                            dateArray = [data.contentDetails[0].create_date.split(',')]
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
                        // // RelatedNews = [data.contentDetails[0].RelNewsIDs]
                        // if (data.contentDetails[0].RelNewsIDs) {
                        //     axios
                        //         .get(`${process.env.REACT_APP_API_URL}related-news/${id}`)
                        //         .then(({ data }) => {
                        //             setRelatedNews([data.relatedNewslist]);
                        //         });
                        // }else{
                        //     setRelatedNews(['']);
                        // }

                        // if (data.contentDetails[0].WriterID) {
                        //     axios
                        //         .get(`${process.env.REACT_APP_API_URL}writers-info/${data.contentDetails[0].WriterID}`)
                        //         .then(({ data }) => {
                        //             setWriter([data.writers_by_ID])
                        //         })
                        // } else if (data.contentDetails[0].ReporterID) {
                        //     axios
                        //         .get(`${process.env.REACT_APP_API_URL}writers-info/${data.contentDetails[0].ReporterID}`)
                        //         .then(({ data }) => {
                        //             setWriter([data.writers_by_ID])
                        //         })
                        // } else if (data.contentDetails[0].DistCorsID) {
                        //     axios
                        //         .get(`${process.env.REACT_APP_API_URL}writers-info/${data.contentDetails[0].DistCorsID}`)
                        //         .then(({ data }) => {
                        //             setWriter([data.writers_by_ID])
                        //         })
                        // } else {
                        //     setWriter([''])
                        // }
                    } else setState(null);
                });
        }



        const handleScroll = () => {
            if (contentLoaded) {
                // console.log('nextNews');
                // console.log(nextNewsIDs);
                var counter = document.getElementsByClassName("newsDetail").length - 1;
                if (counter >= 0) {
                    var elmnt = document.getElementsByClassName("newsDetail")[counter];
                    // console.log(counter);
                    // // console.log(elmnt);
                    // // var event = e.target
                    // // console.log(window.pageYOffset);
                    // console.log(maxNews);
                    // console.log(ajaxLoading);
                    if (window.pageYOffset + 200 > (elmnt.offsetHeight + elmnt.offsetTop) - window.innerHeight && !ajaxLoading && counter + 1 < maxNews && nextNewsIDs[counter]) {
                        ajaxLoading = true;
                        // // let newsID = elmnt.id;
                        // console.log(nextNewsIDs[counter]);
                        // // console.log(elmnt.id);
                        // // console.log(state);

                        axios
                            .get(`${process.env.REACT_APP_API_URL}content-details/${catSlug}/${nextNewsIDs[counter]}`)
                            .then(({ data }) => {
                                if (data.contentDetails && data.contentDetails[0] && data.contentDetails[0].ContentID && !document.getElementById(data.contentDetails[0].ContentID)) {
                                    setState(oldArray => [...oldArray, data.contentDetails[0]]);
                                    ajaxLoading = false;
                                    // console.log(data);
                                    setTimeout(function () {
                                        lazyloaded = false
                                        ForLazyLoaderImg(lazyloaded)
                                    }, 1000);
                                    setTimeout(function () {
                                        inner_Caption(data.contentDetails[0].ContentID)
                                    }, 400);
                                    if (data.contentDetails[0].create_date) {
                                        dateArray.push(data.contentDetails[0].create_date.split(','))
                                    } else {
                                        dateArray.push([])
                                    }
                                    allTags = data.contentDetails[0].Tags
                                    if (allTags) {
                                        tagArray.push(allTags.split(','))
                                    } else {
                                        tagArray.push([])
                                    }
                                    // // RelatedNews = data.contentDetails[0].RelNewsIDs
                                    // if (data.contentDetails[0].RelNewsIDs) {
                                    //     axios
                                    //         .get(`${process.env.REACT_APP_API_URL}related-news/${nextNews[counter]}`)
                                    //         .then(({ data }) => {
                                    //             setRelatedNews(oldArray => [...oldArray, data.relatedNewslist]);
                                    //         });
                                    // }else{
                                    //     setRelatedNews(oldArray => [...oldArray, '']);
                                    // }
                                    // setWriter(data.writerInfo)
                                    setWriter(oldArray => [...oldArray, data.writerInfo])
                                    // if (data.contentDetails[0].WriterID) {
                                    //     axios
                                    //         .get(`${process.env.REACT_APP_API_URL}writers-info/${data.contentDetails[0].WriterID}`)
                                    //         .then(({ data }) => {
                                    //             setWriter(oldArray => [...oldArray, data.writers_by_ID]);
                                    //         })
                                    // } else if (data.contentDetails[0].ReporterID) {
                                    //     axios
                                    //         .get(`${process.env.REACT_APP_API_URL}writers-info/${data.contentDetails[0].ReporterID}`)
                                    //         .then(({ data }) => {
                                    //             setWriter(oldArray => [...oldArray, data.writers_by_ID]);
                                    //         })
                                    // } else if (data.contentDetails[0].DistCorsID) {
                                    //     axios
                                    //         .get(`${process.env.REACT_APP_API_URL}writers-info/${data.contentDetails[0].DistCorsID}`)
                                    //         .then(({ data }) => {
                                    //             setWriter(oldArray => [...oldArray, data.writers_by_ID]);
                                    //         })
                                    // } else {
                                    //     setWriter(oldArray => [...oldArray, '']);
                                    // }
                                }
                                else {
                                    ajaxLoading = false;
                                    // setState(oldArray => [...oldArray, {}]);
                                }
                            });

                        //     $.ajax({
                        //         type:'POST',
                        //         url:'<?php echo $sSiteURL; ?>ajax_load_next_news.php',
                        //         data:{ 'action':'loadContent', 'newsID':newsID, 'catID':catID },
                        //         success:function(result){
                        //         //  	console.log(result);
                        //             $("#newsSection").append(result);
                        // //   			if(result != ''){
                        // //   			    $('.read-more-container').append(result).show('slow');
                        //             //   }else{
                        //             //       $('#ajax-more-btn').hide();
                        //             //   }
                        //             ajaxLoading = false;
                        //         }
                        //     });
                    }

                    var Wscroll = window.pageYOffset
                    // console.log('scroll '+Wscroll);
                    var elements = document.getElementsByClassName('newsDetail');

                    for (var i = 0; i < elements.length; i++) {
                        // let ThisOffset = elements[i].offsetTop;
                        // console.log(ThisOffset);
                        if (Wscroll > elements[i].offsetTop && Wscroll < elements[i].offsetTop + elements[i].offsetHeight) {
                            let id = elements[i].getAttribute('id')
                            let title = elements[i].getAttribute('data-title')
                            // console.log('id'+id);
                            // console.log(title);

                            if ((window.location.href).split('/').pop() !== id) {
                                document.title = title;
                                document.querySelector('meta[name="description"]').setAttribute("content", title);
                                // console.log('changeurl');
                                if (!localStorage.getItem('contentView_' + id)) {
                                    localStorage.setItem('contentView_' + id, 1);
                                    axios
                                        .get(`${process.env.REACT_APP_API_URL}hit-count/${id}`)
                                        .then(({ data }) => {
                                        })
                                }
                                window.history.replaceState(null, null, id);
                            }
                            // console.log('urlchange');

                            // let response = {'pageTitle': title, 'pageDescription': title}
                            // processAjaxData(response, id)
                        }
                        // if(Wscroll > ThisOffset.top &&  Wscroll < ThisOffset.top  + $(this).outerHeight(true)){
                        //     let id = $(this).attr('id');
                        //     let title = $(this).attr('data-title');
                        //     // console.log($(this).attr('id'));
                        //     let response = {'pageTitle': title, 'pageDescription': title}
                        //     processAjaxData(response, id)
                        // }
                    }
                }
            }
        }


        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
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

    // const processAjaxData = (response, urlPath) => {
    //     console.log(urlPath);
    //     document.title = response.pageTitle;
    //     document.querySelector('meta[name="description"]').setAttribute("content", response.pageDescription);
    //     window.history.replaceState(null, null, urlPath);
    // }


    return (
        <>

            {state ?
                <main>
                    <div className="container">
                        <div className="LOGOIMG">
                            <img src={process.env.REACT_APP_FONT_DOMAIN_URL + "media/common/logo.png"} alt="TheNews24 || দ্য নিউজ ২৪" title="TheNews24 || দ্য নিউজ ২৪" className="img-fluid img100" />
                        </div>
                        <section>
                            <div className="row d-print-none">
                                <div className="col-lg-2 col-12 my-2">
                                    <div className="DSecTitle">
                                        <Link to={'/' + catName.Slug}>
                                            <h2>{catName.CategoryName}</h2>
                                        </Link>
                                    </div>
                                </div>
                                {/* <div className="col-lg-10 col-12 my-2  d-none d-lg-block">
                                    <DFrom />
                                </div> */}
                            </div>
                        </section>

                        <section id="newsSection">
                            {state.map((news, i) => {
                                return (
                                    <div className="newsDetail" id={news.ContentID} data-title={news.ContentHeading} key={news.ContentID}>
                                        <Ldjson news={news} catName={catName} catSlug={catSlug} />
                                        <div className="row mt-2">
                                            <div className="col-lg-8 col-12">
                                                <div className="ContentDetails">
                                                    {news.ContentSubHeading && <h3 className='DHeadingSubHeading'>{news.ContentSubHeading}</h3>}
                                                    <h1>{news.DetailsHeading ? news.DetailsHeading : news.ContentHeading}</h1>
                                                    {news.ContentShoulder && <h4 className='DHeadingContentShoulder'>{news.ContentShoulder}</h4>}
                                                </div>
                                            </div>
                                            <div className="col-lg-8 col-12">
                                                {news.VideoID !== null && news.VideoID !== '' ?
                                                    <div className={allTags === null ? "col-sm-12 video-container" : "col-sm-12 video-container"}>
                                                        {news.VideoType === "youtube" ?
                                                            <iframe className="embed-responsive-item" title="youtube-video" src={"https://www.youtube.com/embed/" + news.VideoID + "?autoplay=0"} frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                                                            : news.VideoType === "vimeo" ?
                                                                <iframe src={"https://player.vimeo.com/video/" + news.VideoID} title="vimeo-video" frameBorder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
                                                                : news.VideoType === "facebook" ?
                                                                    <iframe src={"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F" + news.VideoID + "%2F&show_text=0&width=560"} title="facebook-video" width="560" height="315" style={{ border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                                                    : news.VideoType === "instagram" ?
                                                                        <iframe className="embed-responsive-item" title="instagram-video" src={"//instagram.com/p/" + news.VideoID + ">/embed"} width="100%" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                                                                        : false}
                                                    </div> :
                                                    <div className="DTopImg">
                                                        <div className="DImgZoomBlock Details">
                                                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + news.ImageBgPath} alt={news.ContentHeading} title={news.ContentHeading} /></picture>
                                                        </div>
                                                        {/* <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + news.ImageBgPath} alt={news.ContentHeading} title={news.ContentHeading} className="img-fluid img100" /> */}
                                                        <div className="DetailsTopCap">
                                                            <p className="DTopImgCaption">{news.ImageBgPathCaption}</p>
                                                            {/* <p className="DTopImgCaption">{dateArray[i][1] && banglaDateConvetar(dateArray[i][1])}</p> */}
                                                            <p className="DTopImgCaption">{dateArray[i] && banglaDateConvetar(format(new Date(dateArray[i]), 'dd MMMM yyyy'))}</p>
                                                        </div>
                                                    </div>
                                                }
                                                <div className="mt-2 d-contents d-sm-flex justify-content-between align-items-center d-print-none">
                                                    {(writer[i] || news.WriterName !== "") ?
                                                        <DWriters writer={writer[i]} writersName={news.WriterName} />
                                                        : false}
                                                    <div className='d-flex PRINTBTN'>
                                                        <button type="button" title='Print' onClick={PrintAble} aria-label='Print' className="printMe"><i className="fa-solid fa-print"></i></button>
                                                        <DSocialShare title={news.ContentHeading} contentID={news.ContentID} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-12 d-none d-lg-block">
                                                <DCatLatest catLatest={catLatest} catName={catName.CategoryName} catSlug={catSlug} />
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-lg-9 col-12">
                                                <div className={'ContentDetails page-break table-responsive ContentDetails' + news.ContentID} id="contentDetails">
                                                    {/* {news.ContentSubHeading && <h3 className='DHeadingSubHeading'>{news.ContentSubHeading}</h3>}
                                                    <h1>{news.DetailsHeading ? news.DetailsHeading : news.ContentHeading}</h1>
                                                    {news.ContentShoulder && <h4 className='DHeadingContentShoulder'>{news.ContentShoulder}</h4>} */}
                                                    {/* <DocumentTitle title={news.ContentHeading} /> */}
                                                    <p dangerouslySetInnerHTML={{ __html: news.ContentDetails }}></p>
                                                    {news.Initial && <p className='fw-bold'></p>}
                                                    {/* {relatedNews[i] ? 
                                                    <DRelatedNews relatedNews={relatedNews[i]} />
                                                : false } */}
                                                </div>
                                                <div className="DTagsNews d-print-none">
                                                    {tagArray && tagArray[i].map((nc) => {
                                                        return (
                                                            <Link to={"/tags/" + nc} key={nc} onClick={scrollTop}><p>{nc}</p></Link>
                                                        )
                                                    })}
                                                </div>
                                                <DfbComment contentID={news.ContentID} />
                                            </div>
                                            <div className="col-lg-3 col-12 d-print-none">
                                                <div className="DRightAds">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="d-flex  justify-content-center">
                                                                <Link to="/"><img src={"/media/Advertisement/Advertisement (300X250).png"} alt="Advertisement" title="Advertisement" className="img-fluid img100" /></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="DAdd1 d-flex  justify-content-center">
                                                                <Link to="/"><img src={"/media/Advertisement/Advertisement(300X90).png"} alt="Advertisement" title="Advertisement" className="img-fluid img100" /></Link>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="DAdd1 d-flex  justify-content-center">
                                                                <Link to="/"><img src={"/media/Advertisement/Advertisement (300X250).png"} alt="Advertisement" title="Advertisement" className="img-fluid img100" /></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 d-print-none">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <div className="astrodivider">
                                                        <div className="astrodividermask"></div>
                                                        <span><i className="fa fa-chevron-circle-down" aria-hidden="true"></i></span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </section>

                        <section>
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
                        </section>
                    </div>
                </main>
                : <ErrorPage />}
        </>
    )
}
