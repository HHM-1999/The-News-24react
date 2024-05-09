import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { scrollTop, ForLazyLoaderImg } from './AllFunctions'
import DocumentTitle from 'react-document-title'
// import LeadTopSlider from './LeadTopSlider'

var lazyloaded = false
export default function AboutUs() {
    const [state, setState] = useState([])
    const [state2, setState2] = useState([])
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}team-members`)
            .then(({ data }) => {
                if (data.length > 0) {
                    console.log(data + "hello")
                    setState(data[0]);
                    setState2(data.slice(1, 3));
                    setTimeout(function () {
                        lazyloaded = false
                        ForLazyLoaderImg(lazyloaded)
                    }, 1000);
                }
            });
    }, [])

    return (
        <>
            <div className="container">
            <DocumentTitle title="দ্য নিউজ ২৪ :: আমাদের সম্পর্কে" />
                <div className="SectionTitleEn"><h3><Link to="#"><span className="ColorBox"></span>About Us</Link></h3></div>
                <section className='about-us-sec'>
                    

                    <div className="about-us-area2">
                                <Link to='/' key={state.id} onClick={scrollTop}>
                                    <div className="about-img">
                                        <img  src={process.env.REACT_APP_DOMAIN_URL + state.image} alt={state.name} title={state.name} className="img-fluid  " />
                                    </div>
                                    <div className="about-us-desc">
                                        <h3 className="Title">{state.name}</h3>
                                        <p className='design'>{state.designation}</p>
                                    </div>

                                </Link>
            
                    </div>
                    <div className="row">
                        {state2.map((nc) => {
                            return (
                                <div className="col-lg-3 col-sm-12">
                                    <div className="about-us-area">
                                        <Link to='/' key={nc.id} onClick={scrollTop} >
                                            <div className="about-img">
                                                <img src={process.env.REACT_APP_DOMAIN_URL + nc.image} alt={nc.name} title={nc.name} className="img-fluid " />
                                            </div>
                                            <div className="about-us-desc">
                                                <h3 className="Title">{nc.name}</h3>
                                                <p className='design'>{nc.designation}</p>
                                            </div>

                                        </Link>

                                    </div>
                                </div>
                            )
                        })}


                        {/* <div className="col-lg-3 col-sm-12">
                            <div className="about-us-area">
                                <Link to='/' >
                                    <div className="about-img">
                                        <img src={"media/common/profile.png"} alt="" title="" className="img-fluid " />
                                    </div>
                                    <div className="about-us-desc">
                                        <h3 className="Title">Name</h3>
                                        <p className='design'>Designation</p>
                                    </div>

                                </Link>

                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-12">
                            <div className="about-us-area">
                                <Link to='/' >
                                    <div className="about-img">
                                        <img src={"media/common/profile.png"} alt="" title="" className="img-fluid " />
                                    </div>
                                    <div className="about-us-desc">
                                        <h3 className="Title">Name</h3>
                                        <p className='design'>Designation</p>
                                    </div>

                                </Link>

                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-12">
                            <div className="about-us-area">
                                <Link to='/' >
                                    <div className="about-img">
                                        <img src={"media/common/profile.png"} alt="" title="" className="img-fluid " />
                                    </div>
                                    <div className="about-us-desc">
                                        <h3 className="Title">Name</h3>
                                        <p className='design'>Designation</p>
                                    </div>

                                </Link>

                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-12">
                            <div className="about-us-area">
                                <Link to='/' >
                                    <div className="about-img">
                                        <img src={"media/common/profile.png"} alt="" title="" className="img-fluid " />
                                    </div>
                                    <div className="about-us-desc">
                                        <h3 className="Title">Name</h3>
                                        <p className='design'>Designation</p>
                                    </div>

                                </Link>

                            </div>
                        </div> */}
                    </div>


                </section>

            </div>

        </>

    )
}
