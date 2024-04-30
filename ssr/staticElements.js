require('dotenv').config();

function header() {
    return `<header>
    <div id="myHeader" class="header d-print-none">
        <div class="DHeaderNav Mobilehide">
            <div class="container">
                <nav class="navbar navbar-expand-lg navbar-light"><button class="navbar-toggler" type="button"
                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse align-items-end" id="navbarSupportedContent">
                        <div class="HomeBtn"><a href="/" class="DLogo"><img
                                    src="${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/ekhonTVlogo.png" width="187" height="68"
                                    title="Ekhon TV :: এখন টিভি" alt="Ekhon TV :: এখন টিভি"
                                    class="img-fluid img100"></a></div><span class="live-icon"><a href="/live"><i
                                    class="fa-solid fa-circle-play"></i> লাইভ</a></span>
                        <div class="stickyHide" style="width: 100%;">
                            <div class="SocialIcon d-flex justify-content-end align-items-center">
                                <ul>
                                    <li class="fb-icon"><a href="https://www.facebook.com/tv.ekhon/"
                                            aria-label="FaceBook" target="_blank" rel="noreferrer"><i
                                                class="fa-brands fa-facebook-f"></i></a></li>
                                    <li class="yt-icon"><a href="https://www.youtube.com/c/EKHONTV" aria-label="Youtube"
                                            target="_blank" rel="noreferrer"><i class="fa-brands fa-youtube"></i></a>
                                    </li>
                                    <li class="tw-icon"><a href="https://twitter.com/ekhon_tv" aria-label="Twitter"
                                            target="_blank" rel="noreferrer"><i class="fa-brands fa-twitter"></i></a>
                                    </li>
                                    <li class="insta-icon"><a href="https://www.instagram.com/ekhon_tv/?hl=bn"
                                            aria-label="Instagram" target="_blank" rel="noreferrer"><i
                                                class="fa-brands fa-instagram"></i></a></li>
                                    <li class="li-icon"><a href="https://bd.linkedin.com/company/ekhontv"
                                            aria-label="Linkedin" target="_blank" rel="noreferrer"><i
                                                class="fa-brands fa-linkedin-in"></i></a></li>
                                    <li class="rounded" style="border: 1px solid rgb(0, 0, 0);">
                                        <div class="input-group">
                                            <form>
                                                <div class="input-group">
                                                    <div class="input-group-prepend"><button aria-label="search product"
                                                            id="button-addon2" type="submit"
                                                            class="btn btn-link text-warning"
                                                            style="padding: 0px 8px;"><i
                                                                class="fa fa-search"></i></button></div><input
                                                        type="text" name="q" placeholder="নিউজ খুঁজতে এখানে লিখুন"
                                                        aria-describedby="button-addon3" class="form-control border-0"
                                                        style="padding: 0px;">
                                                </div>
                                            </form>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <ul class="navbar-nav d-flex justify-content-around">
                                <li class="nav-item"><a class="nav-link" href="/countries">দেশে এখন</a></li>
                                <li class="nav-item dropdown"><a class="nav-link  dropdown-toggle" role="button"
                                        data-toggle="dropdown disable" href="/market">বাজার</a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="/market/sub/raw-market">কাচা বাজার</a></li>
                                        <li><a class="dropdown-item" href="/market/sub/currency-market">মুদ্রা বাজার</a>
                                        </li>
                                        <li><a class="dropdown-item" href="/market/sub/gold-market">স্বর্ণের বাজার</a>
                                        </li>
                                        <li><a class="dropdown-item" href="/market/sub/share-market">শেয়ার বাজার</a>
                                        </li>
                                        <li><a class="dropdown-item" href="/market/sub/new-to-the-market">বাজারে
                                                নতুন</a></li>
                                        <li><a class="dropdown-item" href="/market/sub/discount">ছাড়</a></li>
                                        <li><a class="dropdown-item" href="/market/sub/international-market">আন্তর্জাতিক
                                                বাজার</a></li>
                                        <li><a class="dropdown-item" href="/market/sub/e-commerce">ই-কমার্স</a></li>
                                        <li><a class="dropdown-item" href="/market/sub/crypto">ক্রিপ্টো</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item"><a class="nav-link" href="/international">বিদেশে এখন</a></li>
                                <li class="nav-item dropdown"><a class="nav-link  dropdown-toggle" role="button"
                                        data-toggle="dropdown disable" href="/sports">এখন মাঠে</a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="/sports/sub/cricket">ক্রিকেট</a></li>
                                        <li><a class="dropdown-item" href="/sports/sub/football">ফুটবল</a></li>
                                        <li><a class="dropdown-item" href="/sports/sub/others-sports">অন্যান্য</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item dropdown"><a class="nav-link  dropdown-toggle" role="button"
                                        data-toggle="dropdown disable" href="/entertainment">এখন আনন্দ</a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="/entertainment/sub/cinema">সিনেমা</a></li>
                                        <li><a class="dropdown-item" href="/entertainment/sub/natok">নাটক</a></li>
                                        <li><a class="dropdown-item"
                                                href="/entertainment/sub/others-entertainment">অন্যান্য</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item dropdown"><a class="nav-link  dropdown-toggle" role="button"
                                        data-toggle="dropdown disable" href="/information-technology">তথ্য প্রযুক্তি</a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="/information-technology/sub/tech">টেক</a>
                                        </li>
                                        <li><a class="dropdown-item"
                                                href="/information-technology/sub/gazette">গেজেট</a></li>
                                        <li><a class="dropdown-item"
                                                href="/information-technology/sub/others-information-technology">অন্যান্য</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-item"><a class="nav-link" href="/video">ভিডিও</a></li>
                                <li class="nav-item dropdown has-megamenu"><a class="nav-link dropdown-toggle"
                                        href="/">আরও</a>
                                    <div class="dropdown-menu megamenu" role="menu">
                                        <div class="row w-100 ">
                                            <div class="col-md-3" style="flex: 0 0 20%; max-width: 20%;">
                                                <ul class="nav flex-column">
                                                    <li><a class="dropdown-item" href="/fashion">ফ্যাশন</a></li>
                                                    <li><a class="dropdown-item" href="/education">শিক্ষা</a></li>
                                                    <li><a class="dropdown-item" href="/kitchen">রান্নাঘর</a></li>
                                                </ul>
                                            </div>
                                            <div class="col-md-3" style="flex: 0 0 20%; max-width: 20%;">
                                                <ul class="nav flex-column">
                                                    <li><a class="dropdown-item" href="/opinion">মতামত</a></li>
                                                    <li><a class="dropdown-item" href="/readers-word">পাঠকের কথা</a>
                                                    </li>
                                                    <li><a class="dropdown-item" href="/citizen-journalism">নাগরিক
                                                            সাংবাদিকতা</a></li>
                                                </ul>
                                            </div>
                                            <div class="col-md-3" style="flex: 0 0 20%; max-width: 20%;">
                                                <ul class="nav flex-column">
                                                    <li><a class="dropdown-item" href="/current-topic">চলতি হাওয়া</a>
                                                    </li>
                                                    <li><a class="dropdown-item" href="/environment">পরিবেশ</a></li>
                                                    <li><a class="dropdown-item" href="/agriculture">কৃষি</a></li>
                                                </ul>
                                            </div>
                                            <div class="col-md-3" style="flex: 0 0 20%; max-width: 20%;">
                                                <ul class="nav flex-column">
                                                    <li><a class="dropdown-item" href="/travel">ভ্রমণ</a></li>
                                                    <li><a class="dropdown-item" href="/health">স্বাস্থ্য</a></li>
                                                    <li><a class="dropdown-item" href="/photo-feature">ছবিঘর</a></li>
                                                </ul>
                                            </div>
                                            <div class="col-md-3" style="flex: 0 0 20%; max-width: 20%;">
                                                <ul class="nav flex-column">
                                                    <li><a class="dropdown-item" href="/entrepreneur">উদ্যোক্তা</a></li>
                                                    <li><a class="dropdown-item" href="/weather">আবহাওয়া</a></li>
                                                    <li><a class="dropdown-item" href="/archives">আর্কাইভস </a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <ul class="navbar-nav d-flex justify-content-around stickyShow">
                            <li class="nav-item"><a class="nav-link" href="/countries">দেশে এখন</a></li>
                            <li class="nav-item dropdown"><a class="nav-link  dropdown-toggle" role="button"
                                    data-toggle="dropdown disable" href="/market">বাজার</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="/market/sub/raw-market">কাচা বাজার</a></li>
                                    <li><a class="dropdown-item" href="/market/sub/currency-market">মুদ্রা বাজার</a>
                                    </li>
                                    <li><a class="dropdown-item" href="/market/sub/gold-market">স্বর্ণের বাজার</a></li>
                                    <li><a class="dropdown-item" href="/market/sub/share-market">শেয়ার বাজার</a></li>
                                    <li><a class="dropdown-item" href="/market/sub/new-to-the-market">বাজারে নতুন</a>
                                    </li>
                                    <li><a class="dropdown-item" href="/market/sub/discount">ছাড়</a></li>
                                    <li><a class="dropdown-item" href="/market/sub/international-market">আন্তর্জাতিক
                                            বাজার</a></li>
                                    <li><a class="dropdown-item" href="/market/sub/e-commerce">ই-কমার্স</a></li>
                                    <li><a class="dropdown-item" href="/market/sub/crypto">ক্রিপ্টো</a></li>
                                </ul>
                            </li>
                            <li class="nav-item"><a class="nav-link" href="/international">বিদেশে এখন</a></li>
                            <li class="nav-item dropdown"><a class="nav-link  dropdown-toggle" role="button"
                                    data-toggle="dropdown disable" href="/sports">এখন মাঠে</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="/sports/sub/cricket">ক্রিকেট</a></li>
                                    <li><a class="dropdown-item" href="/sports/sub/football">ফুটবল</a></li>
                                    <li><a class="dropdown-item" href="/sports/sub/others-sports">অন্যান্য</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown"><a class="nav-link  dropdown-toggle" role="button"
                                    data-toggle="dropdown disable" href="/entertainment">এখন আনন্দ</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="/entertainment/sub/cinema">সিনেমা</a></li>
                                    <li><a class="dropdown-item" href="/entertainment/sub/natok">নাটক</a></li>
                                    <li><a class="dropdown-item"
                                            href="/entertainment/sub/others-entertainment">অন্যান্য</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown"><a class="nav-link  dropdown-toggle" role="button"
                                    data-toggle="dropdown disable" href="/information-technology">তথ্য প্রযুক্তি</a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="/information-technology/sub/tech">টেক</a></li>
                                    <li><a class="dropdown-item" href="/information-technology/sub/gazette">গেজেট</a>
                                    </li>
                                    <li><a class="dropdown-item"
                                            href="/information-technology/sub/others-information-technology">অন্যান্য</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item"><a class="nav-link" href="/video">ভিডিও</a></li>
                            <li class="nav-item dropdown has-megamenu"><a class="nav-link dropdown-toggle"
                                    href="/">আরও</a>
                                <div class="dropdown-menu megamenu" role="menu">
                                    <div class="row w-100 ">
                                        <div class="col-md-3" style="flex: 0 0 20%; max-width: 20%;">
                                            <ul class="nav flex-column">
                                                <li><a class="dropdown-item" href="/fashion">ফ্যাশন</a></li>
                                                <li><a class="dropdown-item" href="/education">শিক্ষা</a></li>
                                                <li><a class="dropdown-item" href="/kitchen">রান্নাঘর</a></li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3" style="flex: 0 0 20%; max-width: 20%;">
                                            <ul class="nav flex-column">
                                                <li><a class="dropdown-item" href="/opinion">মতামত</a></li>
                                                <li><a class="dropdown-item" href="/readers-word">পাঠকের কথা</a></li>
                                                <li><a class="dropdown-item" href="/citizen-journalism">নাগরিক
                                                        সাংবাদিকতা</a></li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3" style="flex: 0 0 20%; max-width: 20%;">
                                            <ul class="nav flex-column">
                                                <li><a class="dropdown-item" href="/current-topic">চলতি হাওয়া</a></li>
                                                <li><a class="dropdown-item" href="/environment">পরিবেশ</a></li>
                                                <li><a class="dropdown-item" href="/agriculture">কৃষি</a></li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3" style="flex: 0 0 20%; max-width: 20%;">
                                            <ul class="nav flex-column">
                                                <li><a class="dropdown-item" href="/travel">ভ্রমণ</a></li>
                                                <li><a class="dropdown-item" href="/health">স্বাস্থ্য</a></li>
                                                <li><a class="dropdown-item" href="/photo-feature">ছবিঘর</a></li>
                                            </ul>
                                        </div>
                                        <div class="col-md-3" style="flex: 0 0 20%; max-width: 20%;">
                                            <ul class="nav flex-column">
                                                <li><a class="dropdown-item" href="/entrepreneur">উদ্যোক্তা</a></li>
                                                <li><a class="dropdown-item" href="/weather">আবহাওয়া</a></li>
                                                <li><a class="dropdown-item" href="/archives">আর্কাইভস</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    <div class="DHeaderMenu MobileMenuShow d-print-none" id="myHeader2">
        <div class="container TopMenu">
            <div class="row">
                <div class="col-sm-12">
                    <div class="DLogoMobile display-flex">
                        <div class="mr-auto menu-left"><i class="fa-solid fa-bars show" id="menuBTN1"></i><i
                                class="fa-solid fa-xmark hide" id="closeBTN1"></i></div>
                        <div class="m-auto LogoDate"><a href="/"><img
                                    src="${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/ekhonTVlogo.png" width="187" height="68"
                                    alt="Ekhon TV :: এখন টিভি" title="Ekhon TV :: এখন টিভি" class="img-fluid"></a></div>
                        <div class="ml-auto menu-right">
                            <div class="menu-search"><a class="nav-link-search" href="/"><i
                                        class="fa fa-search"></i></a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="search_block Hide" id="deskSearch">
            <div class="container">
                <div class="col-xl p-0">
                    <form>
                        <div class="search_logo display-flex" style="text-align: center;"><input type="text" name="q"
                                placeholder="নিউজ খুঁজতে এখানে লিখুন" class="form-control"><button type="submit"
                                aria-label="submit"><i class="fa fa-search"></i></button><button class="close-search"
                                aria-label="close search"><i class="fa fa-times"></i></button></div>
                    </form>
                </div>
            </div>
        </div>
        <div class="container MobileMenu hide" id="MobileMenu">
            <div class="row LiveViewMenu">
                <div class="col-xl">
                    <div class="MobileMenuTop">
                        <div class="row pb-4">
                            <div class="col-xl p-0">
                                <div class="MobileMenuSocial d-flex justify-content-center">
                                    <div class="DSocialLink DSocialLinkMobile">
                                        <ul>
                                            <li><a href="https://www.facebook.com/tv.ekhon/" aria-label="FaceBook"
                                                    target="_blank" rel="noreferrer"><i
                                                        class="fa-brands fa-facebook-f"></i></a></li>
                                            <li><a href="https://www.youtube.com/c/EKHONTV" aria-label="Youtube"
                                                    target="_blank" rel="noreferrer"><i
                                                        class="fa-brands fa-youtube"></i></a></li>
                                            <li><a href="https://twitter.com/ekhon_tv" aria-label="Twitter"
                                                    target="_blank" rel="noreferrer"><i
                                                        class="fa-brands fa-twitter"></i></a></li>
                                            <li><a href="https://www.instagram.com/ekhon_tv/?hl=bn"
                                                    aria-label="Instagram" target="_blank" rel="noreferrer"><i
                                                        class="fa-brands fa-instagram"></i></a></li>
                                            <li><a href="https://bd.linkedin.com/company/ekhontv" aria-label="Linkedin"
                                                    target="_blank" rel="noreferrer"><i
                                                        class="fa-brands fa-linkedin-in"></i></a></li>
                                            <li class="live-icon"><a href="/live"><i
                                                        class="fa-solid fa-circle-play"></i> লাইভ</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <ul>
                                    <li class="nav-item"><a class="nav-link" href="/countries">দেশে এখন</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/international">বিদেশে এখন</a></li>
                                    <div class="MobileMenu-Heading mt-2">
                                        <div class="mr-auto d-flex">
                                            <h3><a class="nav-link" href="/sports">এখন মাঠে</a></h3>
                                            <h3><i class="fa-solid fa-angle-down"></i></h3>
                                        </div>
                                    </div>
                                    <div class="MobileMenu-Heading mt-2">
                                        <div class="mr-auto d-flex">
                                            <h3><a class="nav-link" href="/entertainment">এখন আনন্দ</a></h3>
                                            <h3><i class="fa-solid fa-angle-down"></i></h3>
                                        </div>
                                    </div>
                                    <div class="MobileMenu-Heading mt-2">
                                        <div class="mr-auto d-flex">
                                            <h3><a class="nav-link" href="/information-technology">তথ্য প্রযুক্তি</a>
                                            </h3>
                                            <h3><i class="fa-solid fa-angle-down"></i></h3>
                                        </div>
                                    </div>
                                    <div class="MobileMenu-Heading mt-2">
                                        <div class="mr-auto d-flex">
                                            <h3><a class="nav-link" href="/market">বাজার</a></h3>
                                            <h3><i class="fa-solid fa-angle-down"></i></h3>
                                        </div>
                                    </div>
                                    <li class="nav-item"><a class="nav-link" href="/kitchen">রান্নাঘর</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/opinion">মতামত</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/fashion">ফ্যাশন</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/video">ভিডিও</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/education">শিক্ষা</a></li>
                                </ul>
                            </div>
                            <div class="col-6">
                                <ul>
                                    <li class="nav-item"><a class="nav-link" href="/citizen-journalism">নাগরিক
                                            সাংবাদিকতা</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/readers-word">পাঠকের কথা</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/current-topic">চলতি হাওয়া</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/weather">আবহাওয়া</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/environment">পরিবেশ</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/entrepreneur">উদ্যোক্তা</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/archives">আর্কাইভস</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/photo-feature">ছবিঘর</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/travel">ভ্রমণ</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/agriculture">কৃষি</a></li>
                                    <li class="nav-item"><a class="nav-link" href="/health">স্বাস্থ্য</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>`;
}

