import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Marquee from "react-fast-marquee";
import { scrollTop } from './AllFunctions';
import { Link } from 'react-router-dom';

const { toBengaliNumber } = require('bengali-number');

const years = new Date().getFullYear()
export default function Footer() {
    const [scroll, setScroll] = useState([])
    const [breaking, setBreaking] = useState([])
    const [ticker, setTicker] = useState(false)
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}active-breaking`)
            .then(({ data }) => {
                setBreaking(data.breaking);
                if (data.breaking.length <= 0) {
                    axios
                        .get(`${process.env.REACT_APP_API_URL}json/file/generateActiveScroll.json`)
                        .then(({ data }) => {
                            setScroll(data.data);
                            if (data.data.length > 0) {
                                setTicker(true)
                            }
                        });
                }
                else {
                    setTicker(true)
                }
            });
    }, [])
    return (
        <>
          
            <footer>
                <div className="DFooterBg">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2 d-flex justify-content-start border-right-inner">
                                <div className="DFooterLogo">
                                    <a href="/">
                                        <img src={process.env.REACT_APP_DOMAIN_URL+"media/common/logo.png"} alt="TheNews24 || দ্য নিউজ ২৪" title="TheNews24 || দ্য নিউজ ২৪" className="img-fluid img100" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-6 d-flex align-items-center justify-content-center  ">
                                
                                <p className='aboutTitle'><Link to='/aboutUs'><span className='footerIcon'><i className="fa-solid fa-scale-balanced"></i></span>নিয়মনীতি ও শর্তাবলী</Link></p>
                                <p className='aboutTitle'><Link to='/aboutUs'><span className='footerIcon'><i className="fa-solid fa-user-secret"></i></span>গোপনীয়তা</Link></p>
                                <p className='aboutTitle'><Link to='/aboutUs'><span className='footerIcon'><i className="fa-solid fa-user"></i></span>আমাদের সম্পর্কে</Link></p>
                                <p className='aboutTitle'><Link to='/aboutUs'><span className='footerIcon'><i className="fa-solid fa-film"></i></span>বিজ্ঞাপন</Link></p>
                            </div>
                            <div className="col-md-4 d-flex align-items-center justify-content-center">
                                <div className="MoreInfo">
                                    {/* <h5>সম্পাদক ও প্রকাশক: মো. আনোয়ারুল ইসলাম</h5> */}
                                    <p> কর্পোরেট অফিস: বাড়ি : ২১ (৮ তলা), ব্লক : এ, রোড : ০১, মহানগর প্রজেক্ট, হাতিরঝিল, ঢাকা-১২১৯ ৷</p>
                                    <div className="contact ">
                                    <p>ফোন: <a href="tel:+৮৮০ ৯৬১১১৭১৯৮০">+৮৮০ ৯৬১১১৭১৯৮০</a> , <a href="tel:+৮৮০১৩৩২৫০২৬০০">+৮৮০১৩৩২৫০২৬০০</a> ,<a href="tel:+৮৮০১৩৩২৫০২৩০০">+৮৮০১৩৩২৫০২৩০০</a></p>
                                    {/* <p>ফ্যাক্স: +8802 550 19709</p> */}
                                    <p>ই-মেইল: <a href="mailto:hello@thenews24.com" target="_blank" rel="noreferrer">hello@thenews24.com</a> , <a href="mailto:info@thenews24.com" target="_blank" rel="noreferrer">info@thenews24.com</a></p>
                                    
                                </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="DFooterBottomBg">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 text-center">
                                <p><span className="En">&copy;</span> | <a href="/">দ্য নিউজ ২৪ </a> কর্তৃক সর্বসত্ব ® সংরক্ষিত | উন্নয়নে <a href="https://www.emythmakers.com" target="_blank">ইমিথমেকারস.কম</a></p>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <div className={ticker ? "DFooterBottomBg d-print-none" : "DFooterBottomBg mb-0 d-print-none"}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 text-center">
                                <p style={{ fontFamily: 'Noto Serif Bengali' }}> &copy; {years} | <a href="/">দ্য নিউজ ২৪</a>  কর্তৃক সর্বসত্ব ® সংরক্ষিত | উন্নয়নে <a href="https://www.emythmakers.com"
                                    target="_blank" rel="noreferrer">ইমিথমেকারস.কম</a></p>
                            </div>
                        </div>
                    </div>
                </div> */}
                  <div className={ticker ? "DFooterBottomBg d-print-none" : "DFooterBottomBg mb-0  d-print-none"}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 text-center">
                                <p style={{ fontFamily:" SolaimanLipi" }}> &copy; {toBengaliNumber(years)} | <a href="/">দ্য নিউজ ২৪</a>  কর্তৃক সর্বসত্ব ® সংরক্ষিত | উন্নয়নে <a href="https://www.emythmakers.com"
                                    target="_blank" rel="noreferrer"><span>ইমিথমেকারস.কম</span></a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <section>
                <div className="container-fluid d-print-none">
                    {breaking.length > 0 ?
                        <div className="DScroll">
                            <div className="DScrollSection">
                                <div className="ScrollHeading d-flex justify-content-center">
                                    <p>ব্রেকিং:</p>
                                </div>
                                <div className="ScrollSubject">
                                    <Marquee delay='0' speed='70' direction="left" pauseOnHover='true' play='true' style={{gradientColor: "none"}}>
                                        {breaking.map((nd) => {
                                            return (
                                                <React.Fragment key={nd.BreakingID}>
                                                    <a href={nd.ScrollUrl === null ? '/' : nd.ScrollUrl} onClick={scrollTop}><span><div className="SquareIcon"></div> {nd.BreakingHead}</span></a>
                                                </React.Fragment>
                                            )
                                        })}
                                    </Marquee>
                                </div>

                            </div>
                        </div>
                        :
                        <>
                            {scroll.length > 0 ?
                                <div className="DScroll">
                                    <div className="DScrollSection">
                                        <div className="ScrollHeading d-flex justify-content-center">
                                            <p>শিরোনাম:</p>
                                        </div>
                                        <div className="ScrollSubject">
                                            <Marquee delay='0' speed='70' direction="left" pauseOnHover='true' play='true'>
                                                {scroll.map((nd) => {
                                                    return (
                                                        <React.Fragment key={nd.ScrollID}>
                                                            <a href={nd.ScrollUrl === null ? '/' : nd.ScrollUrl} onClick={scrollTop}><span><div className="SquareIcon"></div> {nd.ScrollHead}</span></a>
                                                        </React.Fragment>
                                                    )
                                                })}
                                            </Marquee>
                                        </div>
                                    </div>
                                </div>
                                : false}
                        </>}
                        <>
                                {/* <div className="DScroll">
                                    <div className="DScrollSection">
                                        <div className="ScrollHeading d-flex justify-content-center">
                                            <p>শীর্ষ সংবাদ :</p>
                                        </div>
                                        <div className="ScrollSubject">
                                            <Marquee delay='0' speed='70' direction="left" pauseOnHover='true' play='true'>
                                                {scroll.map((nd) => {
                                                    return (
                                                        <React.Fragment key={nd.ScrollID}>
                                                            <a href={nd.ScrollUrl === null ? '/' : nd.ScrollUrl} onClick={scrollTop}><span><div className="SquareIcon"></div> {nd.ScrollHead}</span></a>
                                                        </React.Fragment>
                                                    )
                                                })}
                                            </Marquee>
                                        </div>
                                    </div>
                                </div> */}
                        
                        </>
                </div>
            </section>
            {/* <section>
                <div className="container-fluid">
                    <div className="DScroll">
                        <div className="DScrollSection">
                            <div className="ScrollHeading d-flex justify-content-center">
                                <p>শীর্ষ সংবাদ:</p>
                            </div>
                            <div className="ScrollSubject">
                                <marquee onmouseover="this.stop();" onmouseout="this.start();">
                                    <a href=""><span><div className="SquareIcon"></div> বিশ্বজুড়ে করোনায় মৃত্যু ৪৯ লাখ ছাড়ালো</span></a>
                                    <a href=""><span><div className="SquareIcon"></div> পীরগঞ্জে হিন্দু পল্লীতে আগুনের ঘটনায় ৪১ জন গ্রেপ্তার</span></a>
                                    <a href=""><span><div className="SquareIcon"></div> অসাম্প্রদায়িক চেতনায় বাংলাদেশ গড়তে চাই ॥ প্রধানমন্ত্রী</span></a>
                                    <a href=""><span><div className="SquareIcon"></div> বাংলাদেশকে ১৪১ রানের লক্ষ্য ছুড়ে দিলো স্কটল্যান্ড</span></a>
                                    <a href=""><span><div className="SquareIcon"></div> মুহিবুল্লাহ হত্যাকান্ডে জড়িত সন্দেহে আরসা ক্যাডার গ্রেফতার</span></a>
                                    <a href=""><span><div className="SquareIcon"></div> সামাজিক মাধ্যমে গুজব রটনাকারীদের বিরুদ্ধে ব্যবস্থা নিচ্ছে পুলিশ</span></a>
                                    <a href=""><span><div className="SquareIcon"></div> ভারতের দুই রাজ্যে ভারী বৃষ্টির প্রভাবে ৮৫ জনের প্রাণহানি</span></a>
                                </marquee>
                            </div>

                        </div>
                    </div>
                </div>

            </section> */}
        </>
    )
}
