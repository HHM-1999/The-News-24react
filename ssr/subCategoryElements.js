const dbConfig = require("./dbCon/dbConfig");
const bnConfig = dbConfig.bnConfig();
require('dotenv').config();

const ldJsonElements = require("./subCategoryComponents/ldJsonElements");
const latestPopularSectionElements = require("./categoryComponents/latestPopularElements");
const moreNewsSectionElements = require("./subCategoryComponents/moreNewsElements");

async function subCategoryElement(catSlug, catTitle, subCatID, subCatSlug, subCatTitle) {
    let ldJsonComponent;
    try { ldJsonComponent = await ldJsonElements.ldJsonElement(catSlug, catTitle, subCatSlug, subCatTitle); }
    catch (err) { console.log('ldJsonComponent error'); return ''; }

    let leadComponent;
    let leadContentIDs = [];
    try { const leadNewsRes = await bnConfig.query( 'SELECT bn_contents.ContentID, bn_bas_categories.CategoryID, bn_bas_categories.CategoryName, bn_bas_categories.Slug, bn_contents.ContentHeading, bn_contents.ContentBrief, bn_contents.ImageThumbPath, bn_contents.ImageSmPath, bn_contents.ImageBgPath, bn_contents.URLAlies, bn_contents.VideoID, bn_contents.ShowVideo, bn_contents.VideoPath, bn_contents.VideoType, bn_contents.VideoSource, bn_contents.created_at FROM bn_contents JOIN bn_positions ON bn_contents.ContentID=bn_positions.ContentID JOIN bn_bas_categories ON bn_positions.ForeignID=bn_bas_categories.CategoryID WHERE bn_positions.HomePosition=2 AND bn_positions.PositionType=2 AND bn_positions.ForeignID=? AND bn_positions.Position>1 AND bn_contents.Deletable=1 AND bn_contents.ShowContent=1 ORDER BY bn_positions.Position ASC LIMIT 5', [subCatID] );

        let html = ''
        let cathtml1 = ''
        let cathtml2 = ''
        let cathtml3 = ''

        for (let i = 0; i < leadNewsRes.length; i++) {
            if(i==0){
                cathtml1 += `<div class="DCatLeadTop">
                    <a href="${'/' + catSlug + '/news/' + leadNewsRes[i].ContentID}">
                        <div class="row">
                            <div class="col-lg-8 col-12">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + leadNewsRes[i].ImageBgPath}" alt="${leadNewsRes[i].ContentHeading}" title="${leadNewsRes[i].ContentHeading}" /></picture>
                                    ${leadNewsRes[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                            </div>
                            <div class="col-lg-4 col-12">
                                <div class="Desc">
                                    <h3 class="Title BGTitle">${leadNewsRes[i].ContentHeading}</h3>
                                    <div class="Brief">
                                        <p>${leadNewsRes[i].ContentBrief}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`
            }else if(i==1){
                cathtml2 += `<div class="DCatTop2 align-self-stretch">
                    <a href="${'/' + catSlug + '/news/' + leadNewsRes[i].ContentID}">
                        <div class="row">
                            <div class="col-lg-12 col-sm-4 col-5">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + leadNewsRes[i].ImageSmPath}" alt="${leadNewsRes[i].ContentHeading}" title="${leadNewsRes[i].ContentHeading}" /></picture>
                                    ${leadNewsRes[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                            </div>
                            <div class="col-lg-12 col-sm-8 col-7">
                                <div class="Desc">
                                    <h3 class="Title">${leadNewsRes[i].ContentHeading}</h3>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`
            }else if(i>1 && i<5){
                cathtml3 += `<div class="col-lg-4 col-12 d-flex">
                    <div class="DCatTop3tList align-self-stretch">
                        <a href="${'/' + catSlug + '/news/' + leadNewsRes[i].ContentID}">
                            <div class="row">
                                <div class="col-lg-12 col-sm-4 col-5">
                                    <div class="DImgZoomBlock">
                                        <picture><img src="${process.env.REACT_APP_IMG_Path + leadNewsRes[i].ImageSmPath}" alt="${leadNewsRes[i].ContentHeading}" title="${leadNewsRes[i].ContentHeading}" /></picture>
                                        ${leadNewsRes[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                    </div>
                                </div>
                                <div class="col-lg-12 col-sm-8 col-7">
                                    <div class="Desc">
                                        <h3 class="Title">${leadNewsRes[i].ContentHeading}</h3>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`
            }else{ break; }
            leadContentIDs.push(leadNewsRes[i].ContentID)
        }

        html += `<div class="row">
            <div class="col-lg-8 col-12 d-flex">${cathtml1}</div>
            <div class="col-lg-4 col-12 d-flex">${cathtml2}</div>
        </div>
        <div class="DCatTop3">
            <div class="row">${cathtml3}</div>
        </div>`
        leadComponent = html; }
    catch (err) { console.log('leadComponent error'); return ''; }
    
    let latestPopularComponent;
    try { latestPopularComponent = await latestPopularSectionElements.latestPopularSectionElement(); }
    catch (err) { console.log('latestPopularComponent error'); return ''; }
    
    let moreNewsComponent;
    try { moreNewsComponent = await moreNewsSectionElements.moreNewsSectionElement(catSlug, subCatID, leadContentIDs, bnConfig); }
    catch (err) { console.log('moreNewsComponent error'); return ''; }
    
    let categoryLatestComponent;
    try { categoryLatestComponent = await latestPopularSectionElements.categoryLatestSectionElement(subCatID, catSlug); }
    catch (err) { console.log('categoryLatestComponent error'); return ''; }

    let elements = `${ldJsonComponent}<main>
        <div class="container">
            <h2 class="DTitle">
                <a href="/${catSlug}/sub/${subCatSlug}">
                    <span class="DTitleInner"><span class="DTitleInnerBar"><span>${subCatTitle}</span></span></span>
                </a>
            </h2>
            <section>
                <div class="row">
                    <div class="col-lg-9 col-sm-12">
                        ${leadComponent}
                    </div>
                    <div class="col-lg-3 col-sm-12">
                        <div class="DRightSideAdd d-flex justify-content-center">
                            <a href="/">
                                <img src="/media/Advertisement/Advertisement(300X90).png" alt="Advertisement" title="Advertisement" />
                            </a>
                        </div>
                        ${latestPopularComponent}
                    </div>
                </div>
            </section>
            <div class="DBannerAdd">
                <a href="/">
                    <img src="/media/Advertisement/Advertisement(970X90).png" alt="Advertisement" title="Advertisement" class="img-fluid img100" />
                </a>
            </div>
            <section>
                <div class="row">
                    <div class="col-lg-9 col-sm-12">
                        <h2 class="LatestNewsH mt-4">${subCatTitle} বিভাগের সব খবর</h2>
                        <section class="DCatNewsListArea">
                            <div class="row">${moreNewsComponent}</div>
                        </section>
                        <div id="btnDiv" class="text-center mt-4 mb-4"><button id="ajax-more-btn" class="btn btn-lg btn-block ButtonBG">আরো পড়ুন</button></div>
                    </div>
                    <div class="col-lg-3 col-sm-12">
                        ${categoryLatestComponent}
                    </div>
                </div>
            </section>
        </div>
    </main>`

    return elements
}

module.exports = { subCategoryElement };