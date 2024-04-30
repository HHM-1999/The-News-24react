const axios = require('axios').default;
require('dotenv').config();

async function infoTechSectionElement() {
    try {
        const cat6News = await axios.get(`${process.env.REACT_APP_API_URL}json/file/generateCategory6.json`);
        // console.log(leadNews.data.data);

        let html = ''
        let cathtml1 = ''
        let cathtml2 = ''

        for (let i = 0; i < cat6News.data.data.length; i++) {
            if(i==0){
                cathtml1 += `<div class="EconomicNews align-self-stretch">
                    <a href="${'/' + cat6News.data.data[i].Slug + '/news/' + cat6News.data.data[i].ContentID}">
                        <div class="DImgZoomBlock card-video">
                            <picture><img src="${process.env.REACT_APP_IMG_Path + cat6News.data.data[i].ImageSmPath}" alt="${cat6News.data.data[i].ContentHeading}" title="${cat6News.data.data[i].ContentHeading}" /></picture>
                            ${cat6News.data.data[i].ShowVideo === 1 ? '<div class="card-video-iconTop"><i class="fa-solid fa-play"></i></div>' : ''}
                        </div>
                        <div class="Desc">
                            <h3 class="Title BGTitle">${cat6News.data.data[i].ContentHeading}</h3>
                        </div>
                    </a>
                </div>`
            }else if(i>0 && i<5){
                cathtml2 += `<div class="DTop3List">
                    <a href="${'/' + cat6News.data.data[i].Slug + '/news/' + cat6News.data.data[i].ContentID}">
                        <div class="row">
                            <div class="col-lg-5 col-sm-3 col-5">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + cat6News.data.data[i].ImageThumbPath}" alt="${cat6News.data.data[i].ContentHeading}" title="${cat6News.data.data[i].ContentHeading}" /></picture>
                                    ${cat6News.data.data[i].ShowVideo === 1 ? '<div class="card-video-iconTop"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                            </div>
                            <div class="col-lg-7 col-sm-9 col-7 textBorder2">
                                <div class="Desc textBorder">
                                    <h3 class="Title BGTitle">${cat6News.data.data[i].ContentHeading}</h3>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`
            }else{ break; }
        }

        html += `<div class="col-lg-3 col-12">
            <div class="SectionSBorder2">
                <div class="SPSecTitle">
                    <a href="/information-technology">
                        <h2>তথ্য প্রযুক্তি</h2>
                    </a>
                </div>
            </div>
            <div class="Economic">${cathtml1}${cathtml2}</div>
        </div>`
        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

module.exports = { infoTechSectionElement };