const dbConfig = require("../dbCon/dbConfig");
const mediaConfig = dbConfig.mediaConfig();
require('dotenv').config();

async function catPopularSectionElement(contentID) {
    try {
        const PopularNews = await mediaConfig.query( 'SELECT photo_features.PhotoFeatureID, photo_features.PhotoFeatureTitle, photo_features.Writer, photo_features.ShortBrief, photo_features.ImageBgPath, photo_features.ImageSmPath, photo_features.Caption, photo_features.ImageSource, photo_features.created_at as create_date, photo_features.updated_at as updated_date FROM photo_features JOIN photo_feature_totalhits ON photo_feature_totalhits.PhotoFeatureID=photo_features.PhotoFeatureID WHERE photo_features.PhotoFeatureID!=? AND photo_features.Deletable=1 AND photo_features.created_at>(CURDATE() - INTERVAL 1 MONTH ) ORDER BY photo_feature_totalhits.TotalHit DESC', [contentID] );

        let html = ''
        let cat1News = ''

        for (let i = 0; i < PopularNews.length; i++) {
            cat1News += `<div class="MostPopularTabList">
                <a href="${'/photo-feature/news/' + PopularNews[i].PhotoFeatureID}">
                    <div class="row">
                        <div class="col-lg-5 col-sm-4 col-5">
                            <div class="DImgZoomBlock">
                                <picture><img src="${process.env.REACT_APP_IMG_Path + PopularNews[i].ImageBgPath}" alt="${PopularNews[i].PhotoFeatureTitle}" title="${PopularNews[i].PhotoFeatureTitle}" /></picture>
                                <div class="card-video-icon"><i class="fa-solid fa-camera"></i></div>
                            </div>
                        </div>
                        <div class="col-lg-7 col-sm-8 col-7">
                            <div class="Desc">
                                <h5 class="Title">${PopularNews[i].PhotoFeatureTitle}</h5>
                            </div>
                        </div>
                    </div>
                </a>
            </div>`
        }

        html += `<div class="panel panel-default">
            <div class="panel-heading">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" role="tab"
                    aria-selected="true" href="/national#tabs-1">এই বিভাগের সর্বাধিক
                    পঠিত</a></li>
                </ul>
            </div>
            <div class="panel-body PanelHeight">
                <div class="tab-content">
                    <div class="tab-pane active" id="tabs-1" role="tabpanel">
                        <div class="DLatestNews">${cat1News}</div>
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

module.exports = { catPopularSectionElement };