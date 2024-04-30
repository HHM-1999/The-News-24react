const dbConfig = require("./dbCon/dbConfig");
const bnConfig = dbConfig.bnConfig();
require('dotenv').config();

const latestPopularElements = require("./categoryComponents/latestPopularElements");

async function tagDetailElement(tagName, tagImage, tagDesc) {
    try {
        let sql = 'SELECT bn_contents.ContentID, bn_bas_categories.CategoryID, bn_bas_categories.Slug, bn_bas_categories.CategoryName, bn_contents.ContentHeading, bn_contents.ContentBrief, bn_contents.ImageThumbPath, bn_contents.ImageSmPath, bn_contents.ImageBgPath, bn_contents.URLAlies, bn_contents.VideoID, bn_contents.VideoPath, bn_contents.VideoType, bn_contents.ShowVideo, bn_contents.VideoSource, bn_contents.created_at FROM bn_contents JOIN bn_bas_categories ON bn_contents.CategoryIDs=bn_bas_categories.CategoryID WHERE bn_contents.Deletable=1 AND bn_contents.ShowContent=1 AND FIND_IN_SET(?, bn_contents.Tags) ORDER BY bn_contents.ContentID DESC LIMIT 10'
        const contentRes = await bnConfig.query( sql, [tagName] );

        let cathtml = ''

        for (let i = 0; i < contentRes.length; i++) {
            cathtml += `<div class="col-lg-6 col-sm-12">
                <div class="archiveListNews" >
                    <a href="${'/' + contentRes[i].Slug + '/news/' + contentRes[i].ContentID}">
                        <div class="row">
                            <div class="col-sm-4 col-5 card-video-part">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + contentRes[i].ImageSmPath}" alt="${contentRes[i].ContentHeading}" title="${contentRes[i].ContentHeading}" /></picture>
                                    ${contentRes[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                            </div>
                            <div class="col-sm-8 col-7">
                                <div class="Desc">
                                    <h3 class="Title BGTitle">${contentRes[i].ContentHeading}</h3>
                                    <div class="Brief">
                                        <div>${contentRes[i].ContentBrief}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>`
        }

        let elements = `<main>
            <div class="container">
                <div class="TopHomeSection"></div>
                <div class="DTagLead">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="DTagName">
                                <i class="fa-solid fa-tags"></i>
                                <h1>${tagName}</h1>
                            </div>
                        </div>
                    </div>
                    <div class="row">`
        if(tagImage){
            elements += `<div class="col-lg-2 col-sm-4 col-5">
                <img src="${process.env.REACT_APP_IMG_Tag + tagImage}" alt="${tagName}" title="${tagName}" class="img-fluid img100" />
            </div>
            <div class="col-lg-10 col-sm-8 col-7">
                <div class="Desc">
                    <h2 class="Title">${tagName}</h2>
                    <div>${tagDesc}</div>
                    <div class="Brief">
                        <p>${tagDesc}</p>
                    </div>
                    <div class="DSocialTop">
                    </div>
                </div>
            </div>`
        }else{
            elements += `<div class="col-12">
                <div class="Desc">
                    <h2 class="Title">${tagName}</h2>
                    <div class="DSocialTop"></div>
                </div>
            </div>`
        }
        elements += `</div></div>
            <div class="row">
                ${cathtml}
                <div id="btnDiv" class="text-center my-4">
                    <button type="submit" name="btnSubmit" class="btn btn-lg btn-block ButtonBG">আরো পড়ুন</button>
                </div>
            </div></div>
        </main>`

        return elements
    }
    catch (err) { console.log('contentRes error'); return ''; }
}

module.exports = { tagDetailElement };