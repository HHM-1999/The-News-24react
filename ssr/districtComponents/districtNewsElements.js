const dbConfig = require("../dbCon/dbConfig");
const bnConfig = dbConfig.bnConfig();
require('dotenv').config();

const staticElements = require("../staticElements");

async function districtNewsElement(districtID) {

    try { const contentRes = await bnConfig.query( 'SELECT bn_contents.ContentID, bn_bas_categories.CategoryName, bn_bas_categories.Slug, bn_contents.ContentHeading, bn_contents.ContentBrief, bn_contents.ImageThumbPath, bn_contents.ImageSmPath, bn_contents.ImageBgPath, bn_contents.URLAlies, bn_contents.VideoID, bn_contents.VideoPath, bn_contents.VideoType, bn_contents.ShowVideo, bn_contents.VideoSource, bn_contents.created_at as create_date, bn_contents.updated_at as updated_date FROM bn_contents JOIN bn_positions ON bn_contents.ContentID=bn_positions.ContentID JOIN bn_bas_categories ON bn_contents.CategoryIDs=bn_bas_categories.CategoryID WHERE bn_positions.HomePosition=2 AND bn_positions.PositionType=4 AND bn_positions.ForeignID=? AND bn_positions.Position>1 AND bn_contents.Deletable=1 AND bn_contents.ShowContent=1 ORDER BY bn_positions.Position ASC LIMIT 10', [districtID] );

        let cathtml = ''
        
        for (let i = 0; i < contentRes.length; i++) {
            let fulldate = ''
            let d = new Date(contentRes[i].create_date);
            let day = d.getDate();
            if(day <= 9){ day = '0'+day}
            let month = d.getMonth()+1;
            let monthname = ''
            if(month == 0){ monthname = 'জানুয়ারি'}else if(month == 1){ monthname = 'ফেব্রুয়ারি'}else if(month == 2){ monthname = 'মার্চ'}else if(month == 3){ monthname = 'এপ্রিল'}else if(month == 4){ monthname = 'মে'}else if(month == 5){ monthname = 'জুন'}else if(month == 6){ monthname = 'জুলাই'}else if(month == 7){ monthname = 'আগস্ট'}else if(month == 8){ monthname = 'সেপ্টেম্বর'}else if(month == 9){ monthname = 'অক্টোবর'}else if(month == 10){ monthname = 'নভেম্বর'}else if(month == 11){ monthname = 'ডিসেম্বর'}
            if(month <= 9){ month = '0'+month}
            let year = d.getFullYear();
            fulldate = day+' '+monthname+' '+year

            cathtml += `<div class="col-lg-6 col-sm-12">
                <div class="Division-panel">
                    <div class="DistrictListNews">
                        <a href="${'/' + contentRes[i].Slug + '/news/' + contentRes[i].ContentID}">
                            <div class="row">
                                <div class="col-lg-5 col-sm-4 col-5 card-video-part">
                                    <div class="DImgZoomBlock">
                                        <picture><img src="${process.env.REACT_APP_IMG_Path + contentRes[i].ImageBgPath}" alt="${contentRes[i].ContentHeading}" title="${contentRes[i].ContentHeading}" /></picture>
                                        ${contentRes[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                    </div>
                                </div>
                                <div class="col-lg-7 col-sm-8 col-7">
                                    <div class="Desc">
                                        <h3 class="Title">${contentRes[i].ContentHeading}</h3>
                                    </div>
                                    <span class="DateTime"> ${staticElements.toBengaliNumber(fulldate)}</span>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>`
        }

        return cathtml
    }
    catch (err) { console.log('districtRes error'); return ''; }
}

module.exports = { districtNewsElement };