const dbConfig = require("../dbCon/dbConfig");
const mediaConfig = dbConfig.mediaConfig();
require('dotenv').config();

async function moreNewsSectionElement(contentIDs) {
    try {
        const moreNewsRes = await mediaConfig.query( 'SELECT photo_features.PhotoFeatureID, photo_features.PhotoFeatureTitle, photo_features.Writer, photo_features.ShortBrief, ImageBgPath, ImageSmPath, Caption, ImageSource, photo_features.created_at as create_date, photo_features.updated_at as updated_date FROM photo_features WHERE photo_features.Deletable=1 AND photo_features.PhotoFeatureID NOT IN (?) ORDER BY photo_features.PhotoFeatureID DESC LIMIT 8 OFFSET 0', [contentIDs] );

        let html = ''

        for (let i = 0; i < moreNewsRes.length; i++) {
            html += `<div class="col-lg-6 col-12 d-flex">
                <div class="DCatNewsList align-self-stretch">
                    <a href="${'/photo-feature/news/' + moreNewsRes[i].PhotoFeatureID}">
                        <div class="row">
                            <div class="col-lg-5 col-sm-4 col-5">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + moreNewsRes[i].ImageBgPath}" alt="${moreNewsRes[i].PhotoFeatureTitle}" title="${moreNewsRes[i].PhotoFeatureTitle}" /></picture>
                                    <div class="card-video-icon"><i class="fa-solid fa-camera"></i></div>
                                </div>
                            </div>
                            <div class="col-lg-7 col-sm-8 col-7">
                                <div class="Desc">
                                    <h3 class="Title">${moreNewsRes[i].PhotoFeatureTitle}</h3>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>`
        }
        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

module.exports = { moreNewsSectionElement };