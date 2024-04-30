const dbConfig = require("../dbCon/dbConfig");
const mediaConfig = dbConfig.mediaConfig();
require('dotenv').config();

const popularElements = require("./popularElements");

async function contentElement(categoryID) {
    let popularComponent;
    try { popularComponent = await popularElements.popularElement(categoryID); }
    catch (err) { console.log('popularComponent error'); return ''; }

    try {
        let idsForOrder = [2,3,4,5,6,7,8,9,10,11,1];
        const contentRes = await mediaConfig.query( 'SELECT tv_webtvs.WebTVID, tv_webtv_categories.CategoryID, tv_webtv_categories.Slug  as CategorySlug, tv_webtv_categories.CategoryName, tv_webtvs.WebTVHeading, tv_webtvs.WebTVHeadingEn, tv_webtvs.WebTVType, tv_webtvs.WebTVLinkCode, tv_webtvs.SourceType, tv_webtvs.Footage, tv_webtvs.TopHome, tv_webtvs.TopInner, tv_webtvs.TodayHighlight, tv_webtvs.Remarks, tv_webtvs.Deletable, tv_webtvs.created_at, tv_webtvs.updated_at, tv_webtv_positions.Position FROM tv_webtvs JOIN tv_webtv_positions ON tv_webtvs.WebTVID=tv_webtv_positions.ContentID JOIN tv_webtv_categories ON tv_webtv_positions.ForeignID=tv_webtv_categories.CategoryID WHERE tv_webtv_positions.HomePosition=2 AND tv_webtv_positions.PositionType=1 AND tv_webtv_positions.ForeignID=? AND tv_webtvs.Deletable=1 ORDER BY FIELD(tv_webtv_positions.Position, ?), tv_webtvs.WebTVID DESC LIMIT 14', [categoryID, idsForOrder] );

        let html = ''
        let leadhtml1 = ''
        let leadhtml2 = ''
        let leadhtml3 = ''
        let leadhtml4 = ''

        for (let i = 0; i < contentRes.length; i++) {
            if(i==0){
                leadhtml1 = `<div class="DVideoCatTopInner align-self-stretch">
                    <a href="${'/video/show/' + contentRes[i].WebTVID}">
                        <div class="DImgZoomBlock">
                            <picture><img src="${'https://img.youtube.com/vi/' + contentRes[i].WebTVLinkCode + '/maxresdefault.jpg'}" alt="${contentRes[i].WebTVHeading}" title="${contentRes[i].WebTVHeading}" /></picture>
                            <div class="card-videoGallery-icon"><i class="fa-solid fa-play"></i></div>
                        </div>
                        <div class="Desc">
                            <h3 class="Title BGTitle">${contentRes[i].WebTVHeading}</h3>
                            <div class="Brief">
                                <div>${contentRes[i].Remarks}</div>
                            </div>
                        </div>
                    </a>
                </div>`
            }else if(i>0 && i<3){
                leadhtml2 += `<div class="DVideoCatListTop2List align-self-stretch">
                    <a href="${'/video/show/' + contentRes[i].WebTVID}">
                        <div class="row">
                            <div class="col-lg-12 col-sm-4 col-5">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${'https://img.youtube.com/vi/' + contentRes[i].WebTVLinkCode + '/maxresdefault.jpg'}" alt="${contentRes[i].WebTVHeading}" title="${contentRes[i].WebTVHeading}" /></picture>
                                    <div class="card-videoGallery-icon"><i class="fa-solid fa-play"></i></div>
                                </div>
                            </div>
                            <div class="col-lg-12 col-sm-8 col-7 textBorder2">
                                <div class="Desc">
                                    <h3 class="Title">${contentRes[i].WebTVHeading}</h3>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`
            }else if(i>=3 && i<6){
                leadhtml3 += `<div class="col-lg-4 col-12 d-flex border-right-inner">
                    <div class="DVideoTop2InnerList align-self-stretch">
                        <a href="${'/video/show/' + contentRes[i].WebTVID}">
                            <div class="row">
                                <div class="col-lg-12 col-sm-4 col-5">
                                    <div class="DImgZoomBlock">
                                        <picture><img src="${'https://img.youtube.com/vi/' + contentRes[i].WebTVLinkCode + '/maxresdefault.jpg'}" alt="${contentRes[i].WebTVHeading}" title="${contentRes[i].WebTVHeading}" /></picture>
                                        <div class="card-videoGallery-icon"><i class="fa-solid fa-play"></i></div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-sm-8 col-7 textBorder2">
                                    <div class="Desc">
                                        <h3 class="Title">${contentRes[i].WebTVHeading}</h3>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`
            }else if(i>=6){
                leadhtml4 += `<div class="col-lg-3 col-12 d-flex">
                    <div class="DVideoTop2InnerList align-self-stretch">
                        <a href="${'/video/show/' + contentRes[i].WebTVID}">
                            <div class="row">
                                <div class="col-lg-12 col-sm-4 col-5">
                                    <div class="DImgZoomBlock">
                                        <picture><img src="${'https://img.youtube.com/vi/' + contentRes[i].WebTVLinkCode + '/maxresdefault.jpg'}" alt="${contentRes[i].WebTVHeading}" title="${contentRes[i].WebTVHeading}" /></picture>
                                        <div class="card-videoGallery-icon"><i class="fa-solid fa-play"></i></div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-sm-8 col-7 textBorder2">
                                    <div class="Desc">
                                        <h3 class="Title">${contentRes[i].WebTVHeading}</h3>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`
            }
        }

        html += `<div class="DVideoTopArea">
            <div class="row">
                <div class="col-lg-8 col-12 border-right-inner">
                    <div class="row">
                        <div class="col-lg-8 col-12 d-flex border-right-inner">${leadhtml1}</div>
                        <div class="col-lg-4 col-12">${leadhtml2}</div>
                    </div>
                    <div class="DVideoCategoryTop border-top-inner">
                        <div class="row">${leadhtml3}</div>
                    </div>
                </div>
                <div class="col-lg-4 col-12 VCAT">${popularComponent}</div>
            </div>
        </div>
        <div class="DVideoCategoryBottom">
            <div class="row mt-5">${leadhtml4}</div>
        </div>`

        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

module.exports = { contentElement };