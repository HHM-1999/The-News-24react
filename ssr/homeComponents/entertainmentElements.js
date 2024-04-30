const axios = require('axios').default;
require('dotenv').config();

async function entertainmentSectionElement() {
    try {
        const cat5News = await axios.get(`${process.env.REACT_APP_API_URL}json/file/generateCategory5.json`);
        // console.log(leadNews.data.data);

        let html = ''
        let cathtml1 = ''
        let cathtml2 = ''

        for (let i = 0; i < cat5News.data.data.length; i++) {
            if(i==0){
                cathtml1 += `<div class="DEntertainMentTop">
                    <a href="${'/' + cat5News.data.data[i].Slug + '/news/' + cat5News.data.data[i].ContentID}">
                        <div class="row">
                            <div class="col-lg-8 col-12">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + cat5News.data.data[i].ImageBgPath}" alt="${cat5News.data.data[i].ContentHeading}" title="${cat5News.data.data[i].ContentHeading}" /></picture>
                                    ${cat5News.data.data[i].ShowVideo === 1 ? '<div class="card-video-iconTop"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                            </div>
                            <div class="col-lg-4 col-12">
                                <div class="Desc">
                                    <h3 class="Title BGTitle">${cat5News.data.data[i].ContentHeading}</h3>
                                    <div class="Brief">
                                        <p>${cat5News.data.data[i].ContentBrief}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`
            }else if(i>0 && i<5){
                cathtml2 += `<div class="col-lg-4 col-12 d-flex" key={nc.ContentID}>
                    <div class="DEntertainMentList align-self-stretch">
                        <a href="${'/' + cat5News.data.data[i].Slug + '/news/' + cat5News.data.data[i].ContentID}">
                            <div class="row">
                                <div class="col-lg-12 col-sm-3 col-5">
                                    <div class="DImgZoomBlock">
                                        <picture><img src="${process.env.REACT_APP_IMG_Path + cat5News.data.data[i].ImageSmPath}" alt="${cat5News.data.data[i].ContentHeading}" title="${cat5News.data.data[i].ContentHeading}" /></picture>
                                        ${cat5News.data.data[i].ShowVideo === 1 ? '<div class="card-video-iconTop"><i class="fa-solid fa-play"></i></div>' : ''}
                                    </div>
                                </div>
                                <div class="col-lg-12 col-sm-9 col-7 textBorder2">
                                    <div class="Desc">
                                        <h3 class="Title">${cat5News.data.data[i].ContentHeading}</h3>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`
            }else{ break; }
        }

        html += `<div class="col-lg-9 col-12">
            <div class="SectionSBorder2">
                <div class="SPSecTitle">
                    <a href="/entertainment">
                        <h2>এখন আনন্দ</h2>
                    </a>
                </div>
            </div>
            <div class="DEntertainMent">
                <div class="row">
                    <div class="col-lg-8 col-12">${cathtml1}</div>
                    ${cathtml2}
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

module.exports = { entertainmentSectionElement };