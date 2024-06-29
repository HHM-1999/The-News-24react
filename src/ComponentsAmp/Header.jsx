import React from 'react'
import { banglaDateConvetar } from './AllFunctions'
import { getDate, getMonth, getYear } from 'bangla-calendar';
import moment from 'moment-hijri';
import Logo from './Image/logo.png';
const date1 = new Date();
let bnDate = getDate(date1, { format: 'D' })
let bnMonth = getMonth(date1, { format: 'MMMM' })
let bnYear = getYear(date1, { format: 'YYYY' })
let BNDATEs = bnDate + ' ' + bnMonth + ' ' + bnYear
const currentDate = moment().format('DD MMMM YYYY')
const currentDay = moment().format('dddd')



export default function Header() {

    return (
        <div className=' text-black body-' amp-custom="">

            {/* <!-- Start Navbar --> */}
            <header amp-fx="float-in-top" class="ampstart-headerbar" style={{ display: 'flex' }} >
                <div role="button" aria-label="open sidebar" on="tap:header-sidebar.toggle" tabIndex="0"
                    class="ampstart-navbar-trigger pr2">
                    ☰
                </div>
                <a href="/" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: "auto" }}><amp-img src={Logo} width="100" height="55" layout="fixed"
                   ></amp-img></a>
            </header>
            {/* <!-- Start Sidebar --> */}
            <amp-sidebar id="header-sidebar" class="ampstart-sidebar px3" layout="nodisplay">

                <div class="flex justify-end items-center ampstart-sidebar-header">
                    <div role="button" aria-label="close sidebar" on="tap:header-sidebar.toggle" tabIndex="0"
                        class="ampstart-navbar-trigger items-start">
                        ✕
                    </div>
                </div>
                <div class="navberTimeDate">
                    <p>&nbsp;{banglaDateConvetar(currentDay)}, {banglaDateConvetar(currentDate)}, {BNDATEs}</p>
                </div>
                <a href="/" class='flex justify-end items-center'>  <amp-img src={Logo} width="100" height="55" layout="fixed"
                    ></amp-img></a>
                <nav class="ampstart-sidebar-nav ampstart-nav">
                    <ul class="list-reset m0 p0 ampstart-label">
                        <li class="ampstart-nav-item">
                            <a class="ampstart-nav-link" href="/amp/national">জাতীয়</a>
                        </li>

                        <li className="ampstart-nav-item">
                            <div class="dropdown">
                                <a href="/amp/international" style={{ border: "none", background: "transparent" }}> <header>আন্তর্জাতিক + </header></a>
                                <div class="dropdown-content">
                                    <a href="/amp/international/asia" class="text-decoration-none">এশিয়া</a>
                                    <a href="/amp/international/south-asia" class="text-decoration-none">দক্ষিণ এশিয়া</a>
                                    <a href="/amp/international/middle-east" class="text-decoration-none">মধ্যপ্রাচ্য</a>
                                    <a href="/amp/international/europe" class="text-decoration-none">ইউরোপ</a>
                                    <a href="/amp/international/usa" class="text-decoration-none">যুক্তরাষ্ট্র</a>
                                    <a href="/amp/international/russia" class="text-decoration-none">রাশিয়া</a>
                                    <a href="/amp/international/feature-international" class="text-decoration-none">ফিচার</a>
                                    <a href="/amp/international/international-extra" class="text-decoration-none">অন্যান্য</a>
                                </div>
                            </div>

                        </li>
                        <li class="ampstart-nav-item">
                            <a class="ampstart-nav-link" href="/amp/country">স্বদেশ</a>
                        </li>
                        <li class="ampstart-nav-item">
                            <a class="ampstart-nav-link" href="/amp/politics">রাজনীতি</a>
                        </li>
                        <li class="ampstart-nav-item">
                            <a class="ampstart-nav-link" href="/amp/crime">অপরাধ</a>
                        </li>
                        <li className="ampstart-nav-item">
                            <div class="dropdown">
                                <a href="/amp/sports" style={{ border: "none", background: "transparent" }}> <header>ক্রীড়াঙ্গন + </header></a>
                                <div class="dropdown-content">

                                    <a href="/amp/sports/football" class="text-decoration-none">ফুটবল</a>
                                    <a href="/amp/sports/cricket" class="text-decoration-none">ক্রিকেট</a>
                                    <a href="/amp/sports/sports-others" class="text-decoration-none">অন্যান্য</a>
                                </div>
                            </div>

                        </li>
                        <li class="ampstart-nav-item">
                            <a class="ampstart-nav-link" href="/amp/entertainment">বিনোদন</a>
                        </li>
                        <li class="ampstart-nav-item">
                            <a class="ampstart-nav-link" href="/amp/trade">বাণিজ্য</a>
                        </li>
                        <li class="ampstart-nav-item">
                            <a class="ampstart-nav-link" href="/amp/migration">প্রবাস</a>
                        </li>
                        <li className="ampstart-nav-item">
                            <div class="dropdown">
                                <a href="/amp/religion" style={{ border: "none", background: "transparent" }}> <header>ধর্ম ও জীবন + </header></a>
                                <div class="dropdown-content">
                                    <a href="/amp/religion/islam" class="text-decoration-none">ইসলাম</a>
                                    <a href="/amp/religion/religion-others" class="text-decoration-none">অন্যান্য</a>
                                </div>
                            </div>

                        </li>
                        <li class="ampstart-nav-item">
                            <a class="ampstart-nav-link" href="/amp/opinion">মতামত</a>
                        </li>
                        <li class="ampstart-nav-item">
                            <a class="ampstart-nav-link" href="/amp/video">ভিডিও</a>
                        </li>
                        <li className="ampstart-nav-item">
                            <div class="dropdown">
                                <a href="#" style={{ border: "none", background: "transparent" }}> <header>অন্যান্য + </header></a>
                                <div class="dropdown-content">
                                    <a href="/amp/court-law" class="text-decoration-none">আইন ও বিচার</a>
                                    <a href="/amp/education" class="text-decoration-none">শিক্ষা</a>
                                    <a href="/amp/motivation" class="text-decoration-none">অনুপ্রেরণা</a>
                                    <a href="/amp/jobs" class="text-decoration-none">চাকরি</a>
                                    <a href="/amp/health" class="text-decoration-none">স্বাস্থ্য</a>
                                    <a href="/amp/photo-feature" class="text-decoration-none">ছবিঘর</a>
                                    <a href="/amp/information-technology" class="text-decoration-none">তথ্য প্রযুক্তি</a>

                                    <a href="/amp/environment-and-climate" class="text-decoration-none">পরিবেশ ও জলবায়ু</a>

                                    <a href="/amp/lifestyle" class="text-decoration-none">লাইফস্টাইল</a>
                                    <a href="/amp/agriculture" class="text-decoration-none">কৃষি</a>
                                    <a href="/amp/the-news-special" class="text-decoration-none">দ্য নিউজ স্পেশাল</a>

                                    <a href="/amp/reader-s-news" class="text-decoration-none">পাঠকের সংবাদ</a>
                                </div>
                            </div>

                        </li>

                    </ul>
                </nav>

        

            </amp-sidebar>
            {/* <!-- End Sidebar -->
  <!-- End Navbar --> */}
        </div>
    )
}
