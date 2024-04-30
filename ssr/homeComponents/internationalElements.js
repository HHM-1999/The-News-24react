const axios = require('axios').default;
require('dotenv').config();

async function internationalSectionElement() {
    try {
        const cat3News = await axios.get(`${process.env.REACT_APP_API_URL}json/file/generateCategory3.json`);
        // console.log(leadNews.data.data);

        let html = ''
        let cathtml1 = ''
        let cathtml2 = ''
        let cathtml3 = ''

        for (let i = 0; i < cat3News.data.data.length; i++) {
            if(i==0){
                cathtml1 += `<div class="col-lg-3 col-12">
                    <div class="DInternational align-self-stretch">
                        <a href="${'/' + cat3News.data.data[i].Slug + '/news/' + cat3News.data.data[i].ContentID}">
                            <div class="DImgZoomBlock">
                                <picture><img src="${process.env.REACT_APP_IMG_Path + cat3News.data.data[i].ImageSmPath}" alt="${cat3News.data.data[i].ContentHeading}" title="${cat3News.data.data[i].ContentHeading}" /></picture>
                                ${cat3News.data.data[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                            </div>
                            <div class="Desc">
                                <h3 class="Title BGTitle">${cat3News.data.data[i].ContentHeading}</h3>
                            </div>
                        </a>
                    </div>
                </div>`
            }else if(i>0 && i<3){
                cathtml2 += `<div class="DTop3List">
                    <a href="${'/' + cat3News.data.data[i].Slug + '/news/' + cat3News.data.data[i].ContentID}">
                        <div class="row">
                            <div class="col-lg-4 col-sm-3 col-5">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + cat3News.data.data[i].ImageThumbPath}" alt="${cat3News.data.data[i].ContentHeading}" title="${cat3News.data.data[i].ContentHeading}" /></picture>
                                    ${cat3News.data.data[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                            </div>
                            <div class="col-lg-8 col-sm-9 col-7 textBorder2">
                                <div class="Desc textBorder">
                                    <h3 class="Title BGTitle">${cat3News.data.data[i].ContentHeading}</h3>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`
            }else if(i>=3 && i<5){
                cathtml3 += `<div class="DTop3List">
                    <a href="${'/' + cat3News.data.data[i].Slug + '/news/' + cat3News.data.data[i].ContentID}">
                        <div class="row">
                            <div class="col-lg-4 col-sm-3 col-5">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + cat3News.data.data[i].ImageThumbPath}" alt="${cat3News.data.data[i].ContentHeading}" title="${cat3News.data.data[i].ContentHeading}" /></picture>
                                    ${cat3News.data.data[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                            </div>
                            <div class="col-lg-8 col-sm-9 col-7 textBorder2">
                                <div class="Desc textBorder">
                                    <h3 class="Title BGTitle">${cat3News.data.data[i].ContentHeading}</h3>
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
                    <a href="/international">
                        <h2>বিদেশে এখন</h2>
                    </a>
                </div>
            </div>
            <div class="International">
                <div class="row">
                    ${cathtml1}
                    <div class="col-lg-9 col-12">
                        <div class="row">
                            <div class="col-lg-6 col-12">${cathtml2}</div>
                            <div class="col-lg-6 col-12">${cathtml3}</div>
                        </div>
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

module.exports = { internationalSectionElement };