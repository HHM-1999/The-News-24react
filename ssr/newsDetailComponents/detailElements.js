// const dbConfig = require("../dbCon/dbConfig");
// const bnConfig = dbConfig.bnConfig();
require('dotenv').config();

const staticElements = require("../staticElements");
const writerInfoElements = require("./writerInfoElements");
// const catLatestElements = require("./catLatestElements");

async function detailSectionElement(contentDetails, catSlug, catLatestComponent) {
    let writerInfoComponent;
    try {
        if(contentDetails.WriterID && contentDetails.WriterID > 0){
            writerInfoComponent = await writerInfoElements.writerInfoSectionElement(contentDetails.WriterID, contentDetails.WriterName);
        }else if(contentDetails.ReporterID && contentDetails.ReporterID > 0){
            writerInfoComponent = await writerInfoElements.writerInfoSectionElement(contentDetails.ReporterID, contentDetails.WriterName);
        }else if(contentDetails.DistCorsID && contentDetails.DistCorsID > 0){
            writerInfoComponent = await writerInfoElements.writerInfoSectionElement(contentDetails.DistCorsID, contentDetails.WriterName);
        }else if(contentDetails.SubEditorID && contentDetails.SubEditorID > 0){
            writerInfoComponent = await writerInfoElements.writerInfoSectionElement(contentDetails.SubEditorID, contentDetails.WriterName);
        }else{
            writerInfoComponent = `<div class="WritterName mt-2"><p><i class="fa-solid fa-pen"></i> ${contentDetails.WriterName}<span class='DInitial'>, এখন টিভি</span></p></div>`
        }
    }
    catch (err) { console.log('writerInfoComponent error'); return ''; }
    
    // let catLatestComponent;
    // try { catLatestComponent = await catLatestElements.catLatestSectionElement(catID, catSlug, catTitle); }
    // catch (err) { console.log('catLatestComponent error'); return ''; }

    // try {
    //     // if(contentDetails.WriterID && contentDetails.WriterID>0){
    //     //     const writerInfo = await bnConfig.query( 'SELECT * FROM bn_writers WHERE WriterID=? AND Deletable=1 LIMIT 1' );
    //     // }

        
    // } catch (err) {
    //     // Handle Error Here
    //     console.error(err);
    //     return '';
    // }

    let html = ''
    let imagesec = ''
    const d = new Date(contentDetails.create_date);
    let day = d.getDate();
    if(day <= 9){ day = '0'+day}
    let month = d.getMonth()+1;
    let monthname = ''
    if(month == 1){ monthname = 'জানুয়ারি'}else if(month == 2){ monthname = 'ফেব্রুয়ারি'}else if(month == 3){ monthname = 'মার্চ'}else if(month == 4){ monthname = 'এপ্রিল'}else if(month == 5){ monthname = 'মে'}else if(month == 6){ monthname = 'জুন'}else if(month == 7){ monthname = 'জুলাই'}else if(month == 8){ monthname = 'আগস্ট'}else if(month == 9){ monthname = 'সেপ্টেম্বর'}else if(month == 10){ monthname = 'অক্টোবর'}else if(month == 11){ monthname = 'নভেম্বর'}else if(month == 12){ monthname = 'ডিসেম্বর'}
    if(month <= 9){ month = '0'+month}
    let year = d.getFullYear();
    let hour = d.getHours();
    if(hour <= 9){ hour = '0'+hour}
    let minutes = d.getMinutes();
    if(minutes <= 9){ minutes = '0'+minutes}
    
    if(contentDetails.ShowVideo !== null && contentDetails.VideoID !== '' && contentDetails.ShowVideo===1){
        imagesec += `<div class="${contentDetails.Tags == '' ? 'col-sm-12 video-container mt-2' : 'col-sm-12 video-container'}">`
        if(contentDetails.VideoType == "youtube"){
            imagesec += `<iframe class="embed-responsive-item" title="youtube-video" src="${'https://www.youtube.com/embed/' + contentDetails.VideoID + '?autoplay=0'}" frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>`
        }else if(contentDetails.VideoType == "vimeo"){
            imagesec += `<iframe src="${'https://player.vimeo.com/video/' + contentDetails.VideoID}" title="vimeo-video" frameBorder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>`
        }else if(contentDetails.VideoType == "facebook"){
            imagesec += `<iframe src="${'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F' + contentDetails.VideoID + '%2F&show_text=0&width=560'}" title="facebook-video" width="560" height="315" style="border: none; overflow: hidden;" scrolling="no" frameBorder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>`
        }else if(contentDetails.VideoType == "instagram"){
            imagesec += `<iframe class="embed-responsive-item" title="instagram-video" src="${'//instagram.com/p/' + contentDetails.VideoID + '>/embed'}" width="100%" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>`
        }
        imagesec += `</div>`
    }else{
        imagesec += `<div class="DTopImg">
            <div class="Details">
                <picture><img src="${process.env.REACT_APP_IMG_Path + contentDetails.ImageBgPath}" alt="${contentDetails.ContentHeading}" title="${contentDetails.ContentHeading}" class="img-fluid img100"/></picture>
            </div>
            <div class="DetailsTopCap">
                <p class="DTopImgCaption">${contentDetails.ImageBgPathCaption}</p>
                <p class="DTopImgCaption">${staticElements.banglaDateConvetar(day+' '+monthname+' '+year+', '+hour+':'+minutes)}</p>
            </div>
        </div>`
    }

    let taghtml = ''
    if(contentDetails.Tags){
        let tagArray = (contentDetails.Tags).split(",")
        for (let i = 0; i < tagArray.length; i++) {
            taghtml += `<a href="${'/tags/' + tagArray[i]}" ><p>${tagArray[i]}</p></a>`
        }
    }

    html += `<div class="newsDetail" id="${contentDetails.ContentID}" data-title=${contentDetails.ContentHeading}>
        <div class="row mt-2">
            <div class="ContentDetails">
                ${contentDetails.ContentSubHeading ? '<h3 class="DHeadingSubHeading">'+contentDetails.ContentSubHeading+'</h3>' : ''}
                <h1>${contentDetails.DetailsHeading ? contentDetails.DetailsHeading : contentDetails.ContentHeading}</h1>
                ${contentDetails.ContentShoulder ? '<h4 class="DHeadingContentShoulder">'+contentDetails.ContentShoulder+'</h4>' : ''}
            </div>
            <div class="col-lg-7 col-12">
                ${imagesec}
                <div class="mt-2 d-contents d-sm-flex justify-content-between align-items-center d-print-none">
                    ${writerInfoComponent}
                    <div class='d-flex PRINTBTN'>
                        ${(contentDetails.VideoID !== null && contentDetails.VideoID !== '') ? '<p class="DTopImgCaption" style="padding-right: 10px; padding-top: 10px;">'+staticElements.banglaDateConvetar(day+' '+monthname+' '+year+', '+hour+':'+minutes)+'</p>' : ''}
                        <button type="button" title='Print' aria-label='Print' class="printMe"><i class="fa-solid fa-print"></i></button>
                    </div>
                </div>
            </div>
            <div class="col-lg-5 col-12 d-none d-lg-block detailsPage">
                ${catLatestComponent}
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-9 col-12">
                <div class="${'ContentDetails page-break table-responsive ContentDetails' + contentDetails.ContentID}" id="contentDetails">
                    <div>${contentDetails.ContentDetails}</div>
                    ${contentDetails.Initial ? '<p class="fw-bold">'+contentDetails.Initial+'</p>' : ''}
                </div>
                <div class="DTagsNews d-print-none">${taghtml}</div>
                <div class="row MarginTop20 d-print-none">
                    <div class="col-sm-12">
                        <div class="CommentBg">
                            <div class="fb-comments" data-href=${process.env.REACT_APP_FONT_DOMAIN_URL+catSlug+'/news/'+contentDetails.ContentID} data-width="" data-numposts="3"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-12 d-print-none">
                <div class="DRightAds">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="d-flex justify-content-center">
                                <a href="/"><img src="/media/Advertisement/Advertisement (300X250).png" alt="Advertisement" title="Advertisement" class="img-fluid img100" /></a>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="DAdd1 d-flex justify-content-center">
                                <a href="/"><img src="/media/Advertisement/Advertisement(300X90).png" alt="Advertisement" title="Advertisement" class="img-fluid img100" /></a>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="DAdd1 d-flex  justify-content-center">
                                <a href="/"><img src="/media/Advertisement/Advertisement (300X250).png" alt="Advertisement" title="Advertisement" class="img-fluid img100" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12 d-print-none">
            <div class="row">
                <div class="col-sm-12">
                    <div class="astrodivider">
                        <div class="astrodividermask"></div>
                        <span><i class="fa fa-chevron-circle-down" aria-hidden="true"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    return html;
}

module.exports = { detailSectionElement };