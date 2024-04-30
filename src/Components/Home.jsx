import React, { useEffect } from 'react'
import LeadNews from './HomeContent/LeadNews'
import Sports from './HomeContent/Sports'
import { Link } from 'react-router-dom'
import { scrollTop } from './AllFunctions'
import DocumentTitle from 'react-document-title'
import Ads from './HomeContent/Ads'
import VideoSec from './HomeContent/VideoSec'
import DCountry from './HomeContent/DCountry'
import DDivisionSearch from './HomeContent/DDivisionSearch'
import DNational from './HomeContent/DNational'
import DInternationalSec from './HomeContent/DInternationalSec'
import OnlinePoll from './HomeContent/OnlinePoll'
import OpinionSec from './HomeContent/OpinionSec'
import DPoliticsSec from './HomeContent/DPoliticsSec'
import DJob from './HomeContent/DJob'
import DBusiness from './HomeContent/DBusiness'
import DEntertainment from './HomeContent/DEntertainment'
import Lifestyle from './HomeContent/Lifestyle'
import Crime from './HomeContent/Crime'
import Technology from './HomeContent/Technology'
import DForeign from './HomeContent/DForeign'
import Religion from './HomeContent/Religion'
import Health from './HomeContent/Health'
import Law from './HomeContent/Law'
import DEducation from './HomeContent/DEducation'
// import Cultural from './HomeContent/Cultural'
import PhotoSection from './HomeContent/PhotoSection'
import PrayerTime from './HomeContent/PrayerTime'
// import Event from './HomeContent/Event'
import HomeLdJson from './HomeContent/HomeLdJson'
import FBpagePlugin from './FBpagePlugin'
// import Ramadan from './HomeContent/Ramadan'

export default function Home() {
    useEffect(() => {
        document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
        const timer = setTimeout(() => { window.location.reload(1); }, 300000);
        return () => clearTimeout(timer);
    }, [])
    return (
        <>
            <main>
                {/* <Event /> */}
                <div className="container">
                    <DocumentTitle title='TheNews24 || দ্য নিউজ ২৪' />
                    <HomeLdJson />
                    <section>
                        <LeadNews />
                    </section>

                    <section>
                        <Ads />
                    </section>

                    <section>
                        <div className="VideoSection">
                            <div className="container">
                                <VideoSec />
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9 col-12">
                                    <DCountry />
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12">
                                    <DDivisionSearch />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9 col-12">
                                    <DNational />
                                </div>
                                <div className="col-lg-3 col-sm-12">
                                    {/* <div className="DRightSideAdd mt-4">
                                        <RightSideAds />
                                    </div> */}
                                    <PrayerTime />

                                    <div className="fb-page-banner">
                                        <FBpagePlugin />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9 col-12">
                                    <DInternationalSec />
                                </div>
                                <div className="col-lg-3 col-sm-12">
                                    <OnlinePoll />
                                    <div className="DRightSideAdd">
                                        <Link to="">
                                            <img src={"media/Advertisement/Advertisement(300X90).png"} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="DBGWhite">
                            <div className="container">
                                <OpinionSec />
                            </div>
                        </div>
                    </section>
                    <div className="container">
                        <section className="International + Economics + Politics">
                            <div className="row">
                                <div className="col-lg-4 col-12">
                                    <DPoliticsSec />

                                </div>
                                <div className="col-lg-4 col-12">
                                    <DJob />

                                </div>
                                <div className="col-lg-4 col-12">
                                    <DBusiness />

                                </div>
                            </div>
                        </section>
                    </div>
                    <section className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="DAdd2 d-flex  justify-content-center">
                                    <Link to="">
                                        <img src={"media/Advertisement/570203398507806717.png"} alt="Header Advertisement" title="Header Advertisement" className="img-fluid img100" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="Entertainment">
                        <DEntertainment />
                    </section>

                    <div className="container">
                        <section className="Sports">
                            <Sports />
                        </section>
                    </div>

                    <section className="Lifestyle">
                        <Lifestyle />
                    </section>
                    <section className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="DAdd2 d-flex  justify-content-center">
                                    <Link to="">
                                        <img src={"media/Advertisement/570203398507806717.png"} alt="Header Advertisement" title="Header Advertisement" className="img-fluid img100" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="container">
                        <section className=" + Economics + Politics">
                            <div className="row">
                                <div className="col-lg-3 col-12">
                                    <Crime />
                                </div>
                                <div className="col-lg-3 col-12">
                                    <Technology />
                                </div>
                                <div className="col-lg-3 col-12">
                                    <DForeign />
                                </div>
                                <div className="col-lg-3 col-12">
                                    <Religion />
                                </div>
                                <div className="col-lg-3 col-12">
                                    <Health />
                                </div>
                                <div className="col-lg-3 col-12">
                                    <Law />
                                </div>
                                <div className="col-lg-3 col-12">
                                    <DEducation />
                                </div>
                                <div className="col-lg-3 col-12">
                                    {/* <Cultural /> */}
                                    <div className="DAdd2 d-flex  justify-content-center">
                                        <Link to="">
                                            <img src={"media/Advertisement/18058797247224877917.png"} alt="Header Advertisement" title="Header Advertisement" className="img-fluid img100" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <section className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="DAdd2 d-flex  justify-content-center">
                                    <Link to="">
                                        <img src={"media/Advertisement/570203398507806717.png"} alt="Header Advertisement" title="Header Advertisement" className="img-fluid img100" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="PhotoGallery">
                        <div className="SectionTitle"><h3><Link onClick={scrollTop} to="/photo-feature"><span className="ColorBox"></span>ছবি</Link></h3></div>
                        <div className="DPhotoGallery">
                            <div className="row">
                                <div className="col-lg-9 col-12">
                                    <PhotoSection />
                                </div>
                                <div className="col-lg-3 col-12">
                                    <div className="DRightSideAdd PT15">
                                        <Link to="">
                                            <img src={"media/Advertisement/13982910857184178936.gif"} />
                                        </Link>
                                    </div>
                                    <div className="DRightSideAdd">
                                        <Link to="">
                                            <img src={"media/Advertisement/18058797247224877917.png"} />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                </div>


            </main>
        </>
    )
}
