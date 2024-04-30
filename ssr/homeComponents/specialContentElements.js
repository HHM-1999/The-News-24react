const axios = require('axios').default;
require('dotenv').config();

async function specialContentSectionElement() {
    try {
        const cat40News = await axios.get(`${process.env.REACT_APP_API_URL}json/file/generateCategory40.json`);
        // console.log(leadNews.data.data);

        let html = ''
        let cathtml1 = ''
        let cathtml2 = ''

        for (let i = 0; i < cat40News.data.data.length; i++) {
            if(i==0){
                cathtml1 += `<div class="col-lg-4 col-12 d-flex">
                    <div class="DSpecialTop align-self-stretch">
                        <a href="${'/' + cat40News.data.data[i].Slug + '/news/' + cat40News.data.data[i].ContentID}">
                            <div class="DImgZoomBlock">
                                <picture><img src="${process.env.REACT_APP_IMG_Path + cat40News.data.data[i].ImageBgPath}" width="406" height="228" alt="${cat40News.data.data[i].ContentHeading}" title="${cat40News.data.data[i].ContentHeading}" /></picture>
                                ${cat40News.data.data[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                            </div>
                            <div class="Desc">
                                <h3 class="Title BGTitle FW700">${cat40News.data.data[i].ContentHeading}</h3>
                                <div class="Brief">
                                    <p>${cat40News.data.data[i].ContentBrief}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`
            }else if(i>0 && i<4){
                cathtml2 += `<div class="col-lg-4 col-sm-12 d-flex" key={nc.ContentID}>
                    <div class="DSpecialList align-self-stretch">
                        <a href="${'/' + cat40News.data.data[i].Slug + '/news/' + cat40News.data.data[i].ContentID}">
                            <div class="row">
                                <div class="col-lg-12 col-sm-3 col-5">
                                    <div class="DImgZoomBlock">
                                        <picture><img src="${process.env.REACT_APP_IMG_Path + cat40News.data.data[i].ImageSmPath}" width="264" height="148" alt="${cat40News.data.data[i].ContentHeading}" title="${cat40News.data.data[i].ContentHeading}" /></picture>
                                        ${cat40News.data.data[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                    </div>
                                </div>
                                <div class="col-lg-12 col-sm-9 col-7 textBorder2">
                                    <div class="Desc">
                                        <h3 class="Title FW700">${cat40News.data.data[i].ContentHeading}</h3>
                                        <div class="Brief">
                                            <p>${cat40News.data.data[i].ContentBrief}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`
            }else{ break; }
        }

        html += `<section>
            <div class="SectionSBorder2 mt-2">
                <div class="SPSecTitle">
                    <a href="/special-report">
                        <h2>বিশেষ প্রতিবেদন</h2>
                    </a>
                </div>
            </div>
            <div class="DSpecial">
                <div class="row">
                    ${cathtml1}
                    <div class="col-lg-8 col-12">
                        <div class="DSpecialTop2">
                            <div class="row">${cathtml1}</div>
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

module.exports = { specialContentSectionElement };