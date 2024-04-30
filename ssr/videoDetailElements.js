const latestPopularElements = require("./videoDetailComponents/latestPopularElements");
const moreNewsElements = require("./videoDetailComponents/moreNewsElements");
const staticElements = require("./staticElements");

async function videoDetailElement(VideoDetails) {
    let latestPopularComponent;
    try { latestPopularComponent = await latestPopularElements.latestPopularSectionElement(VideoDetails.CategoryID, VideoDetails.catSlug); }
    catch (err) { console.log('latestPopularComponent error'); return ''; }

    let moreNewsComponent;
    try { moreNewsComponent = await moreNewsElements.moreNewsElement(VideoDetails.CategoryID); }
    catch (err) { console.log('moreNewsComponent error'); return ''; }

    let fulldate = ''
    let d = new Date(VideoDetails.created_at);
    let daynum = d.getDay();
    let dayname = ''
    if(daynum==0){dayname='রোববার'}else if(daynum==1){dayname='সোমবার'}else if(daynum==2){dayname='মঙ্গলবার'}else if(daynum==3){dayname='বুধবার'}else if(daynum==4){dayname='বৃহস্পতিবার'}else if(daynum==5){dayname='শুক্রবার'}else if(daynum==6){dayname='শনিবার'}
    let day = d.getDate();
    if(day <= 9){ day = '0'+day}
    let month = d.getMonth()+1;
    let monthname = ''
    if(month == 0){ monthname = 'জানুয়ারি'}else if(month == 1){ monthname = 'ফেব্রুয়ারি'}else if(month == 2){ monthname = 'মার্চ'}else if(month == 3){ monthname = 'এপ্রিল'}else if(month == 4){ monthname = 'মে'}else if(month == 5){ monthname = 'জুন'}else if(month == 6){ monthname = 'জুলাই'}else if(month == 7){ monthname = 'আগস্ট'}else if(month == 8){ monthname = 'সেপ্টেম্বর'}else if(month == 9){ monthname = 'অক্টোবর'}else if(month == 10){ monthname = 'নভেম্বর'}else if(month == 11){ monthname = 'ডিসেম্বর'}
    if(month <= 9){ month = '0'+month}
    let year = d.getFullYear();
    let hour = d.getHours();
    if(hour <= 9){ hour = '0'+hour}
    let minute = d.getMinutes();
    if(minute <= 9){ minute = '0'+minute}
    fulldate = dayname+', '+day+' '+monthname+' '+year+', '+hour+':'+minute

    let elements = `<main>
        <h2 class="DTitle">
            <a href="/video">
                <span class="DTitleInner"><span class="DTitleInnerBar"><span>ভিডিও গ্যালারি</span></span></span>
            </a>
        </h2>
        <div class="container">
            <div class="DVideoDetailsArea mb-5 mt-4">
                <div class="row">
                    <div class="col-lg-8 col-12 border-right-inner">
                        <h1 class="Title BGTitle fw-bold my-2" style="font-size: 26px; line-height: 38px;">
                            <a href="#">${VideoDetails.WebTVHeading}</a>
                        </h1>
                        <div class="DVideoDetailsFrame">
                            <div class="col-sm-12 video-container">
                                ${VideoDetails.SourceType == 1 ?
                                    '<iframe class="embed-responsive-item" title="'+VideoDetails.WebTVHeading+'" src="https://www.youtube.com/embed/' + VideoDetails.WebTVLinkCode + '?autoplay=1" frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>'
                                    : VideoDetails.SourceType == 2 ?
                                        '<iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F' + VideoDetails.WebTVLinkCode + '%2F&show_text=0&width=560" title="'+VideoDetails.WebTVHeading+'" width="560" height="315" style="border: none; overflow: hidden;" scrolling="no" frameBorder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>'
                                        : VideoDetails.SourceType == 3 ?
                                            '<iframe src="https://player.vimeo.com/video/' + VideoDetails.WebTVLinkCode + '" title="'+VideoDetails.WebTVHeading+'" frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>'
                                            : ''}
                            </div>
                        </div>
                        <div class="mt-4 d-contents d-sm-flex justify-content-between align-items-center">
                            <p class="VideoPublishDate mt-2"> <span>প্রকাশিত:</span> ${staticElements.toBengaliNumber(fulldate)} </p>
                            <div class="DSocialTop mt-2"></div>
                        </div>
                        <div class="Brief">${VideoDetails.Remarks ? VideoDetails.Remarks : ''}</div>
                    </div>
                    <div class="col-lg-4 col-12">${latestPopularComponent}</div>
                </div>
            </div>

            <div class="DVideoCatListTop4 mb-5">
                <div class="SectionSBorder2">
                    <div class="SPSecTitle">
                        <h2>আরও দেখুন</h2>
                    </div>
                </div>
                <div class="row">${moreNewsComponent}</div>
            </div>
        </div>
    </main>`

    return elements
}

module.exports = { videoDetailElement };