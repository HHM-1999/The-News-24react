const dbConfig = require("../dbCon/dbConfig");
const bnConfig = dbConfig.bnConfig();
require('dotenv').config();

async function districtNewsElement(divisionID, divisionSlug) {

    try { const divisionRes = await bnConfig.query( 'SELECT * FROM bas_districts WHERE DivisionID=?', [divisionID] );

        let cathtml = ''
        
        for (let i = 0; i < divisionRes.length; i++) {
            let contentRes = await bnConfig.query( 'SELECT bn_contents.ContentID, bn_bas_categories.CategoryName, bn_bas_categories.Slug, bn_contents.ContentHeading, bn_contents.ContentBrief, bn_contents.ImageThumbPath, bn_contents.ImageSmPath, bn_contents.ImageBgPath, bn_contents.URLAlies, bn_contents.VideoID, bn_contents.VideoPath, bn_contents.VideoType, bn_contents.ShowVideo, bn_contents.VideoSource, bn_contents.created_at as create_date, bn_contents.updated_at as updated_date FROM bn_contents JOIN bn_positions ON bn_contents.ContentID=bn_positions.ContentID JOIN bn_bas_categories ON bn_contents.CategoryIDs=bn_bas_categories.CategoryID WHERE bn_positions.HomePosition=2 AND bn_positions.PositionType=4 AND bn_positions.ForeignID=? AND bn_positions.Position>1 AND bn_contents.Deletable=1 AND bn_contents.ShowContent=1 ORDER BY bn_positions.Position ASC LIMIT 5', [divisionRes[i].DistrictID] );
            let contenthtml1 = ''
            let contenthtml2 = ''

            for (let j = 0; j < contentRes.length; j++) {
                if(j==0){
                    contenthtml1+=`<div class="DivisionLeadNews">
                        <a href="${'/' + contentRes[j].Slug + '/news/' + contentRes[j].ContentID}">
                            <div class="DImgBlock card-video-part">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + contentRes[j].ImageBgPath}" alt="${contentRes[j].ContentHeading}" title="${contentRes[j].ContentHeading}" /></picture>
                                    ${contentRes[j].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                            </div>
                            <div class="Desc">
                                <h2 class="Title">${contentRes[j].ContentHeading}</h2>
                            </div>
                        </a>
                    </div>`
                }else if(j>0){
                    contenthtml2+=`<div class="DivisionListNews">
                        <a href="${'/' + contentRes[j].Slug + '/news/' + contentRes[j].ContentID}">
                            <div class="Desc">
                                <h3 class="Title">
                                    ${contentRes[j].ContentHeading}
                                </h3>
                            </div>
                        </a>
                    </div>`
                }else{break;}
            }

            cathtml += `<div class="col-lg-4 col-sm-12">
                <div class="Division-panel">
                    <div class="DivisionHeader">
                        <a href="${'/divisions/' + divisionSlug + '/' + divisionRes[i].DistrictSlug}">
                            ${divisionRes[i].DistrictNameBn}
                        </a>
                    </div>
                    <div class="DivisionBody">
                        ${contenthtml1}
                        ${contenthtml2}
                    </div>
                </div>
            </div>`
        }

        return cathtml
    }
    catch (err) { console.log('divisionRes error'); return ''; }
}

module.exports = { districtNewsElement };