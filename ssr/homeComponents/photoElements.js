const axios = require('axios').default;
require('dotenv').config();

async function photoSectionElement() {
    try {
        const catPhotoNews = await axios.get(`${process.env.REACT_APP_API_URL}json/file/generatePhotoFeature.json`);
        // console.log(leadNews.data.data);

        let html = ''
        let cathtml1 = ''
        let cathtml2 = ''

        for (let i = 0; i < catPhotoNews.data.data.length; i++) {
            if(i==0){
                cathtml1 += `<div class="PhotoGalleryTop">
                    <a href="${'/photo-feature/news/' + catPhotoNews.data.data[i].PhotoFeatureID}">
                        <div class="DImgZoomBlock">
                            <picture><img src="${process.env.REACT_APP_IMG_Path + catPhotoNews.data.data[i].ImageBgPath}" alt="${catPhotoNews.data.data[i].PhotoFeatureTitle}" title="${catPhotoNews.data.data[i].PhotoFeatureTitle}" /></picture>
                            <div class="card-video-icon"><i class="fa-solid fa-camera"></i></div>
                        </div>
                        <div class="Desc">
                            <h3 class="Title BGTitle">${catPhotoNews.data.data[i].PhotoFeatureTitle}</h3>
                            <div class="Brief">
                                <p>${catPhotoNews.data.data[i].ShortBrief}</p>
                            </div>
                        </div>
                    </a>
                </div>`
            }else if(i>0 && i<5){
                cathtml2 += `<div class="col-lg-6 col-12 d-flex">
                    <div class="PhotoGalleryList align-self-stretch">
                        <a href="${'/photo-feature/news/' + catPhotoNews.data.data[i].PhotoFeatureID}">
                            <div class="row">
                                <div class="col-lg-12 col-sm-3 col-5">
                                    <div class="DImgZoomBlock">
                                        <picture><img src="${process.env.REACT_APP_IMG_Path + catPhotoNews.data.data[i].ImageSmPath}" alt="${catPhotoNews.data.data[i].PhotoFeatureTitle}" title="${catPhotoNews.data.data[i].PhotoFeatureTitle}" /></picture>
                                        <div class="card-video-icon"><i class="fa-solid fa-camera"></i></div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-sm-9 col-7 textBorder2">
                                    <div class="Desc">
                                        <h3 class="Title">${catPhotoNews.data.data[i].PhotoFeatureTitle}</h3>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>`
            }else{ break; }
        }

        html += `<div class="PhotoGalleryPart mt-5">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-12">
                        <div class="SectionSBorder2">
                            <div class="SPSecTitle">
                                <a href="/photo-feature">
                                    <h2>ছবিঘর</h2>
                                </a>
                            </div>
                        </div>
                        <div class="PhotoGallery">
                            <div class="row">
                                <div class="col-lg-6 col-12">${cathtml1}</div>
                                <div class="col-lg-6 col-12">
                                    <div class="row">${cathtml2}</div>
                                </div>
                            </div>
                        </div>
                    </div>
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

module.exports = { photoSectionElement };