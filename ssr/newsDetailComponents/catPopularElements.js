const axios = require('axios').default;
require('dotenv').config();

async function catPopularSectionElement(catID, catSlug, catTitle) {
    try {
        const PopularNews = await axios.get(`${process.env.REACT_APP_API_URL}json/file/generateCategoryPopular${catID}.json`);
        // console.log(`${process.env.REACT_APP_API_URL}json/file/generateCategoryPopular${catID}.json`);

        let html = ''
        let cat1News = ''

        for (let i = 0; i < PopularNews.data.data.length; i++) {
            cat1News += `<div class="col-lg-6 col-12">
                <div class="DTop3List">
                    <a href="${'/' + catSlug + "/news/" + PopularNews.data.data[i].ContentID}">
                        <div class="row">
                            <div class="col-lg-4 col-sm-4 col-5">
                                <div class="DImgZoomBlock">
                                    <picture><img src="${process.env.REACT_APP_IMG_Path + PopularNews.data.data[i].ImageThumbPath}" alt="${PopularNews.data.data[i].ContentHeading}" title="${PopularNews.data.data[i].ContentHeading}" /></picture>
                                    ${PopularNews.data.data[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                                </div>
                            </div>
                            <div class="col-lg-8 col-sm-8 col-7 textBorder2">
                                <div class="Desc textBorder">
                                    <h3 class="Title BGTitle">${PopularNews.data.data[i].ContentHeading}</h3>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>`
            if(i>=3){break}
        }

        html += `<div class="DSecTitle2">
            <h2>এই সপ্তাহের সর্বাধিক পঠিত গুরুত্বপূর্ণ ${catTitle} খবর</h2>
        </div>
        <div class="DBottomNews">
            <div class="row">${cat1News}</div>
        </div>`
        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

module.exports = { catPopularSectionElement };