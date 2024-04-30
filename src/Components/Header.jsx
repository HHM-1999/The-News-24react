import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { scrollTop, banglaDateConvetar } from './AllFunctions'
import { getDate, getMonth, getYear } from 'bangla-calendar';
import moment from 'moment-hijri';
const date1 = new Date();
let bnDate = getDate(date1, { format: 'D' })
let bnMonth = getMonth(date1, { format: 'MMMM' })
let bnYear = getYear(date1, { format: 'YYYY' })
let BNDATEs = bnDate + ' ' + bnMonth + ' ' + bnYear
const currentDate = moment().format('DD MMMM YYYY')
const currentDay = moment().format('dddd')
var arabicDate = moment().subtract(1, 'days').format('iDD iMMMM iYYYY');

var todaysDate = new Date();
todaysDate.setDate(todaysDate.getDate() - 1);


var navbar
var sticky = 0
var navbarMobile
var sticky2 = 0
export default function Header() {
    const useToggle = (initialState) => {
        const [toggleValue, setToggleValue] = useState(initialState);

        const toggler = () => { setToggleValue(!toggleValue) };
        return [toggleValue, toggler]
    };
    const [toggle, setToggle] = useToggle();

    let navigate = useNavigate();
    const [showSubCat, setShowSubCat] = useState(false);
    const [showSubCat1, setShowSubCat1] = useState(false);
    const [showSubCat2, setShowSubCat2] = useState(false);
    const [showSubCat3, setShowSubCat3] = useState(false);
    const [showSubCat4, setShowSubCat4] = useState(false);
    const [showSubCat5, setShowSubCat5] = useState(false);
    const [showSubCat6, setShowSubCat6] = useState(false);
    const [showSubCat7, setShowSubCat7] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', myFixedNav);
        navbar = document.getElementById("myHeader");
        sticky = navbar.offsetTop;
        navbarMobile = document.getElementById("myHeader2");
        sticky2 = navbarMobile.offsetTop;

    }, [])

    function myFixedNav() {
        navbar = document.getElementById("myHeader");
        navbarMobile = document.getElementById("myHeader2");
        if (navbar) {
            if (window.pageYOffset > sticky) {
                navbar = document.getElementById("myHeader");
                navbar.classList.add("sticky");
            } else {
                navbar = document.getElementById("myHeader");
                navbar.classList.remove("sticky");
            }
        }
        if (navbarMobile) {
            if (window.pageYOffset > sticky2) {
                navbarMobile = document.getElementById("myHeader2");
                navbarMobile.classList.add("sticky2");
            } else {
                navbarMobile = document.getElementById("myHeader2");
                navbarMobile.classList.remove("sticky2");
            }
        }
    }

    function mobileHeader() {
        var x = document.getElementById("mobile-nav");
        var element2 = document.getElementById("closeBTN1");
        var element = document.getElementById("menuBTN1");
        if (x.style.display === "block") {
            x.style.display = "none";
            element2.classList.add('hide')
            element2.classList.remove('show')
            element.classList.add('show')
            element.classList.remove('hide')
        } else {
            x.style.display = "block";
            element2.classList.add('show')
            element2.classList.remove('hide')
            element.classList.add('hide')
            element.classList.remove('show')
        }
    }

    function mobileHeaderSearch(e) {
        e.preventDefault();
        var search = document.getElementById("deskSearch");
        var element2 = document.getElementById("closeBTN");
        var element = document.getElementById("menuBTN");
        if (search.style.display === "block") {
            search.style.display = "none";
            if (search.style.display === "none") {
                element2.classList.add('hide')
                element2.classList.remove('show')
                element.classList.add('show')
                element.classList.remove('hide')
            }
        } else {
            search.style.display = "block";
            if (search.style.display === "block") {
                element2.classList.add('show')
                element2.classList.remove('hide')
                element.classList.add('hide')
                element.classList.remove('show')
            }
        }
        var x = document.getElementById("mobileSearch");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        const txt = e.target.q.value;
        navigate('/search/' + txt)
    }


    return (
        <>


            <header>
                <div className="HeaderTopBar stickyHide">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-sm-12">
                                <div className="DateTime h-100 d-flex align-items-center ">
                                    <p className="date">
                                        {/* <i className="fa fa-calendar" aria-hidden="true"></i> <span>রোববার ২১ এপ্রিল ২০২৪, বৈশাখ ৮ ১৪৩১ </span> */}
                                        <i className="fas fa-calendar"></i>&nbsp;{banglaDateConvetar(currentDay)}, {banglaDateConvetar(currentDate)}, {BNDATEs}, {banglaDateConvetar(arabicDate)}
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-4 col-sm-12 d-flex justify-content-end">
                                <div className="SocialIcon">
                                    <ul>
                                        <li className="fb-icon"><a href="" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                                        <li className="yt-icon"><a href="" target="_blank"><i className="fab fa-youtube"></i></a></li>
                                        <li className="tw-icon"><a href="" target="_blank"><i className="fab fa-twitter"></i></a></li>
                                        <li className="li-icon"><a href="" target="_blank"><i className="fab fa-linkedin"></i></a></li>
                                        {/* <!-- <li className="LiveTV">

                                <a href="">লাইভ <img src="<?php echo $sSiteURL; ?>media/common/live.gif" className="img-fluid img100"></a>

                            </li> --> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="DLogoArea">
                        <div className="row">
                            <div className="col-12 col-md-3">
                                <div className="DLogo d-flex justify-content-start">
                                    <a href="/">
                                        <img src={"media/common/logo.png"} alt="TheNews24 || দ্য নিউজ ২৪" title="TheNews24 || দ্য নিউজ ২৪" className="img-fluid img100" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 col-md-9">
                                <div className="DHeaderAdd d-flex justify-content-end">
                                    <a href="/">
                                        <img src={"media/Advertisement/56.png"} className="img-fluid img100 border" />
                                    </a>
                                </div>

                                {/* <!-- <div className="HeaderTopSocial h-100 d-flex align-items-center justify-content-end">

                        <div className="DSocialLink">

                            <ul>

                                <li><a href="" target="_blank" className="BanglaButton">বাংলা</a></li>

                                <li><a href="" target="_blank"><i className="fab fa-facebook-f"></i></a></li>

                                <li><a href="" target="_blank"><i className="fab fa-twitter"></i></a></li>

                                <li><a href="" target="_blank"><i className="fab fa-linkedin-in"></i></a></li>

                                <li><a href="" target="_blank"><i className="fab fa-youtube"></i></a></li>

                                <li><a href="<?php echo $sSiteURL; ?>rss/rss.xml" target="_blank"><i className="fa fa-rss" aria-hidden="true"></i></a></li>

                            </ul>

                        </div>

                    </div> --> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div id="myHeader" className="header d-print-none">
                    <div className="DHeaderNav Mobilehide">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                        <a href="" className="StickyLogo" rel="home">
                                            <img src={process.env.REACT_APP_FONT_DOMAIN_URL + "media/common/logo.png"} alt="TheNews24 || দ্য নিউজ ২৪" title="TheNews24 || দ্য নিউজ ২৪" className="img-fluid img100" />
                                        </a>
                                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"></span>
                                        </button>
                                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                            <ul className="navbar-nav">
                                                <li className="nav-item"><Link className="nav-link" to="/national" onClick={scrollTop}>জাতীয়</Link></li>
                                                <li className="nav-item dropdown">
                                                    <Link className="nav-link dropdown-toggle" to="/international" id="navbarDropdown" onClick={scrollTop} role="button" data-bs-toggle="dropdown disable" aria-expanded="false">আন্তর্জাতিক </Link>
                                                    <ul className="dropdown-menu DiplayInline" aria-labelledby="navbarDropdown">
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/asia">এশিয়া</Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/south-asia">দক্ষিণ এশিয়া</Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/middle-east">মধ্যপ্রাচ্য </Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/europe">ইউরোপ </Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/usa">যুক্তরাষ্ট্র </Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/russia">রাশিয়া </Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/feature-international">ফিচার </Link></li>
                                                        {/* <li><Link className="dropdown-item" onClick={scrollTop} to="/district-news">আমেরিকা </Link></li> */}
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/international-extra">অন্যান্য </Link></li>
                                                    </ul>
                                                </li>
                                                <li className="nav-item"><Link className="nav-link" onClick={scrollTop} to="/country">সারাদেশ</Link></li>
                                                <li className="nav-item"><Link className="nav-link" onClick={scrollTop} to="/politics">রাজনীতি</Link></li>
                                                <li className="nav-item"><Link className="nav-link" onClick={scrollTop} to="/crime">অপরাধ </Link></li>
                                                <li className="nav-item dropdown">
                                                    <Link className="nav-link dropdown-toggle" to="/sports" onClick={scrollTop} id="navbarDropdown" role="button" data-bs-toggle="dropdown disable" aria-expanded="false">ক্রীড়াঙ্গন </Link>
                                                    <ul className="dropdown-menu DiplayInline" aria-labelledby="navbarDropdown">
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/football">ফুটবল </Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/cricket">ক্রিকেট </Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/sports-others">অন্যান্য </Link></li>
                                                    </ul>
                                                </li>
                                                <li className="nav-item dropdown">
                                                    <Link className="nav-link dropdown-toggle" onClick={scrollTop} to="/entertainment" id="navbarDropdown" role="button" data-bs-toggle="dropdown disable" aria-expanded="false">বিনোদন </Link>
                                                    <ul className="dropdown-menu DiplayInline" aria-labelledby="navbarDropdown">
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/hollywood">হলিউড </Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/bollywood">বলিউড </Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/dhallywood">ঢালিউড </Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/others-entertainment">অন্যান্য </Link></li>
                                                    </ul>
                                                </li>
                                                <li className="nav-item dropdown">
                                                    <Link className="nav-link dropdown-toggle" to="/trade" id="navbarDropdown" role="button" data-bs-toggle="dropdown disable" aria-expanded="false">বাণিজ্য </Link>
                                                    <ul className="dropdown-menu DiplayInline" aria-labelledby="navbarDropdown">
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/money">অর্থ </Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/the-industry">শিল্প </Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/agriculture">কৃষি </Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/stock-market">শেয়ার বাজার </Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/bank-insurance">ব্যাংক-বীমা </Link></li>
                                                    </ul>
                                                </li>
                                                <li className="nav-item"><Link className="nav-link" onClick={scrollTop} to="/court-law">আইন ও বিচার </Link></li>
                                                <li className="nav-item dropdown">
                                                    <Link className="nav-link dropdown-toggle" onClick={scrollTop} to="/jobs" id="navbarDropdown" role="button" data-bs-toggle="dropdown disable" aria-expanded="false">চাকরি </Link>
                                                    <ul className="dropdown-menu DiplayInline" aria-labelledby="navbarDropdown">
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/gov-jobs">সরকারি </Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/private-jobs">বেসরকারি </Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/ngo-jobs">এনজিও</Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/job-others">অন্যান্য</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="nav-item dropdown">
                                                    <Link className="nav-link dropdown-toggle" onClick={scrollTop} to="/religion" id="navbarDropdown" role="button" data-bs-toggle="dropdown disable" aria-expanded="false">ধর্ম ও জীবন </Link>
                                                    <ul className="dropdown-menu DiplayInline" aria-labelledby="navbarDropdown">
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/islam">ইসলাম</Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/hinduism">সনাতন </Link></li>
                                                        <li><Link className="dropdown-item" onClick={scrollTop} to="/religion-others">অন্যান্য</Link></li>
                                                    </ul>
                                                </li>
                                                <li className="nav-item"><Link className="nav-link" onClick={scrollTop} to="/opinion">মতামত </Link></li>
                                                <li className="nav-item dropdown has-megamenu">
                                                    <Link className="nav-link dropdown-toggle" onClick={scrollTop} to="#">অন্যান্য</Link>
                                                    <div className="dropdown-menu megamenu" role="menu">
                                                        <div className="row w-100 ">
                                                            <div className="col-md-3" style={{ flex: "0 0 20%", maxWidth: "20%" }}>
                                                                <ul className="nav flex-column">
                                                                    <li><Link className="dropdown-item" onClick={scrollTop} to="/migration">প্রবাস</Link></li>
                                                                    <li><Link className="dropdown-item" onClick={scrollTop} to="/education">শিক্ষা</Link></li>
                                                                    <li><Link className="dropdown-item" onClick={scrollTop} to="/todays-sports">আজকের খেলা</Link></li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-md-3" style={{ flex: "0 0 20%", maxWidth: "20%" }}>
                                                                <ul className="nav flex-column">
                                                                    <li><Link className="dropdown-item" onClick={scrollTop} to="/health">স্বাস্থ্য</Link></li>
                                                                    <li><Link className="dropdown-item" onClick={scrollTop} to="/information-technology">তথ্য প্রযুক্তি</Link></li>
                                                                    <li><Link className="dropdown-item" onClick={scrollTop} to="/horoscope">রাশিফল</Link></li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-md-3" style={{ flex: "0 0 20%", maxWidth: "20%" }}>
                                                                <ul className="nav flex-column">
                                                                    <li><Link className="dropdown-item" onClick={scrollTop} to="/the-news-special">দ্য নিউজ স্পেশাল</Link></li>
                                                                    <li><Link className="dropdown-item" onClick={scrollTop} to="/reader-s-news">পাঠকের সংবাদ</Link></li>
                                                                </ul>
                                                            </div>

                                                            <div className="col-md-3" style={{ flex: "0 0 20%", maxWidth: "20%" }}>
                                                                <ul className="nav flex-column">
                                                                    <li><Link className="dropdown-item" onClick={scrollTop} to="/motivation">অনুপ্রেরণা</Link></li>
                                                                    <li><Link className="dropdown-item" onClick={scrollTop} to="/photo-feature">ছবি</Link></li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-md-3" style={{ flex: "0 0 20%", maxWidth: "20%" }}>
                                                                <ul className="nav flex-column">
                                                                    <li><Link className="dropdown-item" onClick={scrollTop} to="/video">ভিডিও</Link></li>
                                                                    <li><Link className="dropdown-item" onClick={scrollTop} to="/archives">আর্কাইভ</Link></li>
                                                                </ul>
                                                            </div>


                                                        </div>
                                                    </div>

                                                </li>
                                            </ul>
                                        </div>
                                        <a href="" className="MBLogo" rel="home">
                                            <img src="media/common/logo.png" title="<?php echo $sSiteTitle; ?>" alt="<?php echo $sSiteTitle; ?>" className="img-fluid img100" />
                                        </a>
                                        <div className="d-flex justify-content-end SearchArea">
                                            <div className="search">
                                                <i onClick={setToggle} className="fas fa-search" aria-hidden="true"></i>
                                                {toggle && (
                                                    <div className="search-box" >
                                                        <form onSubmit={handelSubmit} >
                                                            <input name="q" type="text" placeholder="এখানে লিখুন..." aria-describedby="button-addon3" />
                                                            <input id="button-addon3" type="submit" className='search-btn' value="খুঁজুন" />
                                                        </form>
                                                    </div>
                                                )}
                                            </div>
                                        </div>



                                    </nav>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="MobileMenu MobileShow  d-print-none" id="myHeader2" >
                    <div className="container TopMenu">
                        <div className="row">
                            <div className="col-2 d-flex align-items-center justify-content-start">
                                <div className="mr-auto menu-left" onClick={mobileHeader}>
                                    <span id="menuBTN1" className="menu-button fas fa-bars show"></span>
                                    <span><i className="fa-solid fa-xmark hide" id="closeBTN1"></i></span>
                                </div>

                            </div>
                            <div className="col-8 d-flex align-items-center justify-content-center">
                                <div className="mobLogo">
                                    <a href="/" onClick={scrollTop}>
                                        <img src={process.env.REACT_APP_FONT_DOMAIN_URL + "media/common/logo.png"} alt="TheNews24 :: দ্য নিউজ ২৪" title="TheNews24 :: দ্য নিউজ ২৪" className="img-fluid img100" />
                                    </a>

                                </div>
                            </div>
                            <div className="col-2 d-flex align-items-center justify-content-end">
                                <div className="menu-search" onClick={mobileHeaderSearch}>
                                    <Link className="nav-link-search" to="#">
                                        <i className="fa fa-search"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="search_block Hide" id="deskSearch">
                        <div className="container">
                            <div className="col-xl p-0">
                                <form onSubmit={handelSubmit}>
                                    <div className="search_logo display-flex" style={{ textAlign: 'center' }}>
                                        <input type="text" name="q" placeholder="নিউজ খুঁজতে এখানে লিখুন" className="form-control" />
                                        <button type="submit" aria-label="submit"><i className="fa fa-search"></i></button>
                                        <button onClick={mobileHeaderSearch} className="close-search" aria-label="close search"><i className="fa fa-times"></i></button>
                                    </div>
                                </form>
                                {/* <form action="/" method="get">
                                    <div className="search_logo display-flex">
                                        <input type="text" name="title" placeholder="এখানে খুঁজুন..." />
                                        <button><i className="fa fa-search"></i></button>
                                        <Link to="/" className="close-search" onClick={mobileHeaderSearch}><i className="fa fa-times"></i></Link>
                                    </div>
                                </form> */}
                            </div>
                        </div>
                    </div>
                    <div className="container MobileMenu hide" id="mobile-nav">
                        <div className="row LiveViewMenu">
                            <div className="col-xl">
                                <div className="MobileMenuTop">
                                    <div className="row pb-4">
                                        <div className="col-xl p-0">
                                            <div className="container extended d-flex justify-content-center align-items-center">
                                                <div className="social-links ">
                                                    <a href="#"><i className="fab fa-facebook-f fb icon"></i></a>
                                                    <a href="#"><i className="fab fa-linkedin-in linkedin icon"></i></a>
                                                    <a href="#"><i className="fab fa-twitter twitter icon"></i></a>
                                                    <a href="#"><i className="fab fa-youtube youtube icon"></i></a>
                                                </div>
                                                <div className="LiveButton">
                                                    <a href="#"><img src={"media/common/live2.gif"} alt="Live" title="Live" className="img-fluid" /></a>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-12">
                                            <ul>
                                                <li className="nav-item" onClick={mobileHeader}><Link className="nav-link" to="/national" onClick={scrollTop}>জাতীয়</Link></li>
                                                {/* <li className="nav-item" onClick={mobileHeader}><Link className="nav-link" to="/international" onClick={scrollTop}>বিদেশে এখন</Link></li> */}
                                                <div className='MobileMenu-Heading '  >
                                                    <li className="mr-auto d-flex justify-content-between" >
                                                        <h3 onClick={mobileHeader}><Link onClick={scrollTop} to="/international" className=' nav-link parent'>আন্তর্জাতিক</Link></h3>
                                                        <h3 onClick={() => setShowSubCat1(!showSubCat1)}>{showSubCat1 ? <i className=" fa-solid fa-xmark  rotate"></i> : <i className="fas fa-plus open-menu  "></i>}</h3>
                                                    </li>
                                                    {showSubCat1 &&
                                                        <ul className='SubMenuM'>
                                                            <li onClick={mobileHeader}><Link  to="/asia" onClick={scrollTop}>এশিয়া</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/south-asia" onClick={scrollTop}>দক্ষিণ এশিয়া</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/middle-east" onClick={scrollTop}>মধ্যপ্রাচ্য</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/europe" onClick={scrollTop}>ইউরোপ</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/usa" onClick={scrollTop}>যুক্তরাষ্ট্র</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/russia" onClick={scrollTop}>রাশিয়া</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/feature-international" onClick={scrollTop}>ফিচার</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/international-extra" onClick={scrollTop}>অন্যান্য</Link></li>
                                                        </ul>
                                                    }
                                                </div>
                                                <li className="nav-item" onClick={mobileHeader}><Link className="nav-link" to="/country" onClick={scrollTop}>সারাদেশ</Link></li>
                                                <li className="nav-item" onClick={mobileHeader}><Link className="nav-link" to="/politics" onClick={scrollTop}>রাজনীতি</Link></li>
                                                <li className="nav-item" onClick={mobileHeader}><Link className="nav-link" to="/crime" onClick={scrollTop}>অপরাধ</Link></li>
                                                <div className='MobileMenu-Heading  '>
                                                    <li className="mr-auto d-flex  justify-content-between">
                                                        <h3 onClick={mobileHeader}><Link onClick={scrollTop} to="/sports" className='nav-link parent'>ক্রীড়াঙ্গন</Link></h3>
                                                        <h3 onClick={() => setShowSubCat2(!showSubCat2)}>{showSubCat2 ? <i className=" fa-solid fa-xmark  rotate"></i> : <i className="fas fa-plus open-menu  "></i>}</h3>
                                                    </li>
                                                    {showSubCat2 &&
                                                        <ul className='SubMenuM'>
                                                            <li onClick={mobileHeader}><Link  to="/football" onClick={scrollTop}>ফুটবল</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/cricket" onClick={scrollTop}>ক্রিকেট</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/sports-others" onClick={scrollTop}>অন্যান্য</Link></li>
                                                        </ul>
                                                    }
                                                </div>
                                                <div className='MobileMenu-Heading'>
                                                    <li className="mr-auto d-flex  justify-content-between">
                                                        <h3 onClick={mobileHeader}><Link onClick={scrollTop} to="/entertainment" className='nav-link parent'>বিনোদন</Link></h3>
                                                        <h3 onClick={() => setShowSubCat3(!showSubCat3)}>{showSubCat3 ? <i className=" fa-solid fa-xmark  rotate"></i> : <i className="fas fa-plus open-menu  "></i>}</h3>
                                                    </li>
                                                    {showSubCat3 &&
                                                        <ul className='SubMenuM'>
                                                            <li onClick={mobileHeader}><Link  to="/hollywood" onClick={scrollTop}>টেক</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/bollywood" onClick={scrollTop}>গেজেট</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/dhallywood" onClick={scrollTop}>অন্যান্য</Link></li>
                                                        </ul>
                                                    }
                                                </div>

                                                <div className='MobileMenu-Heading'>
                                                    <li className="mr-auto d-flex  justify-content-between">
                                                        <h3 onClick={mobileHeader}><Link onClick={scrollTop} to="/trade" className='nav-link parent'>বাণিজ্য</Link></h3>
                                                        <h3 onClick={() => setShowSubCat4(!showSubCat4)}>{showSubCat4 ? <i className=" fa-solid fa-xmark  rotate"></i> : <i className="fas fa-plus open-menu  "></i>}</h3>
                                                    </li>
                                                    {showSubCat4 &&
                                                        <ul className='SubMenuM'>
                                                            <li onClick={mobileHeader}><Link  to="/money" onClick={scrollTop}>অর্থ</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/the-industry" onClick={scrollTop}>শিল্প</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/agriculture" onClick={scrollTop}>কৃষি</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/stock-market" onClick={scrollTop}>শেয়ার বাজার</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/bank-insurance" onClick={scrollTop}>ব্যাংক-বীমা</Link></li>

                                                        </ul>
                                                    }
                                                </div>
                                                <div className='MobileMenu-Heading '>
                                                    <li className="mr-auto d-flex  justify-content-between">
                                                        <h3 onClick={mobileHeader}><Link onClick={scrollTop} to="/court-law" className='nav-link parent'>আইন ও বিচার</Link></h3>
                                                        <h3 onClick={() => setShowSubCat5(!showSubCat5)}>{showSubCat5 ?  <i className=" fa-solid fa-xmark  rotate"></i> : <i className="fas fa-plus open-menu  "></i>}</h3>
                                                    </li>
                                                    {showSubCat5 &&
                                                        <ul className='SubMenuM'>
                                                            <li onClick={mobileHeader}><Link  to="/gov-jobs" onClick={scrollTop}>সরকারি</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/private-jobs" onClick={scrollTop}>বেসরকারি</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/ngo-jobs" onClick={scrollTop}>এনজিও</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/job-others" onClick={scrollTop}>অন্যান্য</Link></li>

                                                        </ul>
                                                    }
                                                </div>
                                                <div className='MobileMenu-Heading '>
                                                    <li className="mr-auto d-flex  justify-content-between">
                                                        <h3 onClick={mobileHeader}><Link onClick={scrollTop} to="/religion" className='nav-link parent'>ধর্ম ও জীবন</Link></h3>
                                                        <h3 onClick={() => setShowSubCat6(!showSubCat6)}>{showSubCat6 ?  <i className=" fa-solid fa-xmark  rotate"></i> : <i className="fas fa-plus open-menu  "></i>}</h3>
                                                    </li>
                                                    {showSubCat6 &&
                                                        <ul className='SubMenuM'>
                                                            <li onClick={mobileHeader}><Link  to="/islam" onClick={scrollTop}>ইসলাম</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/hinduism" onClick={scrollTop}>সনাতন</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/religion-others" onClick={scrollTop}>অন্যান্য</Link></li>

                                                        </ul>
                                                    }
                                                </div>
                                                <li className="nav-item" onClick={mobileHeader}><Link className="nav-link" to="/opinion" onClick={scrollTop}>মতামত</Link></li>
                                                <div className='MobileMenu-Heading'>
                                                    <li className="mr-auto d-flex justify-content-between">
                                                        <h3 onClick={mobileHeader}><Link onClick={scrollTop} to="/others" className='nav-link parent'>অন্যান্য</Link></h3>
                                                        <h3 onClick={() => setShowSubCat7(!showSubCat7)}>{showSubCat7 ? <i className=" fa-solid fa-xmark  rotate"></i> : <i className="fas fa-plus open-menu  "></i>}</h3>
                                                    </li>
                                                    {showSubCat7 &&
                                                        <ul className='SubMenuM'>
                                                            <li onClick={mobileHeader}><Link  to="/migration" onClick={scrollTop}>প্রবাস</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/education" onClick={scrollTop}>শিক্ষা</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/todays-sports" onClick={scrollTop}>আজকের খেলা</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/health" onClick={scrollTop}>স্বাস্থ্য</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/information-technology" onClick={scrollTop}>তথ্য প্রযুক্তি</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/horoscope" onClick={scrollTop}>রাশিফল</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/the-news-special" onClick={scrollTop}>দ্য নিউজ স্পেশাল</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/reader-s-news" onClick={scrollTop}>পাঠকের সংবাদ</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/motivation" onClick={scrollTop}>অনুপ্রেরণা</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/photo-feature" onClick={scrollTop}>ছবি</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/video" onClick={scrollTop}>ভিডিও</Link></li>
                                                            <li onClick={mobileHeader}><Link  to="/archives" onClick={scrollTop}>আর্কাইভ</Link></li>

                                                        </ul>
                                                    }
                                                </div>
                                            </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </header>
        </>
    )
}
