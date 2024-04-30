const dbConfig = require("../dbCon/dbConfig");
const bnConfig = dbConfig.bnConfig();
require('dotenv').config();

async function catLatestSectionElement(catID, catSlug, catTitle) {
    try {
        const latestNews = await bnConfig.query( 'SELECT bn_contents.ContentID, bn_bas_categories.CategoryID, bn_bas_categories.Slug, bn_contents.ContentHeading, bn_contents.ImageSmPath, bn_contents.ImageBgPath, bn_contents.URLAlies, bn_contents.VideoID, bn_contents.ShowVideo, bn_contents.VideoPath, bn_contents.VideoType, bn_contents.VideoSource FROM bn_contents JOIN bn_bas_categories ON bn_contents.CategoryIDs=bn_bas_categories.CategoryID WHERE FIND_IN_SET(?, bn_contents.CategoryIDs) > 0 AND bn_contents.Deletable=1 AND bn_contents.ShowContent=1 ORDER BY bn_contents.ContentID DESC LIMIT 4', [catID] );

        let html = ''
        let cat1News = ''

        for (let i = 0; i < latestNews.length; i++) {
            cat1News += `<div class="DTop3List">
                <a href="${'/' + catSlug + "/news/" + latestNews[i].ContentID}">
                    <div class="row">
                        <div class="col-lg-4 col-sm-4 col-5">
                            <div class="DImgZoomBlock">
                                <picture><img src="${process.env.REACT_APP_IMG_Path + latestNews[i].ImageSmPath}" alt="${latestNews[i].ContentHeading}" title="${latestNews[i].ContentHeading}" /></picture>
                                ${latestNews[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                            </div>
                        </div>
                        <div class="col-lg-8 col-sm-8 col-7 textBorder2">
                            <div class="Desc textBorder">
                                <h3 class="Title BGTitle">${latestNews[i].ContentHeading}</h3>
                            </div>
                        </div>
                    </div>
                </a>
            </div>`
        }

        html += `<div class="DSecTitle2">
            <h2>আজকের গুরুত্বপূর্ণ ${catTitle} খবর</h2>
        </div>
        <div class="DLeftSideNews">${cat1News}</div>`
        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

module.exports = { catLatestSectionElement };