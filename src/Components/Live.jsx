import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop } from './AllFunctions'
import DocumentTitle from 'react-document-title'
// import LatestPopularNews from './Category/LatestPopularNews'
import LeadLatestNews from './HomeContent/LeadLatestNews'
import RLoader from './RLoader'
export default function Live() {
    const [state, setState] = useState([])
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        setTimeout(() => { window.location.reload(1); }, 300000);
        setisLoading(true)
        setTimeout(() => { setisLoading(false) }, 300);
        axios
            .get(`${process.env.REACT_APP_API_URL}live-video`)
            .then(({ data }) => {
                setState(data.livevideo[0]);
            })
        // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        // const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        // return () => clearTimeout(timer);
    }, [])
    return (
        <>
            {isLoading === false ?
                <main>
                    <h2 className="DTitle">
                        <Link to={+ '/'} onClick={scrollTop}>
                            <span className="DTitleInner"><span className="DTitleInnerBar"><span>লাইভ</span></span></span>
                        </Link>
                        <DocumentTitle title='লাইভ' />
                    </h2>
                    <div className="container">
                        <div className="DVideoDetailsArea my-5">
                            <div className="row">
                                <div className="col-lg-8 col-12 border-right-inner">
                                    <h1 className="Title BGTitle fw-bold mb-2" style={{ fontSize: '26px', lineHeight: '38px' }}>
                                        {state.WebTVHeading}
                                    </h1>
                                    <div className="DVideoDetailsFrame">
                                        <div className="col-sm-12 video-container">
                                            <iframe className="embed-responsive-item" title="youtube-video" src={"https://www.youtube.com/embed/" + state.WebTVLinkCode + "?autoplay=1&mute=1"} frameBorder="0" webkitallowfullscreen='true' mozallowfullscreen='true' allowFullScreen></iframe>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 col-12 live">
                                    {/* <LatestPopularNews /> */}
                                    <LeadLatestNews />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                :
                <RLoader />
            }
        </>
    )
}
