const axios = require('axios').default;
require('dotenv').config();

const searchDivisionSectionElements = require("./searchDivisionElements");

async function countrySectionElement() {
    let searchDivisionComponent;
    try { searchDivisionComponent = await searchDivisionSectionElements.searchDivisionSectionElement(); }
    catch (err) { console.log('searchDivisionComponent error'); return ''; }

    try {
        const cat2News = await axios.get(`${process.env.REACT_APP_API_URL}json/file/generateCategory2.json`);
        // console.log(leadNews.data.data);

        let html = ''
        let cathtml1 = ''
        let cathtml2 = ''
        let cathtml3 = ''

        for (let i = 0; i < cat2News.data.data.length; i++) {
            if(i==0){
                cathtml1 += `<div class="col-lg-6 col-12">
                    <div class="DCountryTop align-self-stretch">
                        <a href="${'/' + cat2News.data.data[i].Slug + '/news/' + cat2News.data.data[i].ContentID}">
                            <div class="DImgZoomBlock">
                                <picture><img src="${process.env.REACT_APP_IMG_Path + cat2News.data.data[i].ImageBgPath}" width="620" height="349" alt="${cat2News.data.data[i].ContentHeading}" title="${cat2News.data.data[i].ContentHeading}" /></picture>
                                ${cat2News.data.data[i].ShowVideo === 1 ? '<div class="card-video-iconTop"><i class="fa-solid fa-play"></i></div>' : ''}
                            </div>
                            <div class="Desc">
                                <h3 class="Title BGTitle">${cat2News.data.data[i].ContentHeading}</h3>
                            </div>
                        </a>
                    </div>
                </div>`
            }else if(i>0 && i<5){
                cathtml2 += `<div class="DCountryList" key={nc.ContentID}>
                    <a href="${'/' + cat2News.data.data[i].Slug + '/news/' + cat2News.data.data[i].ContentID}">
                        <div class="row">
                            <div class="col-lg-5 col-sm-4 col-5">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + cat2News.data.data[i].ImageThumbPath}" width="123" height="69" alt="${cat2News.data.data[i].ContentHeading}" title="${cat2News.data.data[i].ContentHeading}" /></picture>
                                    ${cat2News.data.data[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                            </div>
                            <div class="col-lg-7 col-sm-8 col-7 textBorder2">
                                <div class="Desc textBorder">
                                    <h3 class="Title">${cat2News.data.data[i].ContentHeading}</h3>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`
            }else if(i>5 && i<7){
                cathtml3 += `<div class="DCountryList leftSide">
                    <a href="${'/' + cat2News.data.data[i].Slug + '/news/' + cat2News.data.data[i].ContentID}">
                        <div class="row">
                            <div class="col-lg-5 col-sm-4 col-5">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + cat2News.data.data[i].ImageThumbPath}" width="123" height="69" alt="${cat2News.data.data[i].ContentHeading}" title="${cat2News.data.data[i].ContentHeading}" /></picture>
                                    ${cat2News.data.data[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                            </div>
                            <div class="col-lg-7 col-sm-8 col-7 textBorder2 order-lg-first">
                                <div class="Desc textBorder">
                                    <h3 class="Title">${cat2News.data.data[i].ContentHeading}</h3>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`
            }else{ break; }
        }

        html += `<section>
            <div class="SectionSBorder2 mt-5">
                <div class="SPSecTitle">
                    <a href="/countries">
                        <h2>দেশে এখন</h2>
                    </a>
                </div>
            </div>
            <div class="Country">
                <div class="row">
                    ${cathtml1}
                    <div class="col-lg-3 col-12 order-lg-first">
                        <div class="DCountry">${cathtml2}</div>
                    </div>
                    <div class="col-lg-3 col-12">
                        <div class="DCountry">${cathtml3}</div>
                        ${searchDivisionComponent}
                    </div>
                </div>
            </div>
        </section>`
        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

module.exports = { countrySectionElement };