const dbConfig = require("./dbCon/dbConfig");
const mediaConfig = dbConfig.mediaConfig();
require('dotenv').config();

const latestPopularSectionElements = require("./categoryComponents/latestPopularElements");

async function liveElement() {
    let latestPopularComponent;
    try { latestPopularComponent = await latestPopularSectionElements.latestPopularSectionElement(); }
    catch (err) { console.log('latestPopularComponent error'); return ''; }

    try { const liveRes = await mediaConfig.query( 'SELECT * FROM web_lives WHERE Deletable=1 ORDER BY WebLiveID DESC LIMIT 1' );
        let elements = `<main>
            <h2 class="DTitle">
                <a href="#">
                    <span class="DTitleInner"><span class="DTitleInnerBar"><span>লাইভ</span></span></span>
                </a>
            </h2>
            <div class="container">
                <div class="DVideoDetailsArea my-5">
                    <div class="row">
                        <div class="col-lg-8 col-12 border-right-inner">`
                            if(liveRes.length>0){
                                elements += `<h1 class="Title BGTitle fw-bold mb-2" style="font-size: 26px; line-height: 38px;">${liveRes[0].WebTVHeading}</h1>
                                <div class="DVideoDetailsFrame">
                                    <div class="col-sm-12 video-container">
                                        <iframe class="embed-responsive-item" title="youtube-video" src="https://www.youtube.com/embed/${liveRes[0].WebTVLinkCode}?autoplay=1&mute=1" frameBorder="0" webkitallowfullscreen='true' mozallowfullscreen='true' allowFullScreen></iframe>
                                    </div>
                                </div>`
                            }
                        elements +=`</div>
                        <div class="col-lg-4 col-12 live">${latestPopularComponent}</div>
                    </div>
                </div>
            </div>
        </main>`

        return elements
    }
    catch (err) { console.log('liveRes error'); return ''; }
}

module.exports = { liveElement };