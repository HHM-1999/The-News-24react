const axios = require('axios').default;
require('dotenv').config();

async function marketSectionElement() {
    try {
        const cat1News = await axios.get(`${process.env.REACT_APP_API_URL}json/file/generateCategory1.json`);
        // console.log(leadNews.data.data);

        let html = ''
        let cathtml1 = ''
        let cathtml2 = ''
        let cathtml3 = ''

        for (let i = 0; i < cat1News.data.data.length; i++) {
            if(i==0){
                cathtml1 += `<div class="NationalTop card-video">
                    <a href="${'/' + cat1News.data.data[i].Slug + '/news/' + cat1News.data.data[i].ContentID}">
                        <div class="DImgZoomBlock">
                            <picture><img src="${process.env.REACT_APP_IMG_Path + cat1News.data.data[i].ImageSmPath}" alt="${cat1News.data.data[i].ContentHeading}" title="${cat1News.data.data[i].ContentHeading}" /></picture>
                            ${cat1News.data.data[i].ShowVideo === 1 ? '<div class="card-video-iconTop"><i class="fa-solid fa-play"></i></div>' : ''}
                        </div>
                        <div class="Desc">
                            <h2 class="Title">${cat1News.data.data[i].ContentHeading}</h2>
                            <div class="Brief">
                                <p>${cat1News.data.data[i].ContentBrief}</p>
                            </div>
                        </div>
                    </a>
                </div>`
            }else if(i>0 && i<3){
                cathtml2 += `<div class="col-lg-6 col-12 d-flex">
                    <div class="NationalTopNews align-self-stretch">
                        <a href="${'/' + cat1News.data.data[i].Slug + '/news/' + cat1News.data.data[i].ContentID}">
                            <div class="row">
                                <div class="col-lg-12 col-sm-3 col-5">
                                    <div class="DImgZoomBlock">
                                        <picture><img src="${process.env.REACT_APP_IMG_Path + cat1News.data.data[i].ImageSmPath}" alt="${cat1News.data.data[i].ContentHeading}" title="${cat1News.data.data[i].ContentHeading}" /></picture>
                                        ${cat1News.data.data[i].ShowVideo === 1 ? '<div class="card-video-iconTop"><i class="fa-solid fa-play"></i></div>' : ''}
                                    </div>
                                </div>
                                <div class="col-lg-12 col-sm-9 col-7 textBorder2">
                                    <div class="Desc">
                                        <h3 class="Title BGTitle">${cat1News.data.data[i].ContentHeading}</h3>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`
            }else if(i>=3 && i<=9){
                cathtml3 += `<div class="DTop3List">
                    <a href="${'/' + cat1News.data.data[i].Slug + '/news/' + cat1News.data.data[i].ContentID}">
                        <div class="row">
                            <div class="col-lg-4 col-sm-3 col-5">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + cat1News.data.data[i].ImageThumbPath}" alt="${cat1News.data.data[i].ContentHeading}" title="${cat1News.data.data[i].ContentHeading}" /></picture>
                                    ${cat1News.data.data[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                            </div>
                            <div class="col-lg-8 col-sm-9 col-7 textBorder2">
                                <div class="Desc textBorder">
                                    <h3 class="Title BGTitle">${cat1News.data.data[i].ContentHeading}</h3>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`
            }else{ break; }
        }

        html += `<div class="col-lg-9 col-12">
            <div class="SectionSBorder2">
                <div class="SPSecTitle">
                    <a href="/market">
                        <h2>বাজার</h2>
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-7 col-12 border-right-inner">
                    <div class="National">
                        ${cathtml1}
                        <div class="row">${cathtml2}</div>
                    </div>
                </div>
                <div class="col-lg-5 col-12 border-right-inner">
                    <div class="Politics">${cathtml3}</div>
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

module.exports = { marketSectionElement };