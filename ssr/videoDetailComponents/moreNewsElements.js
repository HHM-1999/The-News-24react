const dbConfig = require("../dbCon/dbConfig");
const mediaConfig = dbConfig.mediaConfig();
require('dotenv').config();

async function moreNewsElement(videoID) {

    try { const contentRes = await mediaConfig.query( 'SELECT * FROM tv_webtvs WHERE Deletable=1 AND WebTVID!=? ORDER BY WebTVID DESC LIMIT 4', [videoID] );

        let cathtml = ''
        
        for (let i = 0; i < contentRes.length; i++) {
            cathtml += `<div class="col-lg-3 col-12 d-flex">
                <div class="DVideoCatListTop4List align-self-stretch">
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

        return cathtml
    }
    catch (err) { console.log('contentRes error'); return ''; }
}

module.exports = { moreNewsElement };