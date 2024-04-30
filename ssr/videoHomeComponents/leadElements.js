const dbConfig = require("../dbCon/dbConfig");
const mediaConfig = dbConfig.mediaConfig();
require('dotenv').config();

async function leadElement() {
    try { const leadRes = await mediaConfig.query( 'SELECT * FROM tv_webtvs WHERE Deletable=1 ORDER BY WebTVID DESC LIMIT 4' );

        let html = ''
        let cathtml1 = ''
        let cathtml2 = ''

        for (let i = 0; i < leadRes.length; i++) {
            if(i==0){
                cathtml1 += `<div class="DVideoTopInner">
                    <a href="${'/video/show/' + leadRes[i].WebTVID}">
                        <div class="row">
                            <div class="col-lg-8 col-12">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${'https://img.youtube.com/vi/' + leadRes[i].WebTVLinkCode + '/maxresdefault.jpg'}" alt="${leadRes[i].WebTVHeading}" title="${leadRes[i].WebTVHeading}" /></picture>
                                    <div class="card-videoGallery-icon"><i class="fa-solid fa-play"></i></div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="Desc">
                                    <div class="NewsTitle">
                                        <h3 class="Title">${leadRes[i].WebTVHeading}</h3>
                                    </div>
                                    <div class="Brief">
                                        <div>${leadRes[i].Remarks }</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`
            }else if(i>0){
                cathtml2 += `<div class="col-lg-4 col-12 border-right-inner">
                    <div class="DVideoTop2InnerList align-self-stretch">
                        <a href="${'/video/show/' + leadRes[i].WebTVID}">
                            <div class="row">
                                <div class="col-lg-12 col-sm-4 col-5">
                                    <div class="DImgZoomBlock">
                                        <picture><img src="${'https://img.youtube.com/vi/' + leadRes[i].WebTVLinkCode + '/maxresdefault.jpg'}" alt="${leadRes[i].WebTVHeading}" title="${leadRes[i].WebTVHeading}" /></picture>
                                        <div class="card-videoGallery-icon"><i class="fa-solid fa-play"></i></div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-sm-8 col-7 textBorder2">
                                    <div class="Desc">
                                        <h3 class="Title">${leadRes[i].WebTVHeading}</h3>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`
            }else{break;}
        }

        html += `<div class="col-lg-8 col-12 border-right-inner">
            ${cathtml1}
            <div class="DVideoTop2Inner border-top-inner">
                <div class="row">${cathtml2}</div>
            </div>
        </div>`

        return html
    }
    catch (err) { console.log('leadRes error'); return ''; }
}

module.exports = { leadElement };