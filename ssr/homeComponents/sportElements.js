const axios = require('axios').default;
require('dotenv').config();

async function sportSectionElement() {
    try {
        const cat4News = await axios.get(`${process.env.REACT_APP_API_URL}json/file/generateCategory4.json`);
        // console.log(leadNews.data.data);

        let html = ''
        let cathtml1 = ''
        let cathtml2 = ''

        for (let i = 0; i < cat4News.data.data.length; i++) {
            if(i==0){
                cathtml1 += `<div class="DSportsTop">
                    <a href="${'/' + cat4News.data.data[i].Slug + '/news/' + cat4News.data.data[i].ContentID}">
                        <div class="DImgZoomBlock">
                            <picture><img src="${process.env.REACT_APP_IMG_Path + cat4News.data.data[i].ImageBgPath}" alt="${cat4News.data.data[i].ContentHeading}" title="${cat4News.data.data[i].ContentHeading}" /></picture>
                            ${cat4News.data.data[i].ShowVideo === 1 ? '<div class="card-video-iconTop"><i class="fa-solid fa-play"></i></div>' : ''}
                        </div>
                        <div class="Desc">
                            <h3 class="Title BGTitle">${cat4News.data.data[i].ContentHeading}</h3>
                            <div class="Brief">
                                <p>${cat4News.data.data[i].ContentBrief}</p>
                            </div>
                        </div>
                    </a>
                </div>`
            }else if(i>0 && i<5){
                cathtml2 += `<div class="DTop3List">
                    <a href="${'/' + cat4News.data.data[i].Slug + '/news/' + cat4News.data.data[i].ContentID}">
                        <div class="row">
                            <div class="col-lg-4 col-sm-3 col-5">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + cat4News.data.data[i].ImageSmPath}" alt="${cat4News.data.data[i].ContentHeading}" title="${cat4News.data.data[i].ContentHeading}" /></picture>
                                    ${cat4News.data.data[i].ShowVideo === 1 ? '<div class="card-video-iconTop"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                            </div>
                            <div class="col-lg-8 col-sm-9 col-7 textBorder2">
                                <div class="Desc textBorder">
                                    <h3 class="Title BGTitle">${cat4News.data.data[i].ContentHeading}</h3>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`
            }else{ break; }
        }

        html += `<div class="col-lg-9 col-12 border-right-inner">
            <div class="SectionSBorder2">
                <div class="SPSecTitle">
                    <a href="/sports">
                        <h2>এখন মাঠে</h2>
                    </a>
                </div>
            </div>
            <div class="Sports">
                <div class="row">
                    <div class="col-lg-6 col-12">${cathtml1}</div>
                    <div class="col-lg-6 col-12">
                        <div class="DTop3">${cathtml2}</div>
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

module.exports = { sportSectionElement };