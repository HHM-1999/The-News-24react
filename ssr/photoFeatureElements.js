const axios = require('axios').default;
require('dotenv').config();

const ldJsonElements = require("./photoFeatureComponents/ldJsonElements");
const latestPopularSectionElements = require("./photoFeatureComponents/latestPopularElements");
const moreNewsSectionElements = require("./photoFeatureComponents/moreNewsElements");

async function photoFeatureElement() {
    let ldJsonComponent;
    try { ldJsonComponent = await ldJsonElements.ldJsonElement(); }
    catch (err) { console.log('ldJsonComponent error'); return ''; }

    let leadComponent;
    let leadContentIDs = [];
    try { const leadNewsRes = await axios.get(`${process.env.REACT_APP_API_URL}json/file/generatePhotoFeature.json`);

        let html = ''
        let cathtml1 = ''
        let cathtml2 = ''

        for (let i = 0; i < leadNewsRes.data.data.length; i++) {
            if(i==0){
                cathtml1 += `<div class="PhotoGalleryTop">
                    <a href="${'/photo-feature/news/' + leadNewsRes.data.data[i].PhotoFeatureID}">
                        <div class="DImgZoomBlock">
                            <picture><img src="${process.env.REACT_APP_IMG_Path + leadNewsRes.data.data[i].ImageBgPath}" width="513" height="389" alt="${leadNewsRes.data.data[i].PhotoFeatureTitle}" title="${leadNewsRes.data.data[i].PhotoFeatureTitle}" /></picture>
                            <div class="card-video-icon"><i class="fa-solid fa-camera"></i></div>
                        </div>
                        <div class="Desc">
                            <h3 class="Title BGTitle">${leadNewsRes.data.data[i].PhotoFeatureTitle}</h3>
                            <div class="Brief">
                                <p>${leadNewsRes.data.data[i].ShortBrief}</p>
                            </div>
                        </div>
                    </a>
                </div>`
            }else if(i>0 && i<5){
                cathtml2 += `<div class="col-lg-6 col-12 d-flex">
                    <div class="PhotoGalleryList align-self-stretch">
                        <a href="${'/photo-feature/news/' + leadNewsRes.data.data[i].PhotoFeatureID}">
                            <div class="row">
                                <div class="col-lg-12 col-sm-3 col-5">
                                    <div class="DImgZoomBlock">
                                        <picture><img src="${process.env.REACT_APP_IMG_Path + leadNewsRes.data.data[i].ImageBgPath}" width="353" height="198" alt="${leadNewsRes.data.data[i].PhotoFeatureTitle}" title="${leadNewsRes.data.data[i].PhotoFeatureTitle}" /></picture>
                                        <div class="card-video-icon"><i class="fa-solid fa-camera"></i></div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-sm-9 col-7 textBorder2">
                                    <div class="Desc">
                                        <h3 class="Title">${leadNewsRes.data.data[i].PhotoFeatureTitle}</h3>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`
            }else{ break; }
            leadContentIDs.push(leadNewsRes.data.data[i].PhotoFeatureID)
        }

        html += `<div class="row">
            <div class="col-lg-6 col-12">${cathtml1}</div>
            <div class="col-lg-6 col-12"><div class="row">${cathtml2}</div></div>
        </div>`
        leadComponent = html; }
    catch (err) { console.log('leadComponent error'); return ''; }
    
    let latestPopularComponent;
    try { latestPopularComponent = await latestPopularSectionElements.latestPopularSectionElement(); }
    catch (err) { console.log('latestPopularComponent error'); return ''; }
    
    let moreNewsComponent;
    try { moreNewsComponent = await moreNewsSectionElements.moreNewsSectionElement(leadContentIDs); }
    catch (err) { console.log('moreNewsComponent error'); return ''; }

    let elements = `${ldJsonComponent}<main>
        <div class="container">
            <h2 class="DTitle">
                <a href="#">
                    <span class="DTitleInner"><span class="DTitleInnerBar"><span>ছবিঘর</span></span></span>
                </a>
            </h2>
            <section>
                <div class="PhotoGallery page mt-4">${leadComponent}</div>
            </section>
            <div class="DBannerAdd">
                <a href="/">
                    <img src="/media/Advertisement/Advertisement(970X90).png" alt="Advertisement" title="Advertisement" class="img-fluid img100" />
                </a>
            </div>
            <section>
                <div class="row">
                    <div class="col-lg-9 col-sm-12">
                        <h2 class="LatestNewsH mt-4">ছবিঘর বিভাগের সব খবর</h2>
                        <section class="DCatNewsListArea">
                            <div class="row">${moreNewsComponent}</div>
                        </section>
                        <div id="btnDiv" class="text-center mt-4 mb-4"><button id="ajax-more-btn" class="btn btn-lg btn-block ButtonBG">আরো পড়ুন</button></div>
                    </div>
                    <div class="col-lg-3 col-sm-12">${latestPopularComponent}</div>
                </div>
            </section>
        </div>
    </main>`

    return elements
}

module.exports = { photoFeatureElement };