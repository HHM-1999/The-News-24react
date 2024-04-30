const dbConfig = require("../dbCon/dbConfig");
const mediaConfig = dbConfig.mediaConfig();
require('dotenv').config();

async function videoSectionElement() {
    try {
        const videoRes = await mediaConfig.query( 'SELECT * FROM tv_webtvs WHERE Deletable=1 ORDER BY WebTVID DESC LIMIT 7' );

        let html = ''
        let cathtml1 = ''
        let cathtml2 = ''

        for (let i = 0; i < videoRes.length; i++) {
            if(i==0){
                cathtml1 += `<div class="DVideoTop">
                    <a href="${'/video/show/' + videoRes[i].WebTVID}">
                        <div class="row">
                            <div class="col-lg-8 col-12">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${'https://img.youtube.com/vi/' + videoRes[i].WebTVLinkCode + '/0.jpg'}" width="406" height="228" alt="${videoRes[i].WebTVHeading}" title="${videoRes[i].WebTVHeading}" /></picture>
                                    <div class="card-video-icon"><i class="fa-solid fa-play"></i></div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-12">
                                <div class="Desc">
                                    <h3 class="Title BGTitle">${videoRes[i].WebTVHeading}</h3>
                                    <div class="Brief">
                                        <div>${videoRes[i].Remarks}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`
            }else if(i>0 && i<7){
                cathtml2 += `<div class="col-lg-3 col-6 d-flex" key={nc.WebTVID}>
                    <div class="DVideoTop2 align-self-stretch">
                        <a href="${'/video/show/' + videoRes[i].WebTVID}">
                            <div class="DImgZoomBlock">
                                <picture><img src="${'https://img.youtube.com/vi/' + videoRes[i].WebTVLinkCode + '/0.jpg'}" width="299" height="168" alt="${videoRes[i].WebTVHeading}" title="${videoRes[i].WebTVHeading}" /></picture>
                                <div class="card-video-icon"><i class="fa-solid fa-play"></i></div>
                            </div>
                            <div class="Desc">
                                <h3 class="Title">${videoRes[i].WebTVHeading}</h3>
                            </div>
                        </a>
                    </div>
                </div>`
            }else{ break; }
        }

        html += `<div class="VideoSection mt-5">
            <div class="container">
                <div class="SectionSBorder2">
                    <div class="SPSecTitle">
                        <a href="/video">
                            <h2>ভিডিও</h2>
                        </a>
                    </div>
                </div>
                <div class="DVideoTopArea">
                    <div class="row">
                        <div class="col-lg-6 col-12">${cathtml1}</div>
                        ${cathtml2}
                    </div>
                </div>
            </div>
        </div>`
        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

module.exports = { videoSectionElement };