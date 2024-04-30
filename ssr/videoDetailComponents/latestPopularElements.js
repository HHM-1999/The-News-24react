const dbConfig = require("../dbCon/dbConfig");
const mediaConfig = dbConfig.mediaConfig();
require('dotenv').config();

async function latestSectionElement(categoryID) {
    try {
        const latestRes = await mediaConfig.query( 'SELECT * FROM tv_webtvs WHERE tv_webtvs.Deletable=1 AND tv_webtvs.CategoryID=? LIMIT 10', [categoryID] );

        let html = ''
        for (let i = 0; i < latestRes.length; i++) {
            html += `<div class="MostPopularTabList">
                <a href="${'/video/show/' + latestRes[i].WebTVID}">
                    <div class="row mx-0">
                        <div class="col-lg-5 col-sm-4 col-5">
                            <div class="DImgZoomBlock">
                                <picture><img src="${'https://img.youtube.com/vi/' + latestRes[i].WebTVLinkCode + '/maxresdefault.jpg'}" alt="${latestRes[i].WebTVHeading}" title="${latestRes[i].WebTVHeading}" /></picture>
                                <div class="card-videoGallery-icon"><i class="fa-solid fa-play"></i></div>
                            </div>
                        </div>
                        <div class="col-lg-7 col-sm-8 col-7">
                            <div class="Desc">
                                <h5 class="Title">${latestRes[i].WebTVHeading}</h5>
                            </div>
                        </div>
                    </div>
                </a>
            </div>`
        }
        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

async function popularSectionElement(categoryID) {
    try {
        const popularRes = await mediaConfig.query( 'SELECT * FROM tv_webtvs JOIN video_totalhits ON video_totalhits.VideoID=tv_webtvs.WebTVID WHERE tv_webtvs.Deletable=1 AND tv_webtvs.CategoryID=? ORDER BY video_totalhits.TotalHit DESC LIMIT 10', [categoryID] );

        let html = ''
        for (let i = 0; i < popularRes.length; i++) {
            html += `<div class="MostPopularTabList">
                <a href="${'/video/show/' + popularRes[i].WebTVID}">
                    <div class="row mx-0">
                        <div class="col-lg-5 col-sm-4 col-5">
                            <div class="DImgZoomBlock">
                                <picture><img src="${'https://img.youtube.com/vi/' + popularRes[i].WebTVLinkCode + '/maxresdefault.jpg'}" alt="${popularRes[i].WebTVHeading}" title="${popularRes[i].WebTVHeading}" /></picture>
                                <div class="card-videoGallery-icon"><i class="fa-solid fa-play"></i></div>
                            </div>
                        </div>
                        <div class="col-lg-7 col-sm-8 col-7">
                            <div class="Desc">
                                <h5 class="Title">${popularRes[i].WebTVHeading}</h5>
                            </div>
                        </div>
                    </div>
                </a>
            </div>`
        }
        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

async function latestPopularSectionElement(categoryID, catSlug) {
    let latestComponent;
    try { latestComponent = await latestSectionElement(categoryID); }
    catch (err) { console.log('latestComponent error'); return ''; }

    let popularComponent;
    try { popularComponent = await popularSectionElement(categoryID); }
    catch (err) { console.log('popularComponent error'); return ''; }

    let html = `<section class="DLPSTab2">
        <div class="panel panel-default">
            <div class="panel-heading">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-bs-toggle="tab" role="tab"
                            aria-selected="true" href="#tabs-1">সর্বশেষ</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" role="tab" aria-selected="false"
                            href="#tabs-2">পাঠকপ্রিয়</a>
                    </li>
                </ul>
            </div>
            <div class="panel-body PanelHeight">
                <div class="tab-content">
                    <div class="tab-pane active" id="tabs-1" role="tabpanel">
                        <div class="DLatestNews">${latestComponent}</div>
                    </div>
                    <div class="tab-pane" id="tabs-2" role="tabpanel">
                        <div class="DLatestNews">${popularComponent}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="allnews"><a href="${'/video/cat/' + catSlug}">সব খবর <i class="fa-solid fa-angles-right"></i></a>
        </div>
    </section>`
    return html;
}

module.exports = { latestPopularSectionElement };