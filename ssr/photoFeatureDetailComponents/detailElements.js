const dbConfig = require("../dbCon/dbConfig");
const mediaConfig = dbConfig.mediaConfig();
require('dotenv').config();

async function detailSectionElement(contentID) {
    try {
        const featuerImages = await mediaConfig.query( 'SELECT * FROM featuer_images WHERE PhotoFeatureID=? ORDER BY PhotoFeatureID ASC', [contentID] );
        
        let html = ''
        
        for (let i = 0; i < featuerImages.length; i++) {
            html+=`<div class="DFeatureImg page-break">
                <div class="DImgZoomBlock DetailsPF" style="display: flex; align-items: center; justify-content: center; cursor: pointer;">
                    <img src="${process.env.REACT_APP_IMG_Path + featuerImages[i].ImageBgPath}" alt="${featuerImages[i].Caption}" title="${featuerImages[i].Caption}" />
                    <span class='DFeatureIcon'><i class="fa-solid fa-expand"></i></span>
                </div>
                <div class="DetailsTopBrief">
                    <p class="DTopImgCaption">${featuerImages[i].Caption} ${featuerImages[i].ImageSource ? '<span class="DImgSource"><i class="fa-sharp fa-solid fa-grip-lines-vertical"></i> ছবি: '+featuerImages[i].ImageSource+'</span>' : ''}</p>
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

module.exports = { detailSectionElement };