function footer() {
    return `<footer>
<div class="DFooterBg d-print-none">
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-12 border-right-inner">
                <div class="DFooterLogo"><a href="/"><img src="${process.env.REACT_APP_FONT_DOMAIN_URL}media/common/ekhonTVlogo.png"
                    alt="Ekhon TV :: এখন টিভি" title="Ekhon TV :: এখন টিভি" class="img-fluid img100"></a></div>
                <div class="SocialIcon mt-3">
                <ul>
                    <li class="fb-icon"><a href="https://www.facebook.com/tv.ekhon/" aria-label="Facebook" target="_blank"
                        rel="noreferrer"><i class="fab fa-facebook-f"></i></a></li>
                    <li class="yt-icon"><a href="https://www.youtube.com/c/EKHONTV" aria-label="Youtube" target="_blank"
                        rel="noreferrer"><i class="fab fa-youtube"></i></a></li>
                    <li class="tw-icon"><a href="https://twitter.com/ekhon_tv" aria-label="Twitter" target="_blank"
                        rel="noreferrer"><i class="fab fa-twitter"></i></a></li>
                    <li class="li-icon"><a
                        href="https://bd.linkedin.com/company/ekhontv?trk=public_profile_experience-item_profile-section-card_image-click"
                        aria-label="Linkedin" target="_blank" rel="noreferrer"><i class="fab fa-linkedin"></i></a></li>
                    <li class="insta-icon"><a href="https://www.instagram.com/ekhon_tv/?hl=bn" aria-label="Instagram"
                        target="_blank" rel="noreferrer"><i class="fab fa-instagram"></i></a></li>
                </ul>
            </div>
            <div className="col-lg-4 col-12 border-right-inner">
                <address className="MoreInfo">
                    <p style={{ fontFamily: 'Roboto,sans-serif', fontSize: '16px' }}>Ekhon Television <br />
                        Spice Television Limited <br />
                        City Park Lane, 19 Hatkhola Road, Wari, Dhaka-1203, Bangladesh</p>
                </address>
                <div className="contact">
                    <p style={{ fontFamily: 'Roboto,sans-serif', fontSize: '16px' }}>Phone: <a href="tel:+8801324720001">+8801324720001</a></p>
                    <p style={{ fontFamily: 'Roboto,sans-serif', fontSize: '16px' }}>Email: <a href="mailto:info@ekhon.tv">info@ekhon.tv </a></p>
                </div>
            </div>
            <div className="col-lg-4 col-12">
                <address className="MoreInfo">
                    <p>এখন টেলিভিশন <br />
                        স্পাইস টেলিভিশন লিমিটেড <br />
                        সিটি পার্ক লেন, ১৯ হাটখোলা রোড, ওয়ারী, ঢাকা-১২০৩, বাংলাদেশ</p>
                </address>
                <div className="contact">
                    <p>ফোন: <a href="tel:+8801324720001">+৮৮ ০১৩২৪ ৭২০ ০০১</a></p>
                    <p>ই-মেইল: <a href="mailto:info@ekhon.tv" style={{ fontFamily: 'Roboto,sans-serif' }}>info@ekhon.tv </a></p>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="DFooterBottomBg mb-0 d-print-none">
    <div class="container">
        <div class="row">
            <div class="col-sm-12 text-center">
                <p style={{ fontFamily: 'Roboto,sans-serif' }}>2023 &copy;Spice Television Limited | Developed by <a href="https://www.emythmakers.com"
                target="_blank" rel="noreferrer">eMythMakers.com</a></p>
            </div>
        </div>
    </div>
</div>
</footer>`;
}

function districtTab() {
    return `<div class="DDivisionNav my-4 mt-4">
<div class="row">
    <div class="col-lg-12 d-flex justify-content-center">
        <div class="text-center">
            <ul class="nav">
                <li class="dropdown">
                    <a href="/divisions/dhaka" class="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">ঢাকা</a>
                    <ul class="dropdown-menu">
                        <a class="dropdown-item" href="/divisions/dhaka/kishoreganj">কিশোরগঞ্জ</a>
                        <a class="dropdown-item" href="/divisions/dhaka/gazipur">গাজীপুর</a>
                        <a class="dropdown-item" href="/divisions/dhaka/gopalganj">গোপালগঞ্জ</a>
                        <a class="dropdown-item" href="/divisions/dhaka/tangail">টাঙ্গাইল</a>
                        <a class="dropdown-item" href="/divisions/dhaka/dhaka">ঢাকা</a>
                        <a class="dropdown-item" href="/divisions/dhaka/narsingdi">নরসিংদী</a>
                        <a class="dropdown-item" href="/divisions/dhaka/narayanganj">নারায়ণগঞ্জ</a>
                        <a class="dropdown-item" href="/divisions/dhaka/faridpur">ফরিদপুর</a>
                        <a class="dropdown-item" href="/divisions/dhaka/madaripur">মাদারীপুর</a>
                        <a class="dropdown-item" href="/divisions/dhaka/manikganj">মানিকগঞ্জ</a>
                        <a class="dropdown-item" href="/divisions/dhaka/munshiganj">মুন্সিগঞ্জ</a>
                        <a class="dropdown-item" href="/divisions/dhaka/rajbari">রাজবাড়ী</a>
                        <a class="dropdown-item" href="/divisions/dhaka/shariatpur">শরীয়তপুর</a>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="/divisions/chattogram" class="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">চট্টগ্রাম</a>
                    <ul class="dropdown-menu">
                        <a class="dropdown-item" href="/divisions/chattogram/coxsbazar">কক্সবাজার</a>
                        <a class="dropdown-item" href="/divisions/chattogram/cumilla">কুমিল্লা</a>
                        <a class="dropdown-item" href="/divisions/chattogram/khagrachhari">খাগড়াছড়ি</a>
                        <a class="dropdown-item" href="/divisions/chattogram/chattogram">চট্টগ্রাম</a>
                        <a class="dropdown-item" href="/divisions/chattogram/chandpur">চাঁদপুর</a>
                        <a class="dropdown-item" href="/divisions/chattogram/noakhali">নোয়াখালী</a>
                        <a class="dropdown-item" href="/divisions/chattogram/feni">ফেনী</a>
                        <a class="dropdown-item" href="/divisions/chattogram/bandarban">বান্দরবান</a>
                        <a class="dropdown-item" href="/divisions/chattogram/brahmanbaria">ব্রাহ্মণবাড়িয়া</a>
                        <a class="dropdown-item" href="/divisions/chattogram/rangamati">রাঙামাটি</a>
                        <a class="dropdown-item" href="/divisions/chattogram/lakshmipur">লক্ষ্মীপুর</a>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="/divisions/barishal" class="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">বরিশাল</a>
                    <ul class="dropdown-menu">
                        <a class="dropdown-item" href="/divisions/barishal/jhalokati">ঝালকাঠী</a>
                        <a class="dropdown-item" href="/divisions/barishal/patuakhali">পটুয়াখালি</a>
                        <a class="dropdown-item" href="/divisions/barishal/pirojpur">পিরোজপুর</a>
                        <a class="dropdown-item" href="/divisions/barishal/barguna">বরগুনা</a>
                        <a class="dropdown-item" href="/divisions/barishal/barishal">বরিশাল</a>
                        <a class="dropdown-item" href="/divisions/barishal/bhola">ভোলা</a>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="/divisions/khulna" class="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">খুলনা</a>
                    <ul class="dropdown-menu">
                        <a class="dropdown-item" href="/divisions/khulna/kushtia">কুষ্টিয়া</a>
                        <a class="dropdown-item" href="/divisions/khulna/khulna">খুলনা</a>
                        <a class="dropdown-item" href="/divisions/khulna/chuadanga">চুয়াডাঙ্গা</a>
                        <a class="dropdown-item" href="/divisions/khulna/jhenaidah">ঝিনাইদহ</a>
                        <a class="dropdown-item" href="/divisions/khulna/narail">নড়াইল</a>
                        <a class="dropdown-item" href="/divisions/khulna/bagerhat">বাগেরহাট</a>
                        <a class="dropdown-item" href="/divisions/khulna/magura">মাগুরা</a>
                        <a class="dropdown-item" href="/divisions/khulna/meherpur">মেহেরপুর</a>
                        <a class="dropdown-item" href="/divisions/khulna/jashore">যশোর</a>
                        <a class="dropdown-item" href="/divisions/khulna/satkhira">সাতক্ষীরা</a>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="/divisions/rajshahi" class="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">রাজশাহী</a>
                    <ul class="dropdown-menu">
                        <a class="dropdown-item" href="/divisions/rajshahi/chapainawabganj">চাঁপাইনবাবগঞ্জ</a>
                        <a class="dropdown-item" href="/divisions/rajshahi/joypurhat">জয়পুরহাট</a>
                        <a class="dropdown-item" href="/divisions/rajshahi/naogaon">নওগাঁ</a>
                        <a class="dropdown-item" href="/divisions/rajshahi/natore">নাটোর</a>
                        <a class="dropdown-item" href="/divisions/rajshahi/pabna">পাবনা</a>
                        <a class="dropdown-item" href="/divisions/rajshahi/bogura">বগুড়া</a>
                        <a class="dropdown-item" href="/divisions/rajshahi/rajshahi">রাজশাহী</a>
                        <a class="dropdown-item" href="/divisions/rajshahi/sirajganj">সিরাজগঞ্জ</a>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="/divisions/sylhet" class="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">সিলেট</a>
                    <ul class="dropdown-menu">
                        <a class="dropdown-item" href="/divisions/sylhet/maulvibazar">মৌলভীবাজার</a>
                        <a class="dropdown-item" href="/divisions/sylhet/sylhet">সিলেট</a>
                        <a class="dropdown-item" href="/divisions/sylhet/sunamganj">সুনামগঞ্জ</a>
                        <a class="dropdown-item" href="/divisions/sylhet/habiganj">হবিগঞ্জ</a>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="/divisions/rangpur" class="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">রংপুর</a>
                    <ul class="dropdown-menu">
                        <a class="dropdown-item" href="/divisions/rangpur/kurigram">কুড়িগ্রাম</a>
                        <a class="dropdown-item" href="/divisions/rangpur/gaibandha">গাইবান্ধা</a>
                        <a class="dropdown-item" href="/divisions/rangpur/thakurgaon">ঠাকুরগাঁও</a>
                        <a class="dropdown-item" href="/divisions/rangpur/dinajpur">দিনাজপুর</a>
                        <a class="dropdown-item" href="/divisions/rangpur/nilphamari">নীলফামারী</a>
                        <a class="dropdown-item" href="/divisions/rangpur/panchagarh">পঞ্চগড়</a>
                        <a class="dropdown-item" href="/divisions/rangpur/rangpur">রংপুর</a>
                        <a class="dropdown-item" href="/divisions/rangpur/lalmonirhat">লালমনিরহাট</a>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="/divisions/mymensingh" class="dropdown-toggle" data-toggle="dropdown disable" role="button" aria-haspopup="true" aria-expanded="false">ময়মনসিংহ</a>
                    <ul class="dropdown-menu">
                        <a class="dropdown-item" href="/divisions/mymensingh/jamalpur">জামালপুর</a>
                        <a class="dropdown-item" href="/divisions/mymensingh/netrokona">নেত্রকোনা</a>
                        <a class="dropdown-item" href="/divisions/mymensingh/mymensingh">ময়মনসিংহ</a>
                        <a class="dropdown-item" href="/divisions/mymensingh/sherpur">শেরপুর</a>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</div>
</div>`;
}

