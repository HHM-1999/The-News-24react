const dbConfig = require("../dbCon/dbConfig");
const bnConfig = dbConfig.bnConfig();
require('dotenv').config();

async function eventElement() {
    try {
        const activeEventRes = await bnConfig.query( 'SELECT * FROM bn_events WHERE Deletable=1 ORDER BY EventID DESC LIMIT 1' );
        // console.log(activeEventRes);
        if (activeEventRes.length > 0) {
            let activeEvent = activeEventRes[0]
            let orderBySerial = [2,3,4,5,6,7,8,9,10,11,1];
            let sql = `SELECT bn_contents.ContentID, bn_bas_categories.CategoryID, bn_bas_categories.Slug, bn_bas_categories.CategoryName, bn_contents.ContentHeading, bn_contents.ContentBrief, bn_contents.ImageThumbPath, bn_contents.ImageSmPath, bn_contents.ImageBgPath, bn_contents.URLAlies, bn_contents.VideoID, bn_contents.VideoPath, bn_contents.ShowVideo, bn_contents.VideoType, bn_contents.VideoSource, bn_contents.created_at FROM bn_contents JOIN bn_positions ON bn_contents.ContentID=bn_positions.ContentID JOIN bn_bas_categories ON bn_contents.CategoryIDs=bn_bas_categories.CategoryID WHERE bn_positions.HomePosition=1 AND bn_positions.PositionType=5 AND bn_positions.ForeignID=${activeEvent.EventID} AND bn_contents.Deletable=1 AND bn_contents.ShowContent=1 ORDER BY FIELD(bn_positions.Position, ${orderBySerial}), bn_contents.ContentID DESC LIMIT 9`;
            const eventNews = await bnConfig.query( sql );
            // console.log(eventNews);

            let html = ''
            let eventhtml1 = ''
            let eventhtml2 = ''
            let eventhtml3 = ''
            for (let i = 0; i < eventNews.length; i++) {
                if(i==0){
                    eventhtml1 = `<div class="col-lg-6 col-12">
                        <div class="DCountryTop align-self-stretch">
                            <a href="${'/' + eventNews[i].Slug + '/news/' + eventNews[i].ContentID}">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + eventNews[i].ImageBgPath}" alt="${eventNews[i].ContentHeading}" title="${eventNews[i].ContentHeading}" /></picture>
                                    ${eventNews[i].ShowVideo === 1 ? '<div class="card-video-iconTop"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                                <div class="Desc">
                                    <h3 class="Title BGTitle">${eventNews[i].ContentHeading}</h3>
                                </div>
                            </a>
                        </div>
                    </div>`
                }else if(i>0 && i<5){
                    eventhtml2 += `<div class="DCountryList">
                        <a href="${'/' + eventNews[i].Slug + '/news/' + eventNews[i].ContentID}">
                            <div class="row">
                                <div class="col-lg-5 col-sm-4 col-5">
                                    <div class="DImgZoomBlock">
                                        <picture><img src="${process.env.REACT_APP_IMG_Path + eventNews[i].ImageThumbPath}" alt="${eventNews[i].ContentHeading}" title="${eventNews[i].ContentHeading}" /></picture>
                                        ${eventNews[i].ShowVideo === 1 ? '<div class="card-video-iconTop"><i class="fa-solid fa-play"></i></div>' : ''}
                                    </div>
                                </div>
                                <div class="col-lg-7 col-sm-8 col-7 textBorder2">
                                    <div class="Desc textBorder">
                                        <h3 class="Title">${eventNews[i].ContentHeading}</h3>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>`
                }else if(i>5 && i<9){
                    eventhtml3 += `<div class="DCountryList leftSide">
                        <a href="${'/' + eventNews[i].Slug + '/news/' + eventNews[i].ContentID}">
                            <div class="row">
                                <div class="col-lg-5 col-sm-4 col-5">
                                    <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + eventNews[i].ImageThumbPath}" alt="${eventNews[i].ContentHeading}" title="${eventNews[i].ContentHeading}" /></picture>
                                    ${eventNews[i].ShowVideo === 1 ? '<div class="card-video-iconTop"><i class="fa-solid fa-play"></i></div>' : ''}
                                    </div>
                                </div>
                                <div class="col-lg-7 col-sm-8 col-7 textBorder2 order-lg-first">
                                    <div class="Desc textBorder">
                                        <h3 class="Title">${eventNews[i].ContentHeading}</h3>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>`
                }else{ break; }
            }
            html += `<div class="EventTop">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 text-center text-white">
                            <h5 class='fs-4 mb-3'>${activeEvent.EventTitle}</h5>
                        </div>
                    </div>
                    <div class="row">
                        ${eventhtml1}
                        <div class="col-lg-3 col-12 order-lg-first">
                            <div class="DCountry">
                                ${eventhtml2}
                            </div>
                        </div>
                        <div class="col-lg-3 col-12">
                            <div class="DCountry">
                                ${eventhtml3}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
            return html;
            // return eventNews
        }else{
            return '';
        }
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

module.exports = { eventElement };