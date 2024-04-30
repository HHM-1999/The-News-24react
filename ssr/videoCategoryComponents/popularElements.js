const dbConfig = require("../dbCon/dbConfig");
const mediaConfig = dbConfig.mediaConfig();
require('dotenv').config();

async function popularElement(categoryID) {
    try { const popularRes = await mediaConfig.query( 'SELECT * FROM tv_webtvs JOIN video_totalhits ON video_totalhits.VideoID=tv_webtvs.WebTVID WHERE tv_webtvs.Deletable=1 AND CategoryID=? AND created_at >= (CURDATE() - INTERVAL 1 MONTH ) ORDER BY video_totalhits.TotalHit DESC LIMIT 10', [categoryID] );

        let html = ''
        let cathtml1 = ''

        for (let i = 0; i < popularRes.length; i++) {
            cathtml1 += `<div class="MostPopularTabList">
                <a href="${'/video/show/' + popularRes[i].WebTVID}">
                    <div class="row">
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

        html += `<section class="MostPopularTab">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" role="tab"
                            aria-selected="true" href="#tabs-1">জনপ্রিয় ভিডিও</a></li>
                    </ul>
                </div>
                <div class="panel-body PanelHeight">
                    <div class="tab-content">
                        <div class="tab-pane active" id="tabs-1" role="tabpanel">
                            <div class="DLatestNews">${cathtml1}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>`

        return html
    }
    catch (err) { console.log('popularRes error'); return ''; }
}

module.exports = { popularElement };