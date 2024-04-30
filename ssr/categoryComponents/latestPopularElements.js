const axios = require('axios').default;
require('dotenv').config();

async function latestSectionElement() {
    try {
        const catLatestNews = await axios.get(`${process.env.REACT_APP_API_URL}json/file/generateLatest.json`);

        let html = ''
        for (let i = 0; i < catLatestNews.data.data.length; i++) {
            html += `<li>
                <a href="${'/' + catLatestNews.data.data[i].Slug + '/news/' + catLatestNews.data.data[i].ContentID}">
                    <p>
                        <span class="OuterBorder"><i class="fa-solid fa-angles-right"></i></span>
                        ${catLatestNews.data.data[i].ContentHeading}
                    </p>
                </a>
            </li>`
        }
        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

async function popularSectionElement() {
    try {
        const catLatestNews = await axios.get(`${process.env.REACT_APP_API_URL}json/file/generatePopular.json`);

        let html = ''
        for (let i = 0; i < catLatestNews.data.data.length; i++) {
            html += `<li>
                <a href="${'/' + catLatestNews.data.data[i].Slug + '/news/' + catLatestNews.data.data[i].ContentID}">
                    <p>
                        <span class="OuterBorder"><i class="fa-solid fa-angles-right"></i></span>
                        ${catLatestNews.data.data[i].ContentHeading}
                    </p>
                </a>
            </li>`
        }
        return html;
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return '';
    }
}

async function latestPopularSectionElement() {
    let latestComponent;
    try { latestComponent = await latestSectionElement(); }
    catch (err) { console.log('latestComponent error'); return ''; }

    let popularComponent;
    try { popularComponent = await popularSectionElement(); }
    catch (err) { console.log('popularComponent error'); return ''; }

    let html = `<section class="DLPSTab2">
        <div class="panel panel-default">
            <div class="panel-heading">
                <ul class="nav nav-tabs" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-bs-toggle="tab" role="tab"
                            aria-selected="true" href="#tabs-1">সর্বশেষ</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" role="tab" aria-selected="false"
                            href="#tabs-2">পাঠকপ্রিয়</a>
                    </li>
                </ul>
            </div>
            <div class="panel-body PanelHeight">
                <div class="tab-content">
                    <div class="tab-pane active" id="tabs-1" role="tabpanel">
                        <div class="DLatestNews">
                            <ul>${latestComponent}</ul>
                        </div>
                    </div>
                    <div class="tab-pane" id="tabs-2" role="tabpanel">
                        <div class="DLatestNews">
                            <ul>${popularComponent}</ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="allnews"><a href="/archives">সব খবর <i class="fa-solid fa-angles-right"></i></a>
        </div>
    </section>`
    return html;
}


async function categoryLatestSectionElement(catID, catSlug) {
    try {
        const catLatestNews = await axios.get(`${process.env.REACT_APP_API_URL}json/file/generateCategoryPopular${catID}.json`);

        let html = ''
        let cathtml = ''
        for (let i = 0; i < catLatestNews.data.data.length; i++) {
            cathtml += `<div class="MostPopularTabList">
                <a href="${'/' + catSlug + '/news/' + catLatestNews.data.data[i].ContentID}">
                    <div class="row">
                        <div class="col-lg-5 col-sm-4 col-5">
                            <div class="DImgZoomBlock">
                                <picture><img src="${process.env.REACT_APP_IMG_Path + catLatestNews.data.data[i].ImageThumbPath}" alt="${catLatestNews.data.data[i].ContentHeading}" title="${catLatestNews.data.data[i].ContentHeading}" /></picture>
                                ${catLatestNews.data.data[i].ShowVideo === 1 ? '<div class="card-video-icon"><i class="fa-solid fa-play"></i></div>' : ''}
                            </div>
                        </div>
                        <div class="col-lg-7 col-sm-8 col-7">
                            <div class="Desc">
                                <h5 class="Title">${catLatestNews.data.data[i].ContentHeading}</h5>
                            </div>
                        </div>
                    </div>
                </a>
            </div>`
        }

        html+=`<section class="MostPopularTab mt-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" data-bs-toggle="tab" role="tab" aria-selected="true" href="#tabs-1">এই বিভাগের সর্বাধিক পঠিত</a>
                        </li>
                    </ul>
                </div>
                <div class="panel-body PanelHeight">
                    <div class="tab-content">
                        <div class="tab-pane active" id="tabs-1" role="tabpanel">
                            <div class="DLatestNews">${cathtml}</div>
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

module.exports = { latestPopularSectionElement, categoryLatestSectionElement };