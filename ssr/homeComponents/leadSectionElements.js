const axios = require('axios').default;
require('dotenv').config();

async function leadSectionElement() {
    try {
        const leadNews = await axios.get(`${process.env.REACT_APP_API_URL}json/file/generateSpecial1.json`);
        // console.log(leadNews.data.data);

        let html = ''
        let leadhtml1 = ''
        let leadhtml2 = ''
        let leadhtml3 = ''

        for (let i = 0; i < leadNews.data.data.length; i++) {
            if(i==0){
                leadhtml1 = `<div class="col-lg-4 col-md-4 col-12 d-flex">
                    <div class="LeadTop align-self-stretch">
                        <a href="${'/' + leadNews.data.data[i].Slug + '/news/' + leadNews.data.data[i].ContentID}">
                            <div class="DImgZoomBlock">
                                <picture><img src="${process.env.REACT_APP_IMG_Path + leadNews.data.data[i].ImageBgPath}" width="406" height="253" alt="${leadNews.data.data[i].ContentHeading}" title="${leadNews.data.data[i].ContentHeading}" /></picture>
                                ${leadNews.data.data[i].ShowVideo === 1 ? '<div class="card-video-iconTop"><i class="fa-solid fa-play"></i></div>' : ''}
                            </div>
                            <div class="Desc">
                                <h2 class="Title">${leadNews.data.data[i].ContentHeading}</h2>
                                <div class="Brief">
                                    <p>${leadNews.data.data[i].ContentBrief}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`
            }else if(i>0 && i<3){
                leadhtml2 += `<div class="col-lg-4 col-md-4 col-6 d-flex">
                    <div class="LeadTop align-self-stretch">
                        <a href="${'/' + leadNews.data.data[i].Slug + '/news/' + leadNews.data.data[i].ContentID}">
                            <div class="DImgZoomBlock">
                                <picture><img src="${process.env.REACT_APP_IMG_Path + leadNews.data.data[i].ImageBgPath}" width="406" height="253" alt="${leadNews.data.data[i].ContentHeading}" title="${leadNews.data.data[i].ContentHeading}" /></picture>
                                ${leadNews.data.data[i].ShowVideo === 1 ? '<div class="card-video-iconTop"><i class="fa-solid fa-play"></i></div>' : ''}
                            </div>
                            <div class="Desc">
                                <h2 class="Title">${leadNews.data.data[i].ContentHeading}</h2>
                                <div class="Brief">
                                    <p>${leadNews.data.data[i].ContentBrief}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`
            }else if(i>=3){
                leadhtml3 += `<div class="LeadBottom">
                <a href="${'/' + leadNews.data.data[i].Slug + '/news/' + leadNews.data.data[i].ContentID}">
                        <div class="DImgZoomBlocktest">
                            <picture><img src="${process.env.REACT_APP_IMG_Path + leadNews.data.data[i].ImageSmPath} width="305" height="171" alt="${leadNews.data.data[i].ContentHeading}" title="${leadNews.data.data[i].ContentHeading}" /></picture>
                            ${leadNews.data.data[i].ShowVideo === 1 ? '<div class="card-video-iconTop"><i class="fa-solid fa-play"></i></div>' : ''}
                        </div>
                        <div class="Desc">
                            <h2 class="Title BGTitle">${leadNews.data.data[i].ContentHeading}</h2>
                        </div>
                    </a>
                </div>`
            }
        }

        html += `<div class="TopLeadSection">
        <div class="row">${leadhtml1}${leadhtml2}</div>
        <div class="BottomLeadSection SectionSBorder">${leadhtml3}</div>
        </div>`

        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

module.exports = { leadSectionElement };