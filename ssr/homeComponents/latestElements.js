const axios = require('axios').default;
require('dotenv').config();

async function latestSectionElement() {
    try {
        const latestNews = await axios.get(`${process.env.REACT_APP_API_URL}json/file/generateLatest.json`);
        // console.log(leadNews.data.data);

        let html = ''
        let latesthtml1 = ''
        let latesthtml2 = ''

        for (let i = 0; i < latestNews.data.data.length; i++) {
            if(i<3){
                latesthtml1 += `<div class="DTop3List homePage">
                    <a href="${'/' + latestNews.data.data[i].Slug + '/news/' + latestNews.data.data[i].ContentID}">
                        <div class="row">
                            <div class="col-lg-4 col-sm-3 col-5">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + latestNews.data.data[i].ImageThumbPath}" alt="${latestNews.data.data[i].ContentHeading}" title="${latestNews.data.data[i].ContentHeading}" /></picture>
                                    ${latestNews.data.data[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                            </div>
                            <div class="col-lg-8 col-sm-9 col-7 textBorder2">
                                <div class="Desc textBorder">
                                    <h3 class="Title BGTitle">${latestNews.data.data[i].ContentHeading}</h3>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`
            }else if(i>=3 && i<6){
                latesthtml2 += `<div class="DTop3List homePage">
                    <a href="${'/' + latestNews.data.data[i].Slug + '/news/' + latestNews.data.data[i].ContentID}">
                        <div class="row">
                            <div class="col-lg-4 col-sm-3 col-5">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + latestNews.data.data[i].ImageThumbPath}" alt="${latestNews.data.data[i].ContentHeading}" title="${latestNews.data.data[i].ContentHeading}" /></picture>
                                    ${latestNews.data.data[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                            </div>
                            <div class="col-lg-8 col-sm-9 col-7 textBorder2">
                                <div class="Desc textBorder">
                                    <h3 class="Title BGTitle">${latestNews.data.data[i].ContentHeading}</h3>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`
            }else{ break; }
        }

        html += `<div class="col-lg-9 col-12">
            <h2 class="LatestNewsH"><a href="/archives">সর্বশেষ</a></h2>
            <div class="row">
                <div class="col-lg-6 col-12">
                    <div class="DTop3">${latesthtml1}</div>
                </div>
                <div class="col-lg-6 col-12">
                    <div class="DTop3">${latesthtml2}</div>
                </div>
            </div>
            <div class="extraBtn SectionSBorder MShow">
                <a href="/archives">
                    <p class="readMore">আরও পড়ুন</p>
                    <i class="fa-solid fa-sort-down"></i>
                </a>
            </div>
        </div>`
        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

module.exports = { latestSectionElement };