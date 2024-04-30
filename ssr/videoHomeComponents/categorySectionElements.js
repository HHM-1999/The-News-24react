const dbConfig = require("../dbCon/dbConfig");
const mediaConfig = dbConfig.mediaConfig();
require('dotenv').config();

async function categorySectionElement() {

    try { const categoryRes = await mediaConfig.query( 'SELECT * FROM tv_webtv_categories WHERE tv_webtv_categories.Deletable=1' );

        let cathtml = ''
        let orderArr = [2,3,4,5,6,7,8,9,10,11,1]
        
        for (let i = 0; i < categoryRes.length; i++) {
            let contentRes = await mediaConfig.query( 'SELECT * FROM tv_webtvs JOIN tv_webtv_positions ON tv_webtvs.WebTVID=tv_webtv_positions.ContentID WHERE tv_webtv_positions.HomePosition=2 AND tv_webtv_positions.ForeignID=? ORDER BY FIELD(tv_webtv_positions.Position, ?) LIMIT 5', [categoryRes[i].CategoryID, orderArr] );
            let contenthtml1 = ''
            let contenthtml2 = ''

            for (let j = 0; j < contentRes.length; j++) {
                if(j==0){
                    contenthtml1+=`<div class="VideoGalleryTop">
                        <a href="${"/video/show/" + contentRes[j].WebTVID}">
                            <div class="DImgZoomBlock">
                                <picture><img src="${'https://img.youtube.com/vi/' + contentRes[j].WebTVLinkCode + '/hqdefault.jpg'}" alt="${contentRes[j].WebTVHeading}" title="${contentRes[j].WebTVHeading}" /></picture>
                                <div class="card-videoGallery-icon"><i class="fa-solid fa-play"></i></div>
                            </div>
                            <div class="Desc">
                                <h3 class="Title BGTitle">${contentRes[j].WebTVHeading}</h3>
                                <div class="Brief">
                                    <div>${contentRes[j].Remarks}</div>
                                </div>
                            </div>
                        </a>
                    </div>`
                }else if(j>0){
                    contenthtml2+=`<div class="col-lg-6 col-12 d-flex">
                        <div class="VideoGalleryList align-self-stretch">
                            <a href="${'/video/show/' + contentRes[j].WebTVID}">
                                <div class="row">
                                    <div class="col-lg-12 col-sm-4 col-5">
                                        <div class="DImgZoomBlock">
                                            <picture><img src="${'https://img.youtube.com/vi/' + contentRes[j].WebTVLinkCode + '/hqdefault.jpg'}" alt="${contentRes[j].WebTVHeading}" title="${contentRes[j].WebTVHeading}" /></picture>
                                            <div class="card-videoGallery-icon"><i class="fa-solid fa-play"></i></div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 col-sm-8 col-7 textBorder2">
                                        <div class="Desc">
                                            <h3 class="Title">${contentRes[j].WebTVHeading}</h3>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>`
                }else{break;}
            }

            cathtml += `<div class="row mt-5">
                <div class="col-lg-12 col-12">
                    <div class="SectionSBorder2">
                        <div class="SPSecTitle">
                            <a href="${'/video/cat/' + categoryRes[i].Slug}">
                                <h2>${categoryRes[i].CategoryName}</h2>
                            </a>
                        </div>
                    </div>
                    <div class="VideoGallery">
                        <div class="row">
                            <div class="col-lg-6 col-12">${contenthtml1}</div>
                            <div class="col-lg-6 col-12"><div class="row">${contenthtml2}</div></div>
                        </div>
                    </div>
                </div>
            </div>`
        }

        return cathtml
    }
    catch (err) { console.log('categoryRes error'); return ''; }
}

module.exports = { categorySectionElement };