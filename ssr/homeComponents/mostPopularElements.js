const axios = require('axios').default;
require('dotenv').config();

async function mostPopularSectionElement() {
    try {
        const popularNews = await axios.get(`${process.env.REACT_APP_API_URL}json/file/generatePopular.json`);
        // console.log(leadNews.data.data);

        let html = ''
        let popularhtml1 = ''

        for (let i = 0; i < popularNews.data.data.length; i++) {
            popularhtml1 += `<div class="MostPopularNews">
                <a href="${'/' + popularNews.data.data[i].Slug + '/news/' + popularNews.data.data[i].ContentID}">
                    <div class="DImgZoomBlocktest">
                        <picture><img src="${process.env.REACT_APP_IMG_Path + popularNews.data.data[i].ImageSmPath}" width="295" height="166" alt="${popularNews.data.data[i].ContentHeading}" title="${popularNews.data.data[i].ContentHeading}" /></picture>
                        ${popularNews.data.data[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                    </div>
                    <div class="Desc">
                        <h2 class="Title BGTitle">${popularNews.data.data[i].ContentHeading}</h2>
                    </div>
                </a>
            </div>`
        }

        html += `<section>
            <div class="SectionSBorder2 mt-5">
                <div class="SPSecTitle">
                    <h2>সর্বাধিক পঠিত</h2>
                </div>
            </div>
            <div class="MostPopular">${popularhtml1}</div>
        </section>`
        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

module.exports = { mostPopularSectionElement };