import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import ErrorPage from '../ErrorPage';
import { banglaDateConvetar, ForLazyLoaderImg, scrollTop } from '../AllFunctions';
import DSocialShare from '../DetailsPage/DSocialShare';
import FBpagePlugin from '../FBpagePlugin';
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import { format } from 'date-fns'
import DocumentTitle from 'react-document-title';
import LeadLatestNews from '../HomeContent/LeadLatestNews';
import RLoader from '../RLoader';

var lazyloaded = false;
export default function DetailsPhotoFeature() {
  let { photoID } = useParams();
  const [contentID, setContentID] = useState([])
  const [catLatest, setcatLatest] = useState([])
  const [isLoading, setisLoading] = useState(true)
  useEffect(() => {
    // document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
    document.querySelectorAll('link[rel="canonical"]')[0].setAttribute('href', window.location.href)
    setTimeout(() => { window.location.reload(1); }, 300000);
    setisLoading(true)
    setTimeout(() => { setisLoading(false) }, 300);
    axios
      .get(`${process.env.REACT_APP_API_URL}photo-feature-hit-count/${photoID}`)
      .then(({ data }) => {
      })
    axios
      .get(`${process.env.REACT_APP_API_URL}photo-feature-details/${photoID}`)
      .then(({ data }) => {
        if (data.data.length > 0) {
          setisLoading(false)
          setContentID(data.data[0]);
          console.log(data.data[0])
          setTimeout(function () {
            lazyloaded = false
            ForLazyLoaderImg(lazyloaded)
          }, 400);
          return () => {
            setContentID()
          }
        } else setContentID(null);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}popular-photo-feature/${photoID}`)
      .then(({ data }) => {
        if (data.data) {
          setcatLatest(data.data);
        }
      });
    const timer = setTimeout(() => { window.location.reload(1); }, 300000);
    return () => clearTimeout(timer);
  }, [photoID])
  const PrintAble = () => { window.print(); };

  return (
    <>
      {contentID ?
        <main>
          {isLoading === false ? 
          <div className="container">
            {/* <div className="LOGOIMG">
              <img src={process.env.REACT_APP_FONT_DOMAIN_URL + "media/common/logo.png"} width={187} height={68} title="TheNews24 :: দ্য নিউজ ২৪"
                alt="TheNews24 :: দ্য নিউজ ২৪" className="img-fluid img100" />
            </div> */}
            <DocumentTitle title={contentID.PhotoFeatureTitle} />
            <section>
              <div className="row mt-5 Photo_feature">
                <div className="col-lg-2 col-12 d-print-none">
                  <div className="WritterName my-2">
                    <p><i className="fa-solid fa-pen"></i> {contentID.Writer}<span className='DInitial'>, দ্য নিউজ ২৪</span></p>
                  </div>
                  <div className="DPublishTime">
                    <p><i className="fas fa-clock"></i>  প্রকাশিত: {contentID.create_date ? banglaDateConvetar(format(new Date(contentID.create_date), 'dd MMMM yyyy')) : ""}</p>
                    <p><i className="fas fa-clock"></i>  আপডেট: {contentID.updated_date ? banglaDateConvetar(format(new Date(contentID.updated_date), 'dd MMMM yyyy')) : ""}</p>
                  </div>
                  <div className='shareBtn mb-5'>
                    <DSocialShare title={contentID.PhotoFeatureTitle} contentID={contentID.PhotoFeatureID} />
                    <button type="button" title='Print' onClick={PrintAble} aria-label='Print' className="printMe"><i className="fa-solid fa-print"></i></button>
                  </div>
                </div>
                <div className="col-lg-7 col-12">
                  <div className="HeadingArea">
                    <Link to="/photo-feature"><h4 className="DCatNameInner">ছবিঘর</h4></Link>
                    <h1 className="DHeadingInner">{contentID.PhotoFeatureTitle}</h1>
                  </div>
                  <LightgalleryProvider>
                    <div className="DFeatureImg page-break">
                      <div className="DImgZoomBlock DetailsPF" style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer' }}>
                        {contentID.ImageBgPath ?
                          <LightgalleryItem src={process.env.REACT_APP_IMG_Path + contentID.ImageBgPath} downloadUrl={process.env.REACT_APP_IMG_Path + contentID.ImageBgPath} thumb={process.env.REACT_APP_IMG_Path + contentID.ImageBgPath}>
                            <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + contentID.ImageBgPath} alt={contentID.PhotoFeatureTitle} title={contentID.PhotoFeatureTitle} />
                            <span className='DFeatureIcon'><i className="fa-solid fa-expand"></i></span>
                          </LightgalleryItem> : ""}
                      </div>
                      <div className="DetailsTopBrief">
                        <p className="DTopImgCaption">{contentID.Caption} {contentID.ImageSource ? <span className='DImgSource'><i className="fa-sharp fa-solid fa-grip-lines-vertical"></i> ছবি: {contentID.ImageSource}</span> : ""}</p>
                      </div>
                    </div>
                    {contentID.featuer_images ? <>
                      {contentID.featuer_images.length > 0 ?
                        <>
                          {contentID.featuer_images.map((nc) => {
                            return (
                              <div className="DFeatureImg page-break" key={nc.ImageID}>
                                <div className="DImgZoomBlock DetailsPF" style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer' }}>
                                  <LightgalleryItem src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} downloadUrl={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} thumb={process.env.REACT_APP_IMG_Path + nc.ImageBgPath}>
                                    <img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.PhotoFeatureTitle} title={nc.PhotoFeatureTitle} />
                                    <span className='DFeatureIcon'><i className="fa-solid fa-expand"></i></span>
                                  </LightgalleryItem>
                                </div>
                                <div className="DetailsTopBrief">
                                  <p className="DTopImgCaption">{nc.Caption} {nc.ImageSource ? <span className='DImgSource'><i className="fa-sharp fa-solid fa-grip-lines-vertical"></i> ছবি: {nc.ImageSource}</span> : ""}</p>
                                </div>
                              </div>
                            )
                          })}
                        </>
                        : false}
                    </> : ""}
                  </LightgalleryProvider>
                  <DSocialShare title={contentID.PhotoFeatureTitle} contentID={contentID.PhotoFeatureID} />
                </div>
                <div className="col-lg-3 col-12 d-print-none">
                  {/* <LatestPopularNews /> */}
                  <LeadLatestNews />
                  <FBpagePlugin />
                  <section className="MostPopularTab mt-4">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item"><a className="nav-link active" data-bs-toggle="tab" role="tab"
                            aria-selected="true" href="/national#tabs-1">এই বিভাগের সর্বাধিক
                            পঠিত</a></li>
                        </ul>
                      </div>
                      <div className="panel-body PanelHeight">
                        <div className="tab-content">
                          <div className="tab-pane active" id="tabs-1" role="tabpanel">
                            <div className="DLatestNews">
                              {catLatest.map((nc) => {
                                return (
                                  <div className="MostPopularTabList" key={nc.PhotoFeatureID}>
                                    <Link to={"/photo-feature/news/" + nc.PhotoFeatureID} onClick={scrollTop}>
                                      <div className="row">
                                        <div className="col-lg-5 col-sm-4 col-5">
                                          <div className="DImgZoomBlock">
                                            <picture><img src={process.env.REACT_APP_LAZYL_IMG} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.PhotoFeatureTitle} title={nc.PhotoFeatureTitle} /></picture>
                                            <div className="card-video-icon"><i className="fa-solid fa-camera"></i></div>
                                          </div>
                                        </div>
                                        <div className="col-lg-7 col-sm-8 col-7">
                                          <div className="Desc">
                                            <h5 className="Title">{nc.PhotoFeatureTitle}</h5>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </section>
          </div> :
          <RLoader />}
        </main >
        : <ErrorPage />}
    </>
  )
}