function toBengaliNumber(numericText) {
    const digitMap = {
        '1': '১',
        '2': '২',
        '3': '৩',
        '4': '৪',
        '5': '৫',
        '6': '৬',
        '7': '৭',
        '8': '৮',
        '9': '৯',
        '0': '০',
    };

    return String(numericText).replace(/\d/g, function (key) {
        return digitMap[key];
    });
}

function banglaDateConvetar(engDate) {
    var mapObj = {
        1: "১",
        2: "২",
        3: "৩",
        4: "৪",
        5: "৫",
        6: "৬",
        7: "৭",
        8: "৮",
        9: "৯",
        0: "০",
        January: "জানুয়ারি",
        February: "ফেব্রুয়ারি",
        March: "মার্চ",
        April: "এপ্রিল",
        May: "মে",
        June: "জুন",
        July: "জুলাই",
        August: "আগস্ট",
        September: "সেপ্টেম্বর",
        October: "অক্টোবর",
        November: "নভেম্বর",
        December: "ডিসেম্বর",
        am: "সকাল",
        pm: "দুপুর",
        Saturday: "শনিবার",
        Sunday: "রোববার",
        Monday: "সোমবার",
        Tuesday: "মঙ্গলবার",
        Wednesday: "বুধবার",
        Thursday: "বৃহস্পতিবার",
        Friday: "শুক্রবার",
        'جمادى الأولى': "জামাদিউল আউয়াল",
        'جمادى الآخرة': "জামাদিউছ ছানি",
        'رجب': "রজব",
        'شعبان': "শা’বান",
        'رمضان': "রামাজান",
        'شوال': "শাওয়াল",
        'ذو القعدة': "জুল কাইদাহ",
        'ذو الحجة': "জুল হিজ্জাহ",
        'محرم ': "মুহররম ",
        'صفر': "সফর",
        'ربيع الأول': "রবিউল আউয়াল",
        'ربيع الثاني': "রবিউছ ছানি",
    };
    let replaceString = /1|2|3|4|5|6|7|8|9|0|January|February|March|April|May|June|July|August|September|October|November|December|am|pm|Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|جمادى الأولى|جمادى الآخرة|رجب|شعبان|رمضان|شوال|ذو القعدة|ذو الحجة|محرم |ربيع الأول|صفر|ربيع الثاني/gi;
    engDate = engDate.replace(replaceString, function (matched) {
        return mapObj[matched];
    });
    return (engDate)
}

// add the code below
module.exports = { header, footer, districtTab, toBengaliNumber, banglaDateConvetar };