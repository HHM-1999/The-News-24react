const axios = require('axios').default;
require('dotenv').config();

async function fasionSectionElement() {
    try {
        const cat7News = await axios.get(`${process.env.REACT_APP_API_URL}json/file/generateCategory7.json`);
        // console.log(leadNews.data.data);

        let html = ''
        let cathtml1 = ''

        for (let i = 0; i < cat7News.data.data.length; i++) {
            cathtml1 += `<div class="LifeStyleNews">
                <a href="${'/' + cat7News.data.data[i].Slug + '/news/' + cat7News.data.data[i].ContentID}">
                    <div class="DImgZoomBlocktest">
                        <picture><img src="${process.env.REACT_APP_IMG_Path + cat7News.data.data[i].ImageSmPath}" width="295" height="166" alt="${cat7News.data.data[i].ContentHeading}" title="${cat7News.data.data[i].ContentHeading}" /></picture>
                        ${cat7News.data.data[i].ShowVideo === 1 ? '<div class="card-video-iconTop"><i class="fa-solid fa-play"></i></div>' : ''}
                    </div>
                    <div class="Desc">
                        <h2 class="Title BGTitle">${cat7News.data.data[i].ContentHeading}</h2>
                    </div>
                </a>
            </div>`
        }

        html += `<section>
            <div class="LifeStyle mt-5">
                <div class="SectionSBorder2">
                    <div class="SPSecTitle">
                        <a href="/fashion">
                            <h2>ফ্যাশন</h2>
                        </a>
                    </div>
                </div>
                ${cathtml1}
            </div>
        </section>`
        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

module.exports = { fasionSectionElement